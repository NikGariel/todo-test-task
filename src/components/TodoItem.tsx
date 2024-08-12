import { Checkbox, IconButton, Text } from 'rsuite'
import { useTodoStore } from '../store/todoStore'
import TrashIcon from '@rsuite/icons/Trash'

type TodoItemProps = {
  id: number
  text: string
  completed: boolean
}

const TodoItem = ({ id, text, completed }: TodoItemProps) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingBlock: '0.25rem',
      }}
    >
      <Checkbox
        checked={completed}
        onChange={() => toggleTodo(id)}
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'inline-block',
          width: '85%',
        }}
      >
        <Text
          style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          maxLines={1}
        >
          {text}
        </Text>
      </Checkbox>
      <IconButton
        style={{ width: '10%' }}
        icon={<TrashIcon />}
        onClick={() => removeTodo(id)}
      />
    </div>
  )
}

export default TodoItem
