import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/example_action';

class InternalAPI extends Component {
  componentDidMount() {
    this.props.fetchData('/api/v1/');
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.username} className="list-group-item">
            Name: {item.username}, Email: {item.email}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalAPI);
