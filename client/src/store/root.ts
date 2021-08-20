import { AuthStore } from './auth'
import { PostStore } from './post'
import { UserStore } from './user'
export class RootStore {
    // stores within root, add future ones here
    authStore: AuthStore
    userStore: UserStore
    postStore: PostStore

    constructor() {
        this.authStore = new AuthStore(this)
        this.userStore = new UserStore(this)
        this.postStore = new PostStore(this)
    }
}