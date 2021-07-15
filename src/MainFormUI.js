import React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default class MainFormUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: "",
      radio_selection: "imperial",
      track: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    console.log("handleChange called", name);
    console.log(target.type);

    let input;
    if (target.type === "text") {
      input = target.value;
    }
    if (target.type === "checkbox") {
      input = target.checked;
    }
    if (target.type === "radio") {
      input = target.value;
    }

    this.setState({ [name]: input });
    console.log(input);
  }
  handleSubmit(event) {
    console.log("called handleSubmit");
    if (this.state.zip.length > 0) {
      alert("Data Submitted for Processing");
      this.props.onFormUpdate(this.state); // Lifting state and passing data to parent

      this.handleReset();
    } else {
      alert("Please provide a Zip Code.");
    }
    event.preventDefault();
  }
  handleReset(event) {
    console.log("called handleReset");
    this.setState({
      zip: "",
      radio_selection: "imperial",
      track: false
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleChange}>
          <Container maxWidth="sm">
            <Typography variant="h6">Check the weather near you:</Typography>
            <TextField
              name="zip"
              label="Zip Code"
              variant="filled"
              onChange={this.handleChange}
            />{" "}
            <br />
            <br />
            <FormControlLabel
              name="radio_selection"
              value="imperial"
              checked={this.state.radio_selection === "imperial"}
              control={<Radio color="primary" />}
              label="Imperial"
              onChange={this.handleChange}
            />
            <FormControlLabel
              name="radio_selection"
              value="metric"
              checked={this.state.radio_selection === "metric"}
              control={<Radio color="primary" />}
              label="Metric"
              onChange={this.handleChange}
            />
            <FormControlLabel
              name="radio_selection"
              value="default"
              checked={this.state.radio_selection === "default"}
              control={<Radio color="primary" />}
              label="Kelvin"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleChange}
                  value="track"
                  color="primary"
                />
              }
              label="Track"
              name="track"
            />
            <br />
            <br />
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Get Weather
            </Button>
          </Container>
        </form>
      </div>
    );
  }
}
