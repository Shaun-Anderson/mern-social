const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const Post = require("../models/post");

const authCheck = (req, res, next) => {
  console.log(req.user);
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

// when login is successful, retrieve user info
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("postedBy likes");
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
  const { userId } = req.params;
  const newPost = new Post({
    completed: false,
    title: req.body.title || "",
    postedBy: req.user._id,
  });
  try {
    const result = await newPost.save();
    return res.status(201).json(result.populate("postedBy"));
  } catch (err) {
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
