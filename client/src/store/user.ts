import { observable, action, computed } from "mobx";
import { RootStore } from "./root";
import axios from "axios";

export class UserStore {
  // Parameters
  @observable isAuthorized: boolean = false;
  rootStore: RootStore;

  @action
  load = async (): Promise<void> => {
    await fetch("http://localhost:4000", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        console.log("AUTH: success");
        this.isAuthorized = true;
      })
      .catch((error) => {
        console.log("AUTH: failure");
        this.isAuthorized = false;
      });
  };

  // Check if cookie exists and has value
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // Actions
  @action
  follow = async (signedInUserId: String, idToFollow: String) => {
    const followResult = await axios.patch(
      `/users/following/${signedInUserId}`,
      {
        idToFollow,
      }
    );
    const addFollowerResult = await axios.patch(
      `/users/followers/${idToFollow}`,
      {
        followerId: signedInUserId,
      }
    );
  };

  @action
  unfollow = () => {
    this.isAuthorized = false;
  };

  @computed
  get isLoggedIn(): boolean {
    return this.isAuthorized;
  }
}
