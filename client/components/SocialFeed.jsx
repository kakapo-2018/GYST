import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InstagramEmbed from 'react-instagram-embed';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  card: {
    height: '100%',
    width: '100%',
    overflow: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class instaFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instaURL: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    //this.props.getInsta(this.props.state.auth.user.id);
  }

  handleChange(e) {
    this.setState({
      instaURL: e.target.value
    });
  }

  handleRefresh() {
    this.setState({
      inputURI: ''
    });
    this.props.getPlaylist(this.props.state.auth.user.id);
  }

  handleClick() {
    this.setState({
      inputURI: ''
    });
    this.props.addPlaylist(this.state.inputURI, this.props.state.auth.user.id);
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <TextField
            id="standard-textarea"
            label="Add instagram image url"
            placeholder="URL link"
            multiline
            margin="normal"
          />
          <Button
            onClick={this.handleClick}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
          <InstagramEmbed
            url="https://www.instagram.com/p/Zw9o4/"
            hideCaption={false}
            containerTagName="div"
            injectScript
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            hideCaption={false}
            containerTagName="div"
            injectScript
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            hideCaption={false}
            containerTagName="div"
            injectScript
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            hideCaption={false}
            containerTagName="div"
            injectScript
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </CardContent>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    spotify: state.spotify
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaylist: id => {
      dispatch(getSpotifyAction(id));
    },
    addPlaylist: (uri, id) => {
      dispatch(addSpotifyAction(uri, id));
    }
  };
}
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(instaFeed)
);
