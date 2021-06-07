import { TodoList, TodoMenu } from "../components/Todo"

import { Container } from "../components/Container"
import { LoginLogo } from "../components/Login"

const todo = () => {
  return (
    <Container>
      <LoginLogo />
      <TodoMenu
        menus={[
          {
            label: "To Do (1)",
            content: <TodoList />,
          },
          {
            label: "On Progress (78)",
            content: "tiga",
          },
          {
            label: "Done (100)",
            content: "tiga",
          },
        ]}
      />
    </Container>
  )
}
export default todo
