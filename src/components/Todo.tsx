import { Box, Flex, Link, Stack } from "@chakra-ui/layout"
import { ReactNode, useContext, useEffect, useState } from "react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Tag, User, todo } from ".prisma/client"
import { fetchTask, fetcher } from "../services/fetcher"

import { AtSignIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/button"
import { LastUpdateCtx } from "../contexts/last-update"
import moment from "moment"
import { useToast } from "@chakra-ui/toast"

export type Menu = { label: string; content: ReactNode }

export const TodoMenu = ({ menus }: { menus: Menu[] }) => {
  return (
    <Tabs isFitted>
      <TabList>
        {menus.map(({ label }, idx) => (
          <Tab key={`tab-${idx}`} fontSize="sm">
            {label}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {menus.map(({ content }, idx) => (
          <TabPanel p={0} pt={2} key={`tab-${idx}`}>
            {content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export const TodoList = ({
  data,
  action,
  actionLabel,
}: {
  data: (todo & { assigned?: User })[]
  action?: (id: number) => void
  actionLabel?: string
}) => {
  moment.locale("id")
  return (
    <Stack spacing={2}>
      {data.length === 0 && <Box>No Card</Box>}
      {data.map((task) => (
        <Stack key={task.id} p={4} borderWidth={1} borderRadius="sm">
          <Box fontWeight="bold">
            {"#" + task.id} {task.title}
          </Box>
          <Box fontSize="sm">
            {task.assigned && (
              <Box>
                <AtSignIcon />{" "}
                <Link isExternal={true} href={"mailto:" + task.assigned.email}>
                  {task.assigned.name}
                </Link>
              </Box>
            )}
            {task.reference && (
              <Box>
                Reference:{" "}
                <Link
                  isExternal={true}
                  href={task.reference}
                  color="orange.500"
                >
                  link
                </Link>
              </Box>
            )}
          </Box>
          <Flex alignItems="center">
            <Box fontSize="x-small">{moment(task.lastUpdate).fromNow()}</Box>
            {action && (
              <Button
                onClick={() => action(task.id)}
                size="sm"
                variant="link"
                colorScheme="teal"
                ml="auto"
              >
                {actionLabel}
              </Button>
            )}
          </Flex>
        </Stack>
      ))}
    </Stack>
  )
}

export const TodoTodo = () => {
  const { date, update } = useContext(LastUpdateCtx)
  const [data, setData] = useState<todo[]>([])
  useEffect(() => {
    fetchTask(Tag.TODO).then(setData)
  }, [date])
  return (
    <TodoList
      data={data}
      actionLabel="Do This"
      action={(id) => {
        fetcher(`/api/tasks?id=${id}&tag=${Tag.ON_PROGRESS}`, {
          method: "PUT",
        })
          .then(() => {})
          .finally(() => update())
      }}
    ></TodoList>
  )
}

export const TodoOnProgress = () => {
  const { date, update } = useContext(LastUpdateCtx)
  const [data, setData] = useState<todo[]>([])
  useEffect(() => {
    fetchTask(Tag.ON_PROGRESS).then(setData)
  }, [date])
  return (
    <TodoList
      data={data}
      action={(id) => {
        fetcher(`/api/tasks?id=${id}&tag=${Tag.DONE}`, {
          method: "PUT",
        })
          .then(() => {})
          .finally(() => update())
      }}
      actionLabel="Done"
    ></TodoList>
  )
}

export const TodoDone = () => {
  const { date, update } = useContext(LastUpdateCtx)
  const [data, setData] = useState<todo[]>([])
  useEffect(() => {
    fetchTask(Tag.DONE).then(setData)
  }, [date])
  return (
    <TodoList
      data={data}
      action={(id) => {
        if (confirm("Hapus task?"))
          fetcher(`/api/tasks?id=${id}`, {
            method: "DELETE",
          })
            .then(() => {})
            .finally(() => update())
      }}
      actionLabel="Delete"
    ></TodoList>
  )
}
