import React, { Component } from 'react';

class ExtAPIreq extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            items: [],      
         }
    }

    componentDidMount() {
       fetch('/api/ext/duck')
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result', result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
                    <li>Meals: 
                        <ul className="list-group">
                            {items.meals.map(item => (
                                <li className="list-group-item">{item.strMeal}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
          );
        }
      }
    }
 
export default ExtAPIreq;

