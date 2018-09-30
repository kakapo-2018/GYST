import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from 'react-live-clock';

const styles = theme => ({
    card: {
        maxWidth: '100%',
        maxHeight: '500',
        minWidth: '100%',
        minHeight: '100%',
        textAlign: 'center'
    },
    clock: {
        fontSize: '80px'
    }
});

// var bells = [
//     {name: 'piano-melody', type: 'audio/wav',  path: 'bell/70214__qlc__65bpm-piano-melody-0589.wav'},
//     {name: 'fractal-ramp-sonnet', type: 'audio/mpeg', path: 'bell/70002__qlc__240bpm-fractal-ramp-sonnet-track-1.mp3'},
//     {name: 'osng', type: 'audio/wav',  path: 'bell/70213__qlc__152bpm-osng.wav'},
//     {name: 'zichus', type: 'audio/wav',  path: 'bell/70217__qlc__85bpm-zichus.wav'}
// ];

class Alarm extends React.Component {
    
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
        // var value = paddy(this.state.value, 2);
        return (
            <Card className={classes.card}>
                <Clock className={classes.clock} format={'H:mm:ss'} timezone={'Pacific/Auckland'} />
                <div className="alarmDigit alarm-digit">
                    <button className="increase btn btn-default" onMouseDown={this.handleStartIncrease} onMouseUp={this.handleStopIncrease}><span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span></button>
                     <input className="form-control text-center" type="text" /*value={value}*/ onChange={this.handleChange} onKeyDown={this.handleKeyDown} onWheel={this.handleWheel} />
                    <button className="decrease btn btn-default" onMouseDown={this.handleStartDecrease} onMouseUp={this.handleStopDecrease}><span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span></button>
                </div>

            </Card>
        )
    }
}

export default withStyles(styles)(Alarm);

