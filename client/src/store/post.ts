import { observable, action, computed, makeAutoObservable, makeObservable } from 'mobx'
import { RootStore } from './root'
import axios from 'axios'
import { Post } from '../types/post'
import { resourceLimits } from 'worker_threads'

export class PostStore {
    // Parameters
    rootStore: RootStore
    //posts: Post[] = []
    readonly posts = observable<Post>([])

    constructor(rootStore: RootStore) {
      this.rootStore = rootStore
      makeAutoObservable(this)
    }

    //@action
    fetchPosts = async () => {
      try {
        // fetch data from a url endpoint
        const result = await axios.get<Post[]>("/post", {
          method: "GET",
          withCredentials: true,
        });
        console.log(result.data)
        this.posts.replace(result.data)
        console.log(this.posts)
      } catch(error) {
        console.error("error", error);
      }
    }

    //@action
    add = async (post: Post) => {
      try {
        const result = await axios.post(`/post`, post, {withCredentials: true});
        console.log(result)
        this.posts.push(result.data)
      } catch(error) {
        console.error("error", error);
      }
    }

    // like = async (post: Post) => {
    //   try {
    //     const result = await axios.put(`/post/like`, post, {withCredentials: true});
    //     console.log(result)
    //     this.posts.push(result.data)
    //   } catch(error) {
    //     console.error("error", error);
    //   }
    // }

    //@computed
    get postCount(): number {
        return this.posts.length
    }
}