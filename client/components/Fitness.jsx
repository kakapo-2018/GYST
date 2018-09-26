import React, { Component } from 'react';

class Fitness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInfo: '',
      searchTerm: 'chicken burger'
    };
  }

  componentDidMount() {
    var foodWeb = require('foodweb');

    var item = foodWeb.search(this.state.searchTerm)[0];

    // kilocalories in 100 grams
    var calories = item.data.kcal;
    // kilocalories in a serving
    var serving = Math.round((item.data.primaryWeight / 100) * calories);
    // description of serving
    var servingDescription = item.data.primaryWeightDesc;

    this.setState({
      searchInfo:
        servingDescription +
        ' of ' +
        this.state.searchTerm +
        ' is ' +
        serving +
        ' calories'
    });
  }

  render() {
    return (
      <div>
        <h1>Food Trackr</h1>
        {this.state.searchInfo}
      </div>
    );
  }
}

export default Fitness;
