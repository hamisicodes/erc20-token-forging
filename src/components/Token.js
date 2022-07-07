import { React, useState } from "react";
import { Button, Card } from "react-bootstrap";

function MintableToken({
  handleInput,
  mintAmount,
  handleMint,
  name,
  balance,
  id,
}) {
  const unmintable = ["3", "4", "5", "6"];
  return (
    <Card className="mt-5" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>Token: {name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          bal: {balance}
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
            variant="outline-success"
          >
            MINT
          </Button>
        </>
      )}
    </Card>
  );
}

export default MintableToken;
