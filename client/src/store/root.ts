import { AuthStore } from './auth'
export class RootStore {
    // stores within root, add future ones here
    authStore: AuthStore

    constructor() {
        this.authStore = new AuthStore(this)
    }
}