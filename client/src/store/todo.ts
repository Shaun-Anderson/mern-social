import { observable, action, computed, makeAutoObservable, makeObservable } from 'mobx'
import { RootStore } from './root'
import axios from 'axios'
import { Todo } from '../types/todo'
import { resourceLimits } from 'worker_threads'

export class TodoStore {
    // Parameters
    rootStore: RootStore
    //@observable todos: Todo[] = []
    readonly todos = observable<Todo>([])

    constructor(rootStore: RootStore) {
      this.rootStore = rootStore
      //makeObservable(this)
    }

    @action
    fetchTodos = async () => {
      try {
        // fetch data from a url endpoint
        const result = await axios.get<Todo[]>("/todo", {
          method: "GET",
          withCredentials: true,
        });
        console.log(result.data)
        this.todos.replace(result.data)
        console.log(this.todos)
      } catch(error) {
        console.error("error", error);
      }
    }

    @action
    add = async (todo: Todo) => {
      try {
        const result = await axios.post(`/todo`, todo, {withCredentials: true});
        console.log(result)
        this.todos.push(result.data)
      } catch(error) {
        console.error("error", error);
      }
    }

    @computed
    get todoCount(): number {
        return this.todos.length
    }
}