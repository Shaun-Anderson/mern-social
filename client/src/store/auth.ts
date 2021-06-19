import { observable, action, computed } from 'mobx'
import Cookie from 'mobx-cookie'
import { RootStore } from './root'


export class AuthStore {
    // Parameters
    @observable cookie = new Cookie("Chronicle")
    @observable isAuthorized: boolean = false
    rootStore: RootStore

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
              console.log("AUTH: success")
              this.isAuthorized = true
            })
            .catch(error => {
              console.log("AUTH: failure")
              this.isAuthorized = false
            });
    }

    // Check if cookie exists and has value
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        console.log("test")
        // if(this.cookie.value)
        //     this.isAuthorized = true
    }

    // Actions
    @action
    login = (token: string) => {
        this.isAuthorized = true
        this.cookie.set(token)
    }

    @action
    logout = () => {
        this.isAuthorized = false
        this.cookie.remove()
    }

    @computed
    get isLoggedIn(): boolean {
        return this.isAuthorized
    }
}