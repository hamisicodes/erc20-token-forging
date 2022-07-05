import React from 'react'
import { Button, Card } from 'react-bootstrap';


function Token({ name, balance }) {
  return (
    <Card className="mt-5" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>Token: {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          bal: {balance}
        </Card.Subtitle>
        <input placeholder="100" style={{ width: "10%" }} type="text" />
      </Card.Body>
      <Button variant="outline-success">MINT</Button>{" "}
      <Button variant="outline-danger">BURN</Button>{" "}
    </Card>
  );
}

export default Token
