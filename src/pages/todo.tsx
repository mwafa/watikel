import {
  TodoDone,
  TodoMenu,
  TodoOnProgress,
  TodoTodo,
} from "../components/Todo"

import { Container } from "../components/Container"
import { Flex } from "@chakra-ui/layout"
import Head from "next/head"
import { LastUpdateProvider } from "../contexts/last-update"
import { LoginLogo } from "../components/Login"
import { MainMenu } from "../components/Menu"
import { fetcher } from "../services/fetcher"
import { useEffect } from "react"
import { useRouter } from "next/dist/client/router"

const todo = () => {
  const router = useRouter()
  useEffect(() => {
    fetcher<{ error?: boolean }>("/api/auth").then((r) => {
      if (r.error) router.push("/")
    })
  }, [])
  return (
    <Container>
      <Head>
        <title>Watikel - Tasks</title>
      </Head>
      <LastUpdateProvider>
        <Flex justifyContent="space-between">
          <LoginLogo />
          <MainMenu />
        </Flex>
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
