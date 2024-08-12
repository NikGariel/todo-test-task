import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'
import { Button, Input } from 'rsuite'

const TodoInput = () => {
  const [value, setValue] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleAddTodo = () => {
    if (value.trim()) {
      addTodo(value)
      setValue('')
    }
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <Input
        placeholder='What needs to be done?'
        value={value}
        onChange={(value) => setValue(value)}
      />
      <Button onClick={handleAddTodo}>Add</Button>
    </div>
  )
}

export default TodoInput
