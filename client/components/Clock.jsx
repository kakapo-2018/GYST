import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    clock: {
        fontSize: '2em'
    }
});


class Clock extends React.Component {

    getInitialState(){
        return {time: new Date(), id: 0};
    }
 
    componentDidMount(){
        var state = this.state;
        state.id = setInterval(function(){
            var state = this.state;
            state.time = new Date();
            this.setState(state);
        }.bind(this), 1000);
        this.setState(state);
    }


    componentWillUnmount(){
        clearInterval(this.state.id);
    }

render(){
    return (
    <h1 className={classes.clock}>{$.format.date(this.state.time, 'HH:mm:ss')}</h1>
    )
}
}

export default withStyles(styles)(Clock);

