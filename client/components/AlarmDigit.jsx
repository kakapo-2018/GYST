import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    digit: {
        width:'80px',
        flexDirection: 'row',
        display: 'inline-block',
    },
    input: {
        fontSize: '50px',
        height: '45px',
        width: '45px',
        border: 0,
        boxShadow: 'none',
        outline: 0,
        textAlign:'center'
    },
    btn:{
        width: '40px',
        height:'20px'
    }
});

var paddy = function(n, p, c){
    var pad_char = (typeof c !== 'undefined' ? c : '0');
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}

class AlarmDigit extends React.Component {
    
    getInterval(counter){
        if(counter > 5)
            return 75;
        else if(counter > 20)
            return 50;
        else if(counter > 30)
            return 5;
        else
            return 150;
    }

    getInitialState(){
        var val = typeof this.props.val !== 'undefined' ? this.props.val : 0;
        return {value: val, increasing: 0, decreasing: 0, increaseCounter: 0, decreaseCounter: 0};
    }

    handleCarry(){
        this.handleIncrease(true);
    }

    handleBorrow(){
        this.handleDecrease(true);
    }

    handleIncrease(once){
        var state = this.state;
        state.value ++;
        state.increaseCounter ++;
        if(state.value >= this.props.numberSystem)
        {
            if(typeof this.props.onCarry === 'function')
                this.props.onCarry();
            state.value = 0;
        }

        if(once !== true)
            state.increasing = setTimeout(this.handleIncrease, this.getInterval(this.state.increaseCounter));
        this.setState(state);
    }

    handleStartIncrease(){
        var state = this.state;
        state.increaseCounter = 0;
        this.setState(state);
        this.handleIncrease();
    }

    handleStopIncrease(){
        var state = this.state;
        clearTimeout(state.increasing);
        this.setState(state);
    }

    handleDecrease(once){
        var state = this.state;
        state.value --;
        state.decreaseCounter ++;
        if(state.value < 0)
        {
            if(typeof this.props.onBorrow === 'function')
                this.props.onBorrow();
            state.value = this.props.numberSystem - 1;
        }
        if(once !== true)
            state.decreasing = setTimeout(this.handleDecrease, this.getInterval(this.state.decreaseCounter));
        this.setState(state);
    }

    handleStartDecrease(){
        var state = this.state;
        state.decreasing = true;
        state.decreaseCounter = 0;
        this.setState(state);
        this.handleDecrease();
    }

    handleStopDecrease(){
        var state = this.state;
        clearTimeout(state.decreasing)
        this.setState(state);
    }

    handleChange(event){
        var value = event.target.value.slice(-2);
        if(value >= this.props.numberSystem)
            value = event.target.value.slice(-1);
        console.log(value);
        this.setState($.extend(this.state, {value: value}));
    }

    handleKeyDown(event){
        if(event.keyCode == 38) {
            this.handleIncrease(true);
        }

        if(event.keyCode == 40) {
            this.handleDecrease(true);
        }
    }

    handleWheel(event){
        event.preventDefault();
        if(event.deltaY > 0){
            this.handleDecrease(true);
        }
        if(event.deltaY < 0){
            this.handleIncrease(true);
        }
    }

    render() {
        const { classes } = this.props;
      
        //  var value = paddy(this.state.value, 2);
        return (
                <div className={classes.digit}>
                    <button className={classes.btn} onMouseDown={this.handleStartIncrease} onMouseUp={this.handleStopIncrease}><span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span></button>
                     <input className={classes.input} type="number" /*value={value}*/ onChange={this.handleChange} onKeyDown={this.handleKeyDown} onWheel={this.handleWheel} />
                    <button className={classes.btn} onMouseDown={this.handleStartDecrease} onMouseUp={this.handleStopDecrease}><span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span></button>
                </div>
        )
    }
}

export default withStyles(styles)(AlarmDigit);

