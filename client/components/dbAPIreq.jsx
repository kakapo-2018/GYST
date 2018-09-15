import React, { Component } from 'react';

class DbAPIreq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('/api/v1')
      .then(res => res.json())
      .then(
        result => {
          console.log('result', result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <li>
            DataBase Request Result:
            <ul className="list-group">
              {items.map(item => (
                <li className="list-group-item">
                  Name: {item.name}, Address: {item.address}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      );
    }
  }
}

export default DbAPIreq;
