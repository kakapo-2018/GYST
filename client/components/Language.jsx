import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

const request = require('superagent');

let imgToTranslate = '';

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ident: ''
    };
  }

  componentDidMount() {
    this.getIMG('https://picsum.photos/350/350/?random');
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

      this.setState({ ident: 'fek' });

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
    return (
      <Card>
        <img src={imgToTranslate} />
      </Card>
    );
  }
}

export default Language;
