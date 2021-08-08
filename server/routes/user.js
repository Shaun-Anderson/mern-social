
const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const { User } = require("../models/user");

const authCheck = (req, res, next) => {
  if (!req.user) {
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
}

router.use(authCheck);

// when login is successful, retrieve user info
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get a user by their id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Adds a following entry to the current user
router.patch(':id/follow', async (req, res) => {
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
          followers: req.user._id
        },
      },
      { new: true }
    ).populate('followers following');

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

// Add a user to the list of users you are following
router.patch(':id/unfollow', async (req, res) => {
  try {
      

    const newUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.user._id }
      },
      { new: true }
    ).populate('followers following');

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

module.exports = router;