import { Box, Stack } from "@chakra-ui/layout"
import { FormEventHandler, useEffect, useState } from "react"
import { Input, InputProps } from "@chakra-ui/input"

import { Button } from "@chakra-ui/button"
import { fetcher } from "../services/fetcher"
import { useRouter } from "next/dist/client/router"
import { useToast } from "@chakra-ui/toast"

export const LoginLogo = () => (
  <Box fontSize="3em" fontWeight="bold" color="gray.600" fontFamily="heading">
    Watikel
  </Box>
)

export const Form = () => {
  const router = useRouter()
  const toast = useToast()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    fetcher<{ error?: boolean }>("/api/auth")
      .then((r) => {
        if (!r.error) router.push("/todo")
      })
      .catch(console.log)
  }, [])

  const onSubmit: FormEventHandler = (e) => {
    const url = "/api/auth"
    e.preventDefault()
    setLoad(true)
    fetcher<{ error?: boolean; message: string }>(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        if (r.error) throw new Error(r.message)
        router.push("/todo")
      })
      .catch((e) => {
        toast({
          title: e.message,
          status: "error",
          isClosable: true,
        })
      })
      .finally(() => setLoad(false))
  }

  return (
    <Stack as="form" onSubmit={onSubmit} w="full" maxW="sm" my={4} spacing={4}>
      <FormInput
        placeholder="Email"
        type="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
      <FormInput
        placeholder="Password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button type="submit" colorScheme="orange" isLoading={load}>
        Login
      </Button>
    </Stack>
  )
}

export const FormInput = (props: InputProps) => (
  <Input variant="flushed" {...props} />
)
