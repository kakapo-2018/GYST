import React from 'react';
import { connect } from 'react-redux';
import { getInsta, addInsta } from '../actions/insta';
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
  },
  button: {
    marginTop: '25px'
  },
  text: {
    width: '75%',
    marginLeft: '27px',
    marginRight: '28px'
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
    this.props.getInsta(this.props.state.auth.user.id);
  }

  handleChange(e) {
    this.setState({
      instaURL: e.target.value
    });
  }

  handleRefresh() {
    this.setState({
      instaURL: ''
    });
    this.props.getPlaylist(this.props.state.auth.user.id);
  }

  handleClick() {
    this.props.addInsta(this.state.instaURL, this.props.state.auth.user.id);
    this.setState({
      instaURL: ''
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          {this.props.insta.insta &&
            this.props.insta.insta.map(post => {
              return (
                <InstagramEmbed
                  url={post.link}
                  hideCaption={false}
                  containerTagName="div"
                  injectScript
                  protocol=""
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              );
            })}
        </CardContent>
        <TextField
          className={classes.text}
          onChange={this.handleChange}
          value={this.state.instaURL}
          id="standard-textarea"
          label="Add instagram image url"
          placeholder="URL link"
          multiline
          margin="normal"
        />
        <Button
          mini
          className={classes.button}
          onClick={this.handleClick}
          variant="fab"
          color="primary"
          aria-label="Add"
        >
          <AddIcon />
        </Button>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    insta: state.insta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getInsta: id => {
      dispatch(getInsta(id));
    },
    addInsta: (uri, id) => {
      dispatch(addInsta(uri, id));
    }
  };
}
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(instaFeed)
);
