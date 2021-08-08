
const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const Post = require("../models/post");

const authCheck = (req, res, next) => {
  console.log(req.user)
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
  const users = await Post.find();
  res.status(200).json(users);
});

// Get a user by their id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Post.findById(id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Get all recipes for 
router.get('user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Post.find({ user: userId });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/', async (req, res) => {
  const { userId } = req.params;
  const newPost = new Post({
    user: req.user._id,
    completed: false,
    title: req.body.title || ""
  });
  try {
    const result = await newPost.save();
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;