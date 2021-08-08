const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const { User } = require("../models/user");
require('dotenv').config()

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      console.log(user)
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        googleId: profile._json.sub
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          email: profile._json.email,
          screenName: profile._json.screen_name,
          googleId: profile._json.sub,
          profileImageUrl: profile._json.picture
        }).save();
        if (newUser) {
          console.log('New User: ' + newUser)
          done(null, newUser);
        }
      }
      console.log('Current User: ' + currentUser)
      done(null, currentUser);
    }
));