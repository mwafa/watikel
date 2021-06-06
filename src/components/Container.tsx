import { Box, BoxProps } from "@chakra-ui/layout"

export const Container = ({ ...props }: BoxProps) => (
  <Box w="full" h="full" p={4} {...props} />
)
