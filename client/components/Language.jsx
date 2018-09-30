import React, { Component } from 'react';

//superagent for requests
const request = require('superagent');

//Material UI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

//Store image currently processing on cloud so the page can render it
let imgToTranslate = '';

const styles = theme => ({
  card: {
    minHeight: '100%',
    maxHeight: '100%',
    padding: '1%'
  },
  textfield: {
    marginLeft: '15px',
    width: '35%'
  }
});

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordIdentified: '',
      wordTranslated: '',
      answer: ''
    };
  }

  componentDidMount() {
    this.getIMG('https://picsum.photos/300/300/?random');
  }

  getIMG = url => {
    const getResourceName = fetch(url)
      .then(response => Promise.all([response.url, response.blob()]))
      .then(([resource, blob]) => {
        this.recognition(resource);
        return resource;
      });

    getResourceName
      .then(res => {
        imgToTranslate = res;
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  recognition = src => {
    var b = JSON.stringify({
      requests: [
        {
          image: {
            source: {
              imageUri: src
            }
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 1
            }
          ]
        }
      ]
    });

    var e = new XMLHttpRequest();

    e.onload = () => {
      console.log(
        'Word detected:',
        JSON.parse(e.responseText).responses[0].labelAnnotations[0].description
      );

      this.setState({ wordIdentified: 'fek' });

      var text = JSON.parse(e.responseText).responses[0].labelAnnotations[0]
        .description;
      var key = 'AIzaSyApkbdj2rRQyrsyPJsS4H1rRnxYNSqa-tA';
      var source = 'en';
      var dest = 'zh-CN	';

      var url = 'https://www.googleapis.com/language/translate/v2?';
      url +=
        'key=' + key + '&source=' + source + '&target=' + dest + '&q=' + text;

      request.get(url).then(result => {
        console.log(
          'Word translated',
          JSON.parse(result.text).data.translations[0].translatedText
        );
      });
    };
    e.open(
      'POST',
      'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyApkbdj2rRQyrsyPJsS4H1rRnxYNSqa-tA',
      !0
    );
    e.send(b);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <img src={imgToTranslate} />
        <TextField
          className={classes.textfield}
          id="wordAnswer"
          label="Answer"
          // className={classes.textField}
          // value={this.state.searchTerm}
          onChange={evt => this.updateInputValue(evt)}
          margin="normal"
          variant="outlined"
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Language);
