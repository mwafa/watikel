import { useContext, useEffect, useState } from "react"

import { Box } from "@chakra-ui/layout"
import { LastUpdateCtx } from "../contexts/last-update"
import moment from "moment"

export const LastUpdate = () => {
  moment.locale("id")
  const { date } = useContext(LastUpdateCtx)
  const [last, setLast] = useState<string>()

  useEffect(() => {
    const interval = setInterval(() => {
      setLast(moment(date).fromNow())
    }, 1000)
    return () => clearInterval(interval)
  }, [date])

  return (
    <Box fontSize="xx-small" fontFamily="body" fontWeight="normal">
      Last update:
      <br /> {last}
    </Box>
  )
}
