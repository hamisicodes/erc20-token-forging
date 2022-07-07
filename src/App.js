import "./App.css";
import { React, useState, useEffect } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { Contract, ethers, providers, utils } from "ethers";
import MintableToken from "./components/Token";
import Nav from "./components/Navbar";
import Burns from "./components/Burns";
import { address, abi } from "./contract/utils";

function App() {
  const [mintAmount, setMintAmount] = useState({ Zero: "", One: "", Two: "" });
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [error, setError] = useState("")
  const [burnAmount, setBurnAmount] = useState("");
  const [burnCombinations, setBurnCombination] = useState("Combinations");
  const [balanceOf, setBalanceOf] = useState({
    zero: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  });

  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const INFURA_ID = process.env.REACT_APP_INFURA_ID;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new Contract(address, abi, provider);
  // const account = "0xeD54606f329229A604448e4C327E993E8Bd796b2";

  const handleSelect = (e) => {
    setBurnCombination(e);
  };

  const handleInput = (e) => {
    setMintAmount((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBurnAmount = (e) => {
    setBurnAmount(e.target.value);
  };

  const handleBurnCombination = (e, burnCombinations, burnAmount) => {
    e.preventDefault();
    setBurnAmount("");
    setBurnCombination("Combinations");
  };

  const formatEthers = (amount) => ethers.utils.formatEther(amount);

  const tokenBalanceHandler = async () => {
    const signer = provider.getSigner();
    console.log(`signer: ${signer}`);

    const zero = await contract.balanceOf(userAddress, 0);
    const one = await contract.balanceOf(userAddress, 1);
    const two = await contract.balanceOf(userAddress, 2);
    const three = await contract.balanceOf(userAddress, 3);
    const four = await contract.balanceOf(userAddress, 4);
    const five = await contract.balanceOf(userAddress, 5);
    const six = await contract.balanceOf(userAddress, 6);

    const f_zero = formatEthers(zero);
    const f_one = formatEthers(one);
    const f_two = formatEthers(two);
    const f_three = formatEthers(three);
    const f_four = formatEthers(four);
    const f_five = formatEthers(five);
    const f_six = formatEthers(six);

    setBalanceOf({
      zero: f_zero,
      one: f_one,
      two: f_two,
      three: f_three,
      four: f_four,
      five: f_five,
      six: f_six,
    });
    console.log("Working...");
  };


  // ethereum and Metamask

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsWalletConnected(true);
        setUserAddress(account);
        console.log("Account Connected: ", account);
      } else {
        setError("Please install and connect your MetaMask Wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMint = async (amount) => {
      console.log(`Minting ${amount} amount`);
    };

  useEffect(() => {
    checkIfWalletIsConnected();
    tokenBalanceHandler();
  }, [isWalletConnected]);

  return (
    <Container fluid>
      <Nav />
      {isWalletConnected ? (
        <Alert key="success" variant="success">
          Wallet connected 🔒
        </Alert>
      ) : (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )}
      <Row>
        <Col>
          <MintableToken
            handleInput={handleInput}
            mintAmount={mintAmount.Zero}
            handleMint={handleMint}
            name="Zero"
            balance={balanceOf.zero}
            id="0"
          />
        </Col>
        <Col>
          <MintableToken
            handleInput={handleInput}
            mintAmount={mintAmount.One}
            handleMint={handleMint}
            name="One"
            balance={balanceOf.one}
            id="1"
          />
        </Col>
        <Col>
          <MintableToken
            handleInput={handleInput}
            mintAmount={mintAmount.Two}
            handleMint={handleMint}
            name="Two"
            balance={balanceOf.two}
            id="2"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MintableToken name="Three" balance={balanceOf.three} id="3" />
        </Col>
        <Col>
          <MintableToken name="Four" balance={balanceOf.four} id="4" />
        </Col>
        <Col>
          <MintableToken name="Five" balance={balanceOf.three} id="5" />
        </Col>
        <Col>
          <MintableToken name="Six" balance={balanceOf.three} id="6" />
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
