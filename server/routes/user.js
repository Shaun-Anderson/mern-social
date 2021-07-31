
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

router.get('/:id/todos', async (req, res) => {
  const { id } = req.params;
  console.log("Attempt to get user blogs for id: " + id)
  User.findById(id)
  .populate("todos") // key to populate
  .then((result) => {
    return res.status(200).json(result)
  }).catch((err) => {
    console.log(err);
  })
});

// Add a user to the list of users you are following
//router.patch('/following/:id', async (req, res) => {
//  const { id } = req.params;
//
//  if (!req.body.idToFollow) {
//    return res.status(404).json({ message: 'No ID found' });
//  }
//
//  try {
//    await User.findByIdAndUpdate(
//      id,
//      { $addToSet: { following: req.body.idToFollow } },
//      { new: true, upsert: true },
//      (err, doc) => {
//        if (err) {
//          return res.status(400).json(err);
//        }
//        return res.status(201).json(doc);
//      }
//    );
//  } catch (e) {
//    return res.status(500).json(err);
//  }
//});

module.exports = router;