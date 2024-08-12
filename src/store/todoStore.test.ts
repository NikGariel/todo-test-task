import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoStore } from './todoStore'

describe('Todo Store', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [], filter: 'all' }) // Reset state before each test
    localStorage.clear() // Clear localStorage
  })

  it('should have an initial state', () => {
    const { todos, filter } = useTodoStore.getState()
    expect(todos).toEqual([])
    expect(filter).toBe('all')
  })

  it('should add a new todo', () => {
    // Access the addTodo action
    const addTodo = useTodoStore.getState().addTodo
    addTodo('Test todo')

    // Access the updated todos state
    const todos = useTodoStore.getState().todos
    expect(todos.length).toBe(1)
    expect(todos[0].text).toBe('Test todo')
    expect(todos[0].completed).toBe(false)
  })

  it('should toggle a todo', () => {
    const { addTodo, toggleTodo } = useTodoStore.getState()
    addTodo('Test todo')

    // Get the ID of the first todo
    const todoId = useTodoStore.getState().todos[0].id
    toggleTodo(todoId)

    // Access the updated todos state
    const todos = useTodoStore.getState().todos
    expect(todos[0].completed).toBe(true)
  })

  it('should remove a todo', () => {
    const { addTodo, removeTodo } = useTodoStore.getState()
    addTodo('Test todo')

    // Get the ID of the first todo
    const todoId = useTodoStore.getState().todos[0].id
    removeTodo(todoId)

    // Access the updated todos state
    const todos = useTodoStore.getState().todos
    expect(todos.length).toBe(0)
  })

  it('should set the filter', () => {
    const { setFilter } = useTodoStore.getState()
    setFilter('active')

    // Access the updated filter state
    expect(useTodoStore.getState().filter).toBe('active')
    setFilter('completed')
    expect(useTodoStore.getState().filter).toBe('completed')
  })

  it('should clear completed todos', () => {
    const { addTodo, toggleTodo, clearCompleted } = useTodoStore.getState()
    addTodo('Test todo 1')
    addTodo('Test todo 2')

    // Get the ID of the first todo and toggle its completion
    const todoId = useTodoStore.getState().todos[0].id
    toggleTodo(todoId)
    clearCompleted()

    // Access the updated todos state
    const todos = useTodoStore.getState().todos
    expect(todos.length).toBe(0)
    expect(todos[0]).toBe(undefined)
  })

  it('should save the state to localStorage', () => {
    const { addTodo } = useTodoStore.getState()
    addTodo('Persisted todo')

    // Check if state is saved to localStorage
    const savedState = localStorage.getItem('todo-storage')
    expect(savedState).not.toBeNull()

    // Convert savedState back to object for verification
    const parsedState = JSON.parse(savedState as string)
    expect(parsedState.state.todos.length).toBe(1)
    expect(parsedState.state.todos[0].text).toBe('Persisted todo')
    expect(parsedState.state.todos[0].completed).toBe(false)
  })

  it('should clear state from localStorage', () => {
    const { addTodo, setFilter } = useTodoStore.getState()
    addTodo('Todo to be cleared')
    setFilter('completed')

    // Ensure state is saved
    const savedState = localStorage.getItem('todo-storage')
    expect(savedState).not.toBeNull()

    // Clear store state
    useTodoStore.setState({ todos: [], filter: 'all' })

    // Verify localStorage is cleared
    const clearedState = localStorage.getItem('todo-storage')
    // Convert clearedState back to object for verification
    const parsedState = JSON.parse(clearedState as string)
    expect(parsedState.state.todos.length).toBe(0)
  })
})
