import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const rooms = ['Primeira sala', 'Segunda sala', 'Terceira sala']
  const user = useSelector((state) => state.user)

  if (!user) {
    return <></>
  }
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
