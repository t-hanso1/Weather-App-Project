import React from "react";

import MainFormUI from "./MainFormUI.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [],
      weather: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(obj) {
    var updatedArray = this.state.inputs;
    updatedArray.push(obj);
    this.setState({ inputs: updatedArray });
    console.log("state.inputs:", this.state.inputs);
    console.log("lifted state");
    this.trackWeather(this.state.inputs[0].track);
  }

  trackWeather(track) {
    if (track) {
      this.getWeather();
      this.timerID = setInterval(() => this.getWeather(), 6000);
    } else {
      this.getWeather();
    }
  }

  getWeather() {
    // api call: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
    const api = "https://api.openweathermap.org/data/2.5/weather?zip=";
    const zip = this.state.inputs[0].zip;
    const api2 = ",us&appid=f06a8efab3cb829f05b9f7ff6f07f359&units=";
    const unit = this.state.inputs[0].radio_selection;

    fetch(api + zip + api2 + unit)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        let currentTemp = data.main.temp;
        let currentPress = data.main.pressure;
        let currentHum = data.main.humidity;
        let currentMin = data.main.temp_min;
        let currentMax = data.main.temp_max;
        let currentWind = data.wind.speed;
        let currentCond = data.weather[0].main;
        let city = data.name;

        var updated_arr = this.state.inputs; // updated inputs array
        if (updated_arr.length >= 60) {
          updated_arr.pop();
        }
        updated_arr.push(data);
        this.setState({
          weather: [
            currentTemp,
            currentPress,
            currentHum,
            currentMin,
            currentMax,
            currentWind,
            currentCond,
            city
          ],
          inputs: updated_arr
        });

        console.log("test: ", data.weather[0].main);
        console.log("state.weather:", this.state.weather);
        console.log("inputs array:", this.state.inputs);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  render() {
    const data1 = [
      {
        color: "steelblue",
        points: [{ x: 1, y: this.state.weather[0] }]
      }
    ];
    return (
      <div align="center">
        <Typography variant="h1">My Weather App</Typography>
        <MainFormUI onFormUpdate={this.handleChange} />
        <br />
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Current weather conditions for {this.state.weather[7]}:
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              Temp: {this.state.weather[0]}
              <br />
              Pressure: {this.state.weather[1]}
              <br />
              Humidity: {this.state.weather[2]}
              <br />
              Min Temp: {this.state.weather[3]}
              <br />
              Max Temp: {this.state.weather[4]}
              <br />
              Wind: {this.state.weather[5]}
              <br />
              Weather Conditions: {this.state.weather[6]}
              <br />
            </Typography>
          </CardContent>
        </Card>
        <Typography variant="h6">Powered by OpenWeatherMap</Typography>
      </div>
    );
  }
}
