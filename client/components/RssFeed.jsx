import React, { Component } from 'react';
import { itemsFetchData } from '../actions/example_action';

class RSS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  _asyncToGenerator = function(fn) {};

  fetchData = url => {
    let Parser = require('rss-parser');
    let parser = new Parser();

    (async () => {
      let feed = await parser.parseURL('/api/ext/rss');

      feed.items.forEach(item => {
        this.setState({ feedItems: feed.items });
      });
    })();
  };

  render() {
    return (
      <div>
        RSS
        <ul>
          {this.state.feedItems.map(item => {
            return <li>{item.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default RSS;
