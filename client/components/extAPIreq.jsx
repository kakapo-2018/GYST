import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/example_action';

class ExtAPIreq extends Component {
  componentDidMount() {
    this.props.fetchData();
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
        {console.log(this.props.items)}
        {this.props.items.map(item => (
          <li key={item.id}>{item.strMeal}</li>
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
    fetchData: url => dispatch(itemsFetchData('/api/ext/duck'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtAPIreq);
