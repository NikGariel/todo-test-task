import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

type TodoState = {
  todos: Todo[]
  filter: Filter
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
  setFilter: (filter: Filter) => void
  clearCompleted: () => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      addTodo: (text) => {
        const newTodo = {
          id: Date.now(),
          text,
          completed: false,
        }
        set({ todos: [...get().todos, newTodo] })
      },
      toggleTodo: (id) =>
        set({
          todos: get().todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }),
      removeTodo: (id) =>
        set({ todos: get().todos.filter((todo) => todo.id !== id) }),
      setFilter: (filter) => set({ filter }),
      clearCompleted: () =>
        set({ todos: get().todos.filter((todo) => !todo.completed) }),
    }),
    {
      name: 'todo-storage',
    }
  )
)
