import "./App.css";
import { Button, Row, Col, Container, Card } from "react-bootstrap";
import Token from "./components/Token";
import Nav from "./components/Navbar";

function App() {
  return (
    <Container>
      <Nav />
      <Token name="Zero" balance="10" />
      <Token name="One" balance="20" />
      <Token name="Two" balance="30" />
    </Container>
  );
}

export default App;
