import "./App.css";
import { React, useState } from "react";
import { Button, Row, Col, Container, Card } from "react-bootstrap";
import MintableToken from "./components/Token";
import Nav from "./components/Navbar";
import Burns from "./components/Burns";

function App() {
  const [mintAmount, setMintAmount] = useState({ Zero: "", One: "", Two: ""});
  const [burnAmount, setBurnAmount] = useState("");
  const [burnCombinations, setBurnCombination] = useState("Combinations");


  const handleSelect = (e) => {
    setBurnCombination(e);
  };

  const handleInput = (e) => {
    setMintAmount((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMint = (amount) => {
    console.log(`Minting ${amount} amount`);
  };

  const handleBurnAmount = (e) => {
    setBurnAmount(e.target.value)
  }

  const handleBurnCombination = (e, burnCombinations, burnAmount) => {
    console.log(burnCombinations)
    console.log(burnAmount);
    e.preventDefault();
    setBurnAmount("");
    setBurnCombination("Combinations");
  }

  return (
    <Container fluid>
      <Nav />
      <Row>
        <Col>
          <MintableToken
            handleInput={handleInput}
            mintAmount={mintAmount.Zero}
            handleMint={handleMint}
            name="Zero"
            balance="10"
            id="0"
          />
        </Col>
        <Col>
          <MintableToken
            handleInput={handleInput}
            mintAmount={mintAmount.One}
            handleMint={handleMint}
            name="One"
            balance="10"
            id="1"
          />
        </Col>
        <Col>
          <MintableToken
            handleInput={handleInput}
            mintAmount={mintAmount.Two}
            handleMint={handleMint}
            name="Two"
            balance="10"
            id="2"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MintableToken name="Three" balance="10" id="3" />
        </Col>
        <Col>
          <MintableToken name="Four" balance="10" id="4" />
        </Col>
        <Col>
          <MintableToken name="Five" balance="10" id="5" />
        </Col>
        <Col>
          <MintableToken name="Six" balance="10" id="6" />
        </Col>
      </Row>

      <Row style={{ marginTop: "10%" }}>
        <h4>Burn combinations</h4>
        <Col md={4}>
          <Burns
            burnCombinations={burnCombinations}
            handleSelect={handleSelect}
            burnAmount={burnAmount}
            handleBurnAmount={handleBurnAmount}
            handleBurnCombination={handleBurnCombination}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
