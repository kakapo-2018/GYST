import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    digit: {
        width:'80px',
        flexDirection: 'row',
        display: 'inline-block'
    }
});


class AlarmEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: this.props.time, 
            comment: this.props.comment,
            enable: true, intervalId: 0
        }
    }
    
    enable(){
        var currentTime = new Date();
        var interval = this.props.time.getHours() * 3600 + this.props.time.getMinutes() * 60 + this.props.time.getSeconds();
        interval -= currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
        interval *= 1000;

        if(interval < 0)
            interval += 86000 * 1000;

        var id = setTimeout(function() {
            this.setState($.extend(this.state, {enable: false}));
            this.props.onRing();
            this.disable();
        }.bind(this), interval);

        var state = this.state;
        state.intervalId = id;
        this.setState(state);
    }

    disable(){
        var state = this.state;
        clearTimeout(state.intervalId);
        state.intervalId = 0;
        this.setState(state);
    }

    handleCheck (event) {
        var state = this.state;
        state.enable = event.target.checked;
        this.setState(state);

        this.handleSwitch();
    }

    handleSwitch(){
        if(this.state.enable && this.state.intervalId == 0)
            this.enable();
        else if(!this.state.enable && this.state.intervalId != 0)
            this.disable();
    }


    getDefaultProps () {
        return {
            onRing: function(){},
            onClose: function(){},
            enable: true,
            comment: '',
            time: new Date()
        };
    }

    componentDidMount(){
        this.handleSwitch();
    }

    componentWillUnmount(){
        clearTimeout(this.state.intervalId);
    }
  
    render() {
        const { classes } = this.props;
       
        return (
            <li className="list-group-item">
            <input type="checkbox" onChange={this.handleCheck} ref="checkbox" checked={this.state.enable} />
            <span>{$.format.date(this.state.time, 'HH:mm:ss')}</span>
            &nbsp;<span className="label label-default">{this.state.comment}</span>
            <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}>
                <span aria-hidden="true">&times;</span>
            </button>
        </li>
        )
    }
}

export default withStyles(styles)(AlarmEntry);

