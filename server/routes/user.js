const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const { User } = require("../models/user");

const authCheck = (req, res, next) => {
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

// GET get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// GET Search for users based on the username
// - Return Limit: 10
router.get("/search", async (req, res) => {
  try {
    const users = await Users.find({
      username: { $regex: req.query.username },
    })
      .limit(10)
      .select("fullname username");

    res.json({ users });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// GET Get a user by their id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// PATCH Adds a following entry to the current user
router.patch(":id/follow", async (req, res) => {
  try {
    const user = await Users.find({
      _id: req.params.id,
      followers: req.user._id,
    });
    if (user.length > 0)
      return res
        .status(500)
        .json({ msg: "You are already following this user." });

    const newUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          followers: req.user._id,
        },
      },
      { new: true }
    ).populate("followers following");

    await Users.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { following: req.params.id } },
      { new: true }
    );

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// PATCH Add a user to the list of users you are following
router.patch(":id/unfollow", async (req, res) => {
  try {
    const newUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    ).populate("followers following");

    await Users.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { following: req.params.id } },
      { new: true }
    );

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// GET return suggested users based on the followers/followings of users the current user relates to
router.get("/suggestionsUser", async (req, res) => {
  try {
    const newArr = [...req.user.following, req.user._id];

    const num = req.query.num || 10;
    const users = await Users.aggregate([
      { $match: { _id: { $nin: newArr } } },
      { $sample: { size: Number(num) } },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following",
        },
      },
    ]).project("-password");

    return res.json({
      users,
      result: users.length,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
