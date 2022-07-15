import "./App.css";
import { React, useState, useEffect, useStateCallback } from "react";
import { Row, Col, Container, Alert, Spinner } from "react-bootstrap";
import { Contract, ethers, providers, utils } from "ethers";
import MintableToken from "./components/Token";
import Nav from "./components/Navbar";
import Burns from "./components/Burns";
import { address, abi } from "./contract/utils";
import CustomModal from "./components/Modal";

function App() {
  const [show, setShow] = useState(false);
  const [tokenToTradeFor, setTokenToTradeFor] = useState("0");
  const [tradeAmount, setTradeAmount] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [mintAmount, setMintAmount] = useState({ Zero: "", One: "", Two: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [error, setError] = useState("");
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

  const handleSelect = (e) => {
    setBurnCombination(e);
  };

  const handleTradeTokenSelect = (e) => {
    setTokenToTradeFor(e.target.value);
  };

  const handleTradeAmount = (e) => {
    setTradeAmount(e.target.value);
  };
  const handleShow = (id) => {
    setShow(true);
    setTokenId(id);
  };

  const handleClose = () => setShow(false);

  const handleInput = (e) => {
    setMintAmount((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBurnAmount = (e) => {
    setBurnAmount(e.target.value);
  };

  const handleTrade = async (from, to, amount) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithWallet = new ethers.Contract(address, abi, signer);
        const parsedAmount = ethers.utils.parseEther(amount);
        const txn = await contractWithWallet.tradeToken(from, to, parsedAmount);
        await txn.wait();
        await tokenBalanceHandler();
        handleClose();
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const formatEthers = (amount) => ethers.utils.formatEther(amount);

  const tokenBalanceHandler = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new Contract(address, abi, provider);
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
  };

  // ethereum and Metamask
  const switchNetworkRequest = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x89",
          rpcUrls: ["https://rpc-mainnet.matic.network/"],
          chainName: "Matic Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer.matic.network"],
        },
      ],
    });
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        await switchNetworkRequest();
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsWalletConnected(true);
        setUserAddress(account);
      } else {
        setError("Please install and connect your MetaMask Wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMint = async (e, amount, id, name) => {
    e.preventDefault();

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithWallet = new ethers.Contract(address, abi, signer);
        const txn = await contractWithWallet.mintToken(
          id,
          ethers.utils.parseEther(amount)
        );
        setIsLoading(true);
        setMintAmount({
          Zero: "",
          One: "",
          Two: "",
        });
        await txn.wait();
        await tokenBalanceHandler();
        setIsLoading(false);
      } else {
        setError("Pleae Install a MetaMask wallet");
      }
    } catch (error) {
      setError(
        "An error occured. Also allow a Minute cool down between mints!"
      );
    }
  };

  const handleBurnCombination = async (e, burnCombinations, burnAmount) => {
    e.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractWithWallet = new ethers.Contract(address, abi, signer);
        const amount = ethers.utils.parseEther(burnAmount);

        if (burnCombinations === "Zero and One") {
          const txn = await contractWithWallet.mintThree(
            [0, 1],
            [amount, amount]
          );
          await txn.wait();
        } else if (burnCombinations === "One and Two") {
          const txn = await contractWithWallet.mintFour(
            [1, 2],
            [amount, amount]
          );
          await txn.wait();
        } else if (burnCombinations === "One and Two") {
          const txn = await contractWithWallet.mintFive(
            [0, 2],
            [amount, amount]
          );
          await txn.wait();
        } else if (burnCombinations === "Zero One and Two") {
          const txn = await contractWithWallet.mintSix(
            [0, 1, 2],
            [amount, amount, amount]
          );
          await txn.wait();
        }
        setIsLoading(true);
        setBurnAmount("");
        setBurnCombination("Combinations");

        await tokenBalanceHandler();
        setIsLoading(false);
      } else {
        setError("Pleae Install a MetaMask wallet");
      }
    } catch (error) {
      setError(
        "An error occured during burning, check the data you are passing"
      );
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    tokenBalanceHandler();
  }, [isWalletConnected]);

  return (
    <Container fluid>
      <CustomModal
        show={show}
        tokenId={tokenId}
        handleClose={handleClose}
        handleTrade={handleTrade}
        handleTradeTokenSelect={handleTradeTokenSelect}
        tokenToTradeFor={tokenToTradeFor}
        handleTradeAmount={handleTradeAmount}
        tradeAmount={tradeAmount}
      />
      <Nav />
      {isLoading && <Spinner animation="grow" />}

      {error && (
        <Alert key="danger" variant="danger" dismissible>
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
            image="https://bit.ly/3OSUDjw"
            handleShow={handleShow}
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
            image="https://bit.ly/3amkAc5"
            handleShow={handleShow}
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
            image="https://bit.ly/3uvNM7r"
            handleShow={handleShow}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MintableToken
            name="Three"
            balance={balanceOf.three}
            id="3"
            image="https://bit.ly/3aqvEVx"
            handleShow={handleShow}
          />
        </Col>
        <Col>
          <MintableToken
            name="Four"
            balance={balanceOf.four}
            id="4"
            image="https://bit.ly/3nNpa6s"
            handleShow={handleShow}
          />
        </Col>
        <Col>
          <MintableToken
            name="Five"
            balance={balanceOf.five}
            id="5"
            image="https://bit.ly/3OPAbA7"
            handleShow={handleShow}
          />
        </Col>
        <Col>
          <MintableToken
            name="Six"
            balance={balanceOf.six}
            id="6"
            image="https://bit.ly/3Rgdpmu"
            handleShow={handleShow}
          />
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
