'use strict';

var React = require('react');
var googleApiLoader = require('../actions/GoogleAPILoader');

class Gmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var _this = this;

    googleApiLoader.authLoaded(function() {
      _this.setState({ authLoaded: true });

      googleApiLoader.getAuth2().currentUser.listen(function(user) {
        _this.setState({ finishedLoading: true });
        if (user.getBasicProfile()) {
          var profile = user.getBasicProfile();

          var profileProxy = {};
          profileProxy.id = profile.getId();
          profileProxy.name = profile.getName();
          profileProxy.thumb = profile.getImageUrl();
          profileProxy.email = profile.getEmail();
          _this.setState({ loggedInUser: profileProxy });
        }
        _this.setState({ isLoggedIn: user.getBasicProfile() ? true : false });
      });
    });

    googleApiLoader.clientsLoaded(function() {
      _this.setState({ clientsLoaded: true });
    });
  }

  email() {
    console.log('hit');
    googleApiLoader
      .getAuth2()
      .users.messages(profileProxy.id)
      .then(
        function(response) {
          console.log('Hello, ' + response.result.names[0].givenName);
        },
        function(reason) {
          console.log('Error: ' + reason.result.error.message);
        }
      );
  }

  toggleSignIn() {
    if (!googleApiLoader.getAuth2().isSignedIn.get()) googleApiLoader.signIn();
  }
  render() {
    var loggedInUserThumb = null;

    if (this.state.loggedInUser)
      loggedInUserThumb = <img src={this.state.loggedInUser.thumb} />;

    var toggleLoginButton = (
      <button onClick={this.toggleSignIn}>Login to Google</button>
    );

    if (this.state.finishedLoading) {
      if (this.state.isLoggedIn) {
        return (
          <div>
            {loggedInUserThumb}
            {this.state.loggedInUser.name}
            <hr />
            You're now free to use the Google APIs!
            <button onClick={this.email}>Get fucking emails</button>
          </div>
        );
      } else return toggleLoginButton;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Gmail;
