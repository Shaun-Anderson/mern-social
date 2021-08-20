import { observable, action, computed } from 'mobx'
import { RootStore } from './root'
import Cookie from 'mobx-cookie'
import { User } from '../types/user'


export class AuthStore {
    // Parameters
    @observable isAuthorized: boolean = false
    @observable user?: User
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @action
    load = async (): Promise<void> => {
        await fetch("http://localhost:4000", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              credentials: "include"
            }
          })
            .then(response => {
              if (response.status === 200) return response.json();
              throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
              console.log(responseJson)
              console.log("AUTH: success")
              //console.log(responseJson)
              this.user = responseJson.user;
              this.isAuthorized = true
            })
            .catch(error => {
              console.log("AUTH: failure")
              this.isAuthorized = false
            });
    }

    // Actions
    @action
    login = () => {
      window.open("http://localhost:4000/auth/google", "_self");
    }

    @action
    logout = () => {
      window.open("http://localhost:4000/auth/logout", "_self");
    }

    @computed
    get isLoggedIn(): boolean {
        return this.isAuthorized
    }
}