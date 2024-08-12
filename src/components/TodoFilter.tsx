import { ButtonGroup, Button } from 'rsuite'
import { useTodoStore } from '../store/todoStore'

const TodoFilter = () => {
  const filter = useTodoStore((state) => state.filter)
  const setFilter = useTodoStore((state) => state.setFilter)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)
  const todosLeft = useTodoStore(
    (state) => state.todos.filter((todo) => !todo.completed).length
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <span>{todosLeft} item(s) left</span>
        <ButtonGroup>
          <Button
            appearance={filter === 'all' ? 'primary' : 'ghost'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            appearance={filter === 'active' ? 'primary' : 'ghost'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            appearance={filter === 'completed' ? 'primary' : 'ghost'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
      <Button
        appearance='ghost'
        block
        onClick={clearCompleted}
        style={{ marginTop: '1rem' }}
      >
        Clear Completed
      </Button>
    </>
  )
}

export default TodoFilter
