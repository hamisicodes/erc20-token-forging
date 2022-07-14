import { React, useState } from "react";
import { Button, Card } from "react-bootstrap";

function MintableToken({
  handleInput,
  mintAmount,
  handleMint,
  name,
  balance,
  id,
  image,
  handleShow,
}) {
  const unmintable = ["3", "4", "5", "6"];
  const tradable = balance > 0;

  return (
    <Card
      className="mt-5 rounded mb-0  border border-success"
      style={{ width: "50%" }}
    >
      <Card.Body>
        <Card.Img className="rounded-circle" variant="top" src={image} />
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <strong />
          {balance}
        </Card.Subtitle>
        {!unmintable.includes(id) && (
          <input
            name={name}
            value={mintAmount}
            onChange={(e) => handleInput(e)}
            style={{ width: "30%" }}
            type="text"
          />
        )}
      </Card.Body>
      {!unmintable.includes(id) && (
        <>
          <Button
            onClick={(e) => handleMint(e, mintAmount, id, name)}
            variant="outline-dark"
          >
            MINT
          </Button>
        </>
      )}
      {unmintable.includes(id) &&
        tradable && (
          <Button variant="outline-info" onClick={() => handleShow(id)}>
            TRADE
          </Button>
        )}
    </Card>
  );
}

export default MintableToken;
