import {
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"

import { IconButton } from "@chakra-ui/button"
import { LastUpdateCtx } from "../contexts/last-update"
import { fetcher } from "../services/fetcher"
import { useContext } from "react"
import { useRouter } from "next/dist/client/router"

export const MainMenu = () => {
  const { update } = useContext(LastUpdateCtx)
  const router = useRouter()
  return (
    <Menu>
      <MenuButton
        aria-label="Options"
        as={IconButton}
        icon={<HamburgerIcon />}
      />
      <MenuList>
        <MenuItem icon={<AddIcon />}>New Task</MenuItem>
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
    </Menu>
  )
}
