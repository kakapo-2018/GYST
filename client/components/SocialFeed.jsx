import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InstagramEmbed from 'react-instagram-embed';
import TextField from '@material-ui/core/TextField';

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

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

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

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
