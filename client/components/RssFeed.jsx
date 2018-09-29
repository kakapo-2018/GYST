import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    overflow: 'auto'
  },
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
      redditfeedItems: [],
      stufffeedItems: [],

      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.fetchData();
  }

  _asyncToGenerator = function(fn) {};
  TypoListItemgraphy;

  fetchData = source => {
    let Parser = require('rss-parser');
    let parser = new Parser();

    (async () => {
      let redditfeed = await parser.parseURL(`/api/ext/rss/reddit`);

      let stufffeed = await parser.parseURL(`/api/ext/rss/stuff`);

      redditfeed.items.forEach(item => {
        this.setState({ redditfeedItems: redditfeed.items });
      });

      stufffeed.items.forEach(item => {
        this.setState({ stufffeedItems: stufffeed.items });
      });
    })();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Reddit" />
            <Tab label="Stuff.co.nz" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>

        <div className={classes.root}>
          {value === 0 && (
            <TabContainer>
              <React.Fragment>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="110"
                  image="rss.jpg"
                  title="Contemplative Reptile"
                />
                <Card
                  className={classes.card}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minWidth: '100%',
                    minHeight: '100%',
                    overflow: 'auto'
                  }}
                >
                  <div>
                    <List>
                      {this.state.redditfeedItems.map(item => {
                        return (
                          <ListItem>
                            <Typography component="p">
                              <a target="_blank" href={item.link}>
                                {' '}
                                {item.title}{' '}
                              </a>
                            </Typography>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </Card>
              </React.Fragment>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <React.Fragment>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="110"
                  image="rss.jpg"
                  title="Contemplative Reptile"
                />
                <Card
                  className={classes.card}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    minWidth: '100%',
                    minHeight: '100%',
                    overflow: 'auto'
                  }}
                >
                  <div>
                    <List>
                      {this.state.stufffeedItems.map(item => {
                        return (
                          <ListItem>
                            <Typography component="p">
                              <a target="_blank" href={item.link}>
                                {item.title}
                              </a>
                            </Typography>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </Card>
              </React.Fragment>
            </TabContainer>
          )}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
        </div>
      </React.Fragment>
    );
  }
}

//   render() {
//     const { classes } = this.props;

//     return (
//       <React.Fragment>
//         <CardMedia
//           component="img"
//           className={classes.media}
//           height="110"
//           image="rss.jpg"
//           title="Contemplative Reptile"
//         />
//         <Card
//           className={classes.card}
//           style={{
//             maxWidth: '100%',
//             maxHeight: '100%',
//             minWidth: '100%',
//             minHeight: '100%',
//             overflow: 'auto'
//           }}
//         >
//           <div>
//             <List>
//               {this.state.feedItems.map(item => {
//                 return (
//                   <ListItem>
//                     <Typography component="p">
//                       <a href={item.link}> {item.title} </a>
//                     </Typography>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </div>
//         </Card>
//       </React.Fragment>
//     );
//   }
// }

export default withStyles(styles)(RSS);
