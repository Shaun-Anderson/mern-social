import {
  observable,
  action,
  computed,
  makeAutoObservable,
  makeObservable,
} from "mobx";
import { RootStore } from "./root";
import axios from "axios";
import { Post } from "../types/post";
import { resourceLimits } from "worker_threads";
import { User } from "../types/user";

export class PostStore {
  // Parameters
  rootStore: RootStore;
  //posts: Post[] = []
  readonly posts = observable<Post>([]);
  state = "pending"; // "pending", "done" or "error"

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  //@action
  fetchPosts = async () => {
    try {
      this.state = "pending";
      // fetch data from a url endpoint
      const result = await axios.get<Post[]>("/post", {
        method: "GET",
        withCredentials: true,
      });
      this.posts.replace(result.data);
      this.state = "done";
    } catch (error) {
      console.error("error", error);
      this.state = "error";
    }
  };

  //@action
  add = async (post: Post) => {
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("image", post.image);

      formData.forEach((value: any, key: any) => {
        //worked
        console.log("PRINTING : ", key, value);
      });

      const result = await axios.post("/post", formData, {
        withCredentials: true,
        //headers: { "Content-Type": "multipart/form-data" },
      });

      // const result = await axios.post("/post", post, {
      //   withCredentials: true,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      //const result = await axios.post(`/post`, post, { withCredentials: true });
      //console.log(result);
      this.posts.push(result.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  deletePost = async (post: Post) => {
    try {
      const result = await axios.delete(`/post/${post._id}`, {
        withCredentials: true,
      });
      //var test = this.posts.remove(post);
      var newPosts = this.posts.filter((item) => item._id !== post._id);
      this.posts.replace(newPosts);
      console.log(this.posts[0]);
    } catch (error) {
      console.error("error", error);
    }
  };

  // TODO: Replace later with a modified returned post from server
  like = async (post: Post, user: User) => {
    try {
      const result = await axios.patch(`/post/${post._id}/like`, post, {
        withCredentials: true,
      });
      console.log(result);
      //this.posts.push(result.data)
      const oldPost = this.posts.find((q) => q._id === post._id);
      if (oldPost == undefined) throw Error("post could not be found");
      oldPost.likes.push(user);

      //   Object.assign(updated, dummy_person)
      //   this.posts = this.posts.map( item => {
      //     item.DataSource = item.DataSource ? '' || 'XXX' : 'MyVAL'
      //     return item;
      //  });
    } catch (error) {
      console.error("error", error);
    }
  };

  unlike = async (post: Post) => {
    console.log("Unlike");
    try {
      const result = await axios.patch(`/post/${post._id}/unlike`, post, {
        withCredentials: true,
      });
      console.log(result);
      this.posts.push(result.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  //@computed
  get postCount(): number {
    return this.posts.length;
  }
}
