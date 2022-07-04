import React from 'react'
import { Button, Row, Col, Container, Card } from 'react-bootstrap';


function Token({ name, balance }) {
  return (
    <Card className='mt-5' style={{ width: "50%"}}>
    <Card.Body>
        <Card.Title>Token: {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">bal: {balance}</Card.Subtitle>
    </Card.Body>
      <Button >Mint</Button>
    </Card>
  )
}

export default Token
