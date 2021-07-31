import { AuthStore } from './auth'
import { TodoStore } from './todo'
import { UserStore } from './user'
export class RootStore {
    // stores within root, add future ones here
    authStore: AuthStore
    userStore: UserStore
    todoStore: TodoStore

    constructor() {
        this.authStore = new AuthStore(this)
        this.userStore = new UserStore(this)
        this.todoStore = new TodoStore(this)
    }
}