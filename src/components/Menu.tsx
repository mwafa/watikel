import {
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons"
import { Button, IconButton } from "@chakra-ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import React, { FormEventHandler, useContext, useState } from "react"

import { Input } from "@chakra-ui/input"
import { LastUpdateCtx } from "../contexts/last-update"
import { VStack } from "@chakra-ui/layout"
import { fetcher } from "../services/fetcher"
import { useDisclosure } from "@chakra-ui/hooks"
import { useRouter } from "next/dist/client/router"

export const MainMenu = () => {
  const { update } = useContext(LastUpdateCtx)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>()
  const [reference, setReference] = useState<string>()

  const clear = () => {
    setTitle("")
    setReference("")
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    fetcher("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, reference }),
    }).finally(() => {
      clear()
      onClose()
      update()
      setLoading(false)
    })
  }
  return (
    <Menu>
      <MenuButton
        aria-label="Options"
        as={IconButton}
        icon={<HamburgerIcon />}
      />
      <MenuList>
        <MenuItem onClick={onOpen} icon={<AddIcon />}>
          New Task
        </MenuItem>
        <MenuItem onClick={() => update()} icon={<RepeatIcon />}>
          Refresh Task
        </MenuItem>
        <MenuItem
          onClick={() => {
            fetcher("/api/auth", { method: "DELETE" })
              .then(() => router.push("/"))
              .catch(console.log)
          }}
          icon={<ExternalLinkIcon />}
        >
          Log out
        </MenuItem>
      </MenuList>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="md">New Task</DrawerHeader>
          <form onSubmit={onSubmit}>
            <DrawerBody>
              <VStack spacing="4">
                <Input
                  size="sm"
                  variant="flushed"
                  placeholder="Title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  required
                />
                <Input
                  size="sm"
                  variant="flushed"
                  placeholder="Reference"
                  value={reference}
                  onChange={({ target }) => setReference(target.value)}
                />
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button
                size="sm"
                variant="outline"
                mr={3}
                onClick={() => {
                  onClose()
                  clear()
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                colorScheme="orange"
                isLoading={loading}
              >
                Save
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </Menu>
  )
}
