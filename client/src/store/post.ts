import {
  observable,
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  runInAction,
} from "mobx";
import { RootStore } from "./root";
import axios from "axios";
import { Post } from "../types/post";
import { resourceLimits } from "worker_threads";
import { User } from "../types/user";

export class PostStore {
  // Parameters
  rootStore: RootStore;
  readonly posts = observable<Post>([]);
  state = "pending"; // "pending", "done" or "error"

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  fetchPosts = async () => {
    try {
      this.state = "pending";
      // fetch data from a url endpoint
      const result = await axios.get<Post[]>("/post", {
        method: "GET",
        withCredentials: true,
      });
      runInAction(() => {
        this.posts.replace(result.data);
        this.state = "done";
      });
    } catch (error) {
      console.error("error", error);
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  add = async (post: Post) => {
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("image", post.image);
      const result = await axios.post("/post", formData, {
        withCredentials: true,
      });
      runInAction(() => {
        this.posts.push(result.data);
        this.state = "done";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  deletePost = async (post: Post) => {
    try {
      await axios.delete(`/post/${post._id}`, {
        withCredentials: true,
      });
      //var test = this.posts.remove(post);
      var newPosts = this.posts.filter((item) => item._id !== post._id);
      runInAction(() => {
        this.posts.replace(newPosts);
        this.state = "done";
      });
      //console.log(this.posts[0]);
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  like = async (post: Post, user: User) => {
    try {
      await axios.patch(`/post/${post._id}/like`, post, {
        withCredentials: true,
      });
      runInAction(() => {
        const oldPost = this.posts.find((q) => q._id === post._id);
        if (oldPost === undefined) throw Error("post could not be found");
        oldPost.likes.push(user);
        this.state = "done";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  unlike = async (post: Post, user: User) => {
    try {
      await axios.patch(`/post/${post._id}/unlike`, post, {
        withCredentials: true,
      });
      runInAction(() => {
        const oldPost = this.posts.find((q) => q._id === post._id);
        if (oldPost === undefined) throw Error("post could not be found");
        const index = oldPost.likes.indexOf(user);
        oldPost.likes.splice(index, 1);
        this.state = "done";
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  //@computed
  get postCount(): number {
    return this.posts.length;
  }
}
