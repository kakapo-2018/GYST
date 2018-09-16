import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/example_action';

class ExternalAPI extends Component {
  componentDidMount() {
    this.props.fetchData('/api/ext/duck');
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    if (!this.props.items.meals) return null;

    return (
      <ul>
        {console.log('Props:', this.props.items)}
        {this.props.items.meals.map(item => (
          <li key={item.idMeal} className="list-group-item">
            Name: {item.strMeal}
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
)(ExternalAPI);
