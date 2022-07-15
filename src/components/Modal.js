import { InputGroup, Modal, Form, Button } from "react-bootstrap";

function CustomModal({
  handleClose,
  show,
  tokenId,
  handleTrade,
  handleTradeTokenSelect,
  tokenToTradeFor,
  handleTradeAmount,
  tradeAmount
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trade Token {tokenId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Token Name</Form.Label>
              <Form.Select
                value={tokenToTradeFor}
                onChange={(e) => handleTradeTokenSelect(e)}
              >
                <option value="0">Zero</option>
                <option value="1">One</option>
                <option value="2">Two</option>
              </Form.Select>
            </Form.Group>
            <InputGroup className="mb-3" onChange={(e) => handleTradeAmount(e)}>
              <InputGroup.Text>ETH</InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest eth)" />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleTrade(tokenId, tokenToTradeFor, tradeAmount)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomModal;
