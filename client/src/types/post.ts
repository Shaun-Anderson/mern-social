import { User } from "./user";

export interface Post {
    _id: string,
    title: string,
    completed: boolean,
    postedBy: User
}