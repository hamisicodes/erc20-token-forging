import { React} from "react";
import {
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

function Burns({
  handleSelect,
  burnCombinations,
  handleBurnAmount,
  handleBurnCombination,
  burnAmount,
}) {
  return (
    <div>
      <form
        onSubmit={(e) => handleBurnCombination(e, burnCombinations, burnAmount)}
      >
        <InputGroup className="mb-3">
          <FormControl
            aria-label="Text input with dropdown button"
            value={burnAmount}
            onChange={(e) => handleBurnAmount(e)}
          />

          <DropdownButton
            variant="outline-secondary"
            title={burnCombinations}
            id="input-group-dropdown-2"
            alignRight
            onSelect={(e) => handleSelect(e)}
          >
            <Dropdown.Item eventKey="Zero and One">Zero and One</Dropdown.Item>
            <Dropdown.Item eventKey="One and Two">One and Two</Dropdown.Item>
            <Dropdown.Item eventKey="Zero and Two">Zero and Two</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="Zero One and Two">
              Zero One and Two
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </form>
    </div>
  );
}

export default Burns;
