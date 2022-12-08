import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const Sidebar = () => {
  const rooms = ['Primeira sala', 'Segunda sala', 'Terceira sala']

  return (
    <>
      <h2>Salas disponíveis</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroupItem key={index}>{room}</ListGroupItem>
        ))}
      </ListGroup>
      <h2>Membros</h2>
    </>
  )
}

export default Sidebar
