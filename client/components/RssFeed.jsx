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

//Spinner
import { ClipLoader } from 'react-spinners';

import { css } from 'react-emotion';
const override = css`
  display: block;
  margin: 5% 22%;
`;

const styles = theme => ({
  media: {
    marginTop: '50px'
  },
  card: {
    maxHeight: '100%',
    minHeight: '100%',
    overflow: 'auto'
  },
  appbar: {
    position: 'fixed',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class RSS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redditfeedItems: [],
      nzheraldfeedItems: [],
      hackadayfeedItems: [],
      value: 0,
      loading: true
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  _asyncToGenerator = function(fn) {};
  TypoListItemgraphy;

  fetchData = source => {
    let Parser = require('rss-parser');
    let parser = new Parser();

    (async () => {
      let redditfeed = await parser.parseURL(`/api/ext/rss/reddit`);

      let nzheraldfeed = await parser.parseURL(`/api/ext/rss/nzherald`);

      let hackadayfeed = await parser.parseURL(`/api/ext/rss/hackaday`);

      redditfeed.items.forEach(item => {
        this.setState({ redditfeedItems: redditfeed.items });
      });

      nzheraldfeed.items.forEach(item => {
        this.setState({ nzheraldfeedItems: nzheraldfeed.items });
      });

      hackadayfeed.items.forEach(item => {
        this.setState({ hackadayfeedItems: hackadayfeed.items });
      });

      this.setState({ loading: false });
    })();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card className={classes.card}>
        <React.Fragment>
          <AppBar position="static" className={classes.appbar}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Reddit" />
              <Tab label="nz herald" />
              <Tab label="Hackaday" />
            </Tabs>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              <React.Fragment>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="110"
                  image="rss.jpg"
                />

                <Card className={classes.card}>
                  <ClipLoader
                    className={override}
                    sizeUnit={'px'}
                    size={250}
                    color={'#3f51b5'}
                    loading={this.state.loading}
                  />

                  <List>
                    {this.state.redditfeedItems.map(item => {
                      return (
                        <ListItem key={item.id}>
                          <Typography component="p">
                            <a target="_blank" href={item.link}>
                              {item.title}
                            </a>
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>
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
                />

                <Card className={classes.card}>
                  <ClipLoader
                    className={override}
                    sizeUnit={'px'}
                    size={250}
                    color={'#3f51b5'}
                    loading={this.state.loading}
                  />
                  <List>
                    {this.state.nzheraldfeedItems.map(item => {
                      return (
                        <ListItem key={item.id}>
                          <Typography component="p">
                            <a target="_blank" href={item.link}>
                              {item.title}
                            </a>
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </Card>
              </React.Fragment>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <React.Fragment>
                <CardMedia
                  component="img"
                  className={classes.media}
                  height="110"
                  image="rss.jpg"
                />

                <Card className={classes.card}>
                  <ClipLoader
                    className={override}
                    sizeUnit={'px'}
                    size={250}
                    color={'#3f51b5'}
                    loading={this.state.loading}
                  />
                  <List>
                    {this.state.hackadayfeedItems.map(item => {
                      return (
                        <ListItem key={item.id}>
                          <Typography component="p">
                            <a target="_blank" href={item.link}>
                              {item.title}
                            </a>
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </Card>
              </React.Fragment>
            </TabContainer>
          )}
        </React.Fragment>
      </Card>
    );
  }
}

export default withStyles(styles)(RSS);
