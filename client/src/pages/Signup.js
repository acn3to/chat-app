import './Signup.css'

import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import botImg from '../assets/bot.png'
import { useSignupUserMutation } from '../services/appApi'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [signupUser, { isLoading, error }] = useSignupUserMutation()
  const navigate = useNavigate()

  //image upload states
  const [image, setImage] = useState(null)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  function validateImg(e) {
    const file = e.target.files[0]
    if (file.size >= 1048576) {
      return alert('Tamanho máximo de arquivo 1mb')
    } else {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage() {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'kzj3xoq6')
    try {
      setUploadingImg(true)
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/dcwq0wmwi/image/upload',
        { method: 'post', body: data },
      )
      const urlData = await res.json()
      setUploadingImg(false)
      return urlData.url
    } catch (error) {
      setUploadingImg(false)
      console.log(error)
    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    if (!image) return alert('Por favor faça o upload de uma foto de perfil')
    const url = await uploadImage(image)
    console.log(url)
    // signup the user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data)
        navigate('/chat')
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form
            style={{ width: '80%', maxWidth: 500, marginTop: '5vh' }}
            onSubmit={handleSignup}
          >
            <h1 className="text-center">Criar conta</h1>
            <div className="signup-profile-pic__container">
              <img
                src={imagePreview || botImg}
                className="signup-profile-pic"
                alt="Bot"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                onChange={validateImg}
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
                pattern={'[A-z]{3,}'}
                title={
                  'Seu nome precisa ter pelo menos 3 letras e não possuir numeros ou caracteres especiais'
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                title={'Preencha este campo com um endereço de email válido'}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                pattern={
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,24}$'
                }
                title={`
• A senha deve ter entre 8 e 24 dígitos
• Pelo menos uma letra minúscula
• Pelo menos uma letra minúscula 
• Pelo menos um número
• Pelo menos um caractere especial
`}
                required
              />

              <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Aceitar os termos de uso"
                  tile={'Aceite os termos de uso para registrar-se'}
                  required
                />
              </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImg ? 'Registrando sua conta...' : 'Registrar'}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Já tem uma conta? <Link to="/login">Logue-se</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  )
}

export default Signup
