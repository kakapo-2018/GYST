import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

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
      console.log(feed);

      feed.items.forEach(item => {
        this.setState({ feedItems: feed.items });
      });
    })();
  };

  render() {
    const { classes } = this.props;

    return (
      <Card
        className={classes.card}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          minHeight: '100%',
          overflow: 'scroll'
        }}
      >
        <CardMedia
          component="img"
          className={classes.media}
          height="110"
          image="rss.jpg"
          title="Contemplative Reptile"
        />
        <div>
          <ul>
            {this.state.feedItems.map(item => {
              return (
                <li key={item.id}>
                  <Typography component="p">
                    <a href={item.link}> {item.title} </a>
                  </Typography>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(RSS);
