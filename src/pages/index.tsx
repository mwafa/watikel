import { Form, LoginLogo } from "../components/Login"

import { Container } from "../components/Container"

const Index = () => (
  <Container
    justifyContent="center"
    flexDir="column"
    alignItems="center"
    display="flex"
    h="100vh"
  >
    <LoginLogo />
    <Form />
  </Container>
)

export default Index
