import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import { Container, Header, Content, Footer } from 'rsuite'

function App() {
  return (
    <Container>
      <Header>
        <h2 style={{ textAlign: 'center' }}>ToDo App</h2>
      </Header>
      <Content
        style={{
          padding: '1rem',
          width: '400px',
          margin: '0 auto',
        }}
      >
        <TodoInput />
        <TodoList />
        <TodoFilter />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <p>ToDo App © 2024</p>
      </Footer>
    </Container>
  )
}

export default App
