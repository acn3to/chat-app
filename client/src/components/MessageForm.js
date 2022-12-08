import React from 'react'
import { Form, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap'
import './MessageForm.css'

const MessageForm = () => {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <div className="messages-output"></div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <FormGroup>
              <FormControl></FormControl>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: '100%', backgroundColor: 'orange' }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default MessageForm
