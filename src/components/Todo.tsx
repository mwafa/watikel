import { Box, Link, Stack } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"

import { Button } from "@chakra-ui/button"
import { ReactNode } from "react"

export type Menu = { label: string; content: ReactNode }

export const TodoMenu = ({ menus }: { menus: Menu[] }) => {
  return (
    <Tabs>
      <TabList>
        {menus.map(({ label }, idx) => (
          <Tab key={`tab-${idx}`}>{label}</Tab>
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

export const TodoList = () => {
  return (
    <Stack spacing={2}>
      <Stack p={4} borderWidth={1} borderRadius="sm">
        <Box fontWeight="bold">#1 nama saya wafa</Box>
        <Box fontSize="sm">
          Reference:{" "}
          <Link isExternal={true} color="orange.500">
            link
          </Link>
        </Box>
        <Box>
          <Button size="sm" variant="link" colorScheme="teal">
            Do This
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
