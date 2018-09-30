import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

const styles = theme => ({
    clock: {
        fontSize: '4em'
    }
});


class Clock extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            time: new Date(), id: 0
        }
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
    const { classes } = this.props;
    
    return (
    <Moment className={classes.clock} format='HH:mm' >{this.state.time}</Moment>
    )
}
}

export default withStyles(styles)(Clock);

