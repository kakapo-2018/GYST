import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    digit: {
        width:'80px',
        flexDirection: 'row',
        display: 'inline-block',
    }

});


class Bell extends React.Component {
 

    render() {
        const { classes } = this.props;
      
        return (
        <div>Bell</div>
        )
    }
}

export default withStyles(styles)(Bell);

