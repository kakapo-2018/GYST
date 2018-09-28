import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

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
      <Paper
        style={{
          padding: '10px',
          maxWidth: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          minHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <div>
          RSS
          <ul>
            {this.state.feedItems.map(item => {
              return <li key={item.id}>{item.title}</li>;
            })}
          </ul>
        </div>
      </Paper>
    );
  }
}

export default RSS;
