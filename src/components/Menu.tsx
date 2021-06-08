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
import React, { useContext } from "react"

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

          <DrawerBody>
            <VStack spacing="4">
              <Input size="sm" variant="flushed" placeholder="Title" />
              <Input size="sm" variant="flushed" placeholder="Reference" />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button size="sm" variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="orange">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Menu>
  )
}
