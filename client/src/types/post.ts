import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  completed: boolean;
  likes: [User];
  postedBy: User;
  postedAt: Date;
  image: File;
  imageUrl: string;
}
