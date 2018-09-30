import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from 'react-live-clock';
import AlarmDigit from './AlarmDigit';
import Bell from './Bell'
import AlarmList from './AlarmList'

const styles = theme => ({
    card: {
        maxWidth: '100%',
        maxHeight: '500',
        minWidth: '100%',
        minHeight: '100%',
        textAlign: 'center'
    },
    container: {
        overflow:'hidden',
        margin: 'auto'
    },
    alarm: {
     overflow:'hidden'
    },
    control: {
        width:'80%',
        position: 'relative',
        display: 'inline-block',
    },
    time: {
        fontSize:'80px'
    }
});

var data = []

class Alarm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            bells : [
                {name: 'piano-melody', type: 'audio/wav',  path: 'bell/70214__qlc__65bpm-piano-melody-0589.wav'},
                {name: 'fractal-ramp-sonnet', type: 'audio/mpeg', path: 'bell/70002__qlc__240bpm-fractal-ramp-sonnet-track-1.mp3'},
                {name: 'osng', type: 'audio/wav',  path: 'bell/70213__qlc__152bpm-osng.wav'},
                {name: 'zichus', type: 'audio/wav',  path: 'bell/70217__qlc__85bpm-zichus.wav'}
            ]   
    }
    }

    handleCarry() {
        this.handleIncrease(true);
    }


    handleBorrow(){
        this.handleDecrease(true);
    }
        render() {
            const { classes } = this.props;
            var date = new Date();
            // var value = paddy(this.state.value, 2);
            return (
                <Card className={classes.card}>
                    <Clock className ={classes.time} />
                    <div className={classes.container}>
                        <div className={classes.alarm}>
                        <AlarmDigit numberSystem={24} val={date.getHours()} ref="hourDigit"/>
                        <AlarmDigit numberSystem={60} val={date.getMinutes()} onCarry={this.handleCarry.bind(this, 'hourDigit')} onBorrow={this.handleBorrow.bind(this, 'hourDigit')} ref="minuteDigit"/>
                         </div>  
                         <div className={classes.form}>
                            <input className={classes.control} type="text" ref="comment" placeholder="Leave your comment..." ref="comment"/>
                            <button className="btn btn-default" type="button" onClick={this.handleAddAlarm}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                        </div> 
                        <h2>Sounds</h2>
                        <Bell ref="bell" bells={this.state.bells} onAddAudio={this.handleAddAudio}/>
                        <h2>Alarms</h2>
                        <AlarmList data={data} ref="alarmList" onRing={this.handleRing}/> 
                    </div>  
                </Card>
            )
        }
    }

    export default withStyles(styles)(Alarm);

