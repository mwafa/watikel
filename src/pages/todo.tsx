import {
  TodoDone,
  TodoList,
  TodoMenu,
  TodoOnProgress,
  TodoTodo,
} from "../components/Todo"

import { Container } from "../components/Container"
import { LastUpdateProvider } from "../contexts/last-update"
import { LoginLogo } from "../components/Login"

const todo = () => {
  return (
    <Container>
      <LoginLogo />
      <LastUpdateProvider>
        <TodoMenu
          menus={[
            {
              label: "To Do",
              content: <TodoTodo />,
            },
            {
              label: "On Progress",
              content: <TodoOnProgress />,
            },
            {
              label: "Done",
              content: <TodoDone />,
            },
          ]}
        />
      </LastUpdateProvider>
    </Container>
  )
}
export default todo
