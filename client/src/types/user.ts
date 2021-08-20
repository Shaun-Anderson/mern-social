export interface User {
  _id: string,
  name: string,
  email: string,
  screenName: string,
  googleId: string,
  twitterId: string,
  profileImageUrl: string,
  private: Boolean,
  //following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  //followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
}