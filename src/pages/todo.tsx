import {
  TodoDone,
  TodoMenu,
  TodoOnProgress,
  TodoTodo,
} from "../components/Todo"

import { Container } from "../components/Container"
import Head from "next/head"
import { LastUpdateProvider } from "../contexts/last-update"
import { LoginLogo } from "../components/Login"

const todo = () => {
  return (
    <Container>
      <Head>
        <title>Watikel - Tasks</title>
      </Head>
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
