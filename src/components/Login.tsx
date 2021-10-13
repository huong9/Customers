import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export interface Account {
  email: string
  password: string
}

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const dispatch = useDispatch<Dispatch<any>>()
  const { user, errorLogin } = useSelector((store: any) => store)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push('/customers')
    } else {
      history.push('/login')
    }
  }, [user, history])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    switch (name) {
      case 'email': {
        setEmail(value)
        break
      }
      case 'password': {
        setPassword(value)
        break
      }
    }
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const account: Account = { email: email, password: password }
    console.log(account)

    // dispatch(logIn(account))
  }

  return (
    <Form onSubmit={handleLogin} className="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          name="email"
          onChange={handleOnChange}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={handleOnChange}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check to display password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Login
