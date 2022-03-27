import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

import {
  FormGroup,
  Form,
  Col,
  Row,
  Input,
  Button,
  Container,
} from "reactstrap";

const INTERPUNCT = "·";

const Tones = {
  LOW_TONE: "`",
  FALLING_TONE: "^",
  HIGH_TONE: "'",
  RISING_TONE: "ˇ",
  MID_TONE: "–",
};

function App() {
  const [sentence, setSentence] = useState("");
  const [tones, setTones] = useState([]);

  const handleInputChange = (input) => {
    setSentence(input.target.value);
  };

  const getTones = () => {
    console.log(sentence);
    axios
      .get(`http://137.74.194.181:3000/api/sentence/${sentence}`)
      .then((res) => {
        setTones(res.data);
      });
  };

  const getToneRepresentation = (tone) => {
    return Tones[tone];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getTones();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Col sm={12}>
              <Input
                id="sentenceInput"
                name="sentence"
                placeholder="Type your sentence"
                type="text"
                value={sentence}
                onChange={handleInputChange}
              />
            </Col>
            {/* <Col sm={2}>
              <Button onClick={getTones}>Enter</Button>
            </Col> */}
          </FormGroup>
        </Form>
        <Container>
          <Row>
            {tones.length > 0 &&
              tones
                .map((syllable) => {
                  return (
                    <Col>
                      <p>{syllable.syllable}</p>
                      <p>{getToneRepresentation(syllable.tone)}</p>
                    </Col>
                  );
                })
                .reduce((prev, curr) => [prev, INTERPUNCT, curr])}
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
