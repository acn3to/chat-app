import './Login.css'

import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/appContext'

import { useLoginUserMutation } from '../services/appApi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { socket } = useContext(AppContext)
  const [loginUser, { isLoading, error }] = useLoginUserMutation()

  function handleLogin(e) {
    e.preventDefault()
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        socket.emit('new-user')
        navigate('/chat')
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form
            style={{ width: '80%', maxWidth: 500, marginTop: '5vh' }}
            onSubmit={handleLogin}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <Form.Text className="text-muted">
                Nós nunca compartilharemos seu email com ninguém
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Lembrar de mim" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
              <p className="text-center">
                Não tem uma conta? <Link to="/signup">Registre-se</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
