import { Box, Stack } from "@chakra-ui/layout"
import { Input, InputProps } from "@chakra-ui/input"

import { Button } from "@chakra-ui/button"

export const LoginLogo = () => (
  <Box fontSize="3em" fontWeight="bold" color="gray.600" fontFamily="heading">
    Watikel
  </Box>
)

export const Form = () => {
  return (
    <Stack w="full" maxW="sm" my={4} spacing={4}>
      <FormInput placeholder="Username" />
      <FormInput placeholder="Password" type="password" />
      <Button type="submit" colorScheme="orange">
        Login
      </Button>
    </Stack>
  )
}

export const FormInput = (props: InputProps) => (
  <Input variant="flushed" {...props} />
)
