const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const Post = require("../models/post");
var AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const authCheck = (req, res, next) => {
  console.log("Checking user");
  //console.log(req.user);
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};
router.use(authCheck);

// Set up S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

async function getSignedUrl(key) {
  return new Promise((resolve, reject) => {
    let params = { Bucket: process.env.S3_BUCKET, Key: key };
    console.log(params);
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
}

async function getSignedUrls(items) {
  for (let item of items) {
    console.log(item);
    if (item.image != null) {
      const signedUrl = await getSignedUrl(item.image);
      item.imageUrl = signedUrl;
    }
  }
  return items;
}

// when login is successful, retrieve user info
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("postedBy likes");
  await getSignedUrls(posts);
  console.log(posts);
  res.status(200).json(posts);
});

// Get a user by their id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Post.findById(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Delete a post by id
router.delete("/:id", async (req, res) => {
  try {
    // Remove image for this post for S3
    const post = await Post.findOne({
      _id: req.params.id,
      postedBy: req.user._id,
    });

    console.log(post);

    // if image is applied remove it from s3
    if (post.image != null) {
      console.log("REMOVING IMAGE FROM S3");
      await s3
        .deleteObject({
          Bucket: process.env.S3_BUCKET,
          Key: post.image,
        })
        .promise();
    }

    deleteResult = await Post.deleteOne({
      _id: req.params.id,
      postedBy: req.user._id,
    });
    // Future: Comment
    //await Comments.deleteMany({ _id: { $in: post.comments } });

    res.json({
      msg: "Post deleted successfully.",
      newPost: {
        ...post,
        user: req.user,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

// Get all recipes for
router.get("user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Post.find({ user: userId });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Add a new post from a user
router.post("/", async (req, res) => {
  console.log(req.files);
  var image;
  try {
    // image added  with post
    if (req.files) {
      const file = req.files.image;
      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({
          errors: [{ msg: "Images only" }],
        });
      }

      image = `image_${uuidv4()}${path.parse(file.name).ext}`;

      var Blob = req.files.image.data;

      var params = {
        Bucket: process.env.S3_BUCKET,
        Key: image,
        Body: Blob,
      };
      const s3Result = await s3.upload(params).promise();
    }

    const newPost = new Post({
      completed: false,
      title: req.body.title || "",
      postedBy: req.user._id,
      image: image || null,
    });

    await newPost.save();
    // if image get the signed url to display on return
    if (newPost.image != null) {
      const signedUrl = await getSignedUrl(newPost.image);
      newPost.imageUrl = signedUrl;
    }

    const finalPost = await newPost.populate("postedBy").execPopulate();
    console.log(finalPost);
    return res.status(201).json(newPost.populate("postedBy"));
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.patch("/:id/like", async (req, res) => {
  console.log(req.params.id);
  console.log(req.user._id);
  try {
    const post = await Post.find({
      _id: req.params.id,
      likes: req.user._id,
    });
    if (post.length > 0) {
      return res.status(400).json({ msg: "You have already liked this post" });
    }

    const like = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    );

    if (!like) {
      return res.status(400).json({ msg: "Post does not exist." });
    }

    res.json({ msg: "Post liked successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

router.patch("/:id/unlike", async (req, res) => {
  try {
    const like = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    );

    if (!like) {
      return res.status(400).json({ msg: "Post does not exist." });
    }

    res.json({ msg: "Post unliked successfully." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
