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
         
        }
    }
    
  
    render() {
        const { classes } = this.props;
       
        return (
            <div>AlarmEntry</div>
        )
    }
}

export default withStyles(styles)(AlarmEntry);

