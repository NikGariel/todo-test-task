import { List } from 'rsuite'
import { useTodoStore } from '../store/todoStore'
import TodoItem from './TodoItem'
import { CSSProperties } from 'react'

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
  })

  return (
    <div style={styles.todoListContainer}>
      <List>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
          />
        ))}
      </List>
    </div>
  )
}

const styles: { [key: string]: CSSProperties } = {
  todoListContainer: {
    margin: '0 auto',
    maxHeight: '50vh',
    overflowY: 'auto',
    gap: '1rem',
    scrollbarWidth: 'none',
  },
}

export default TodoList
