import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class Modal2 extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.closeModal}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              About
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Thanks for visiting. We hope you enjoy using the GYST Dashboard.
              Created in 2018 by:
              <ul>
                <li>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://github.com/lukechadwick"
                  >
                    Luke C
                  </a>
                </li>
                <li>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://github.com/Yuzuki-S"
                  >
                    Yuzuki S
                  </a>
                </li>
                <li>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://github.com/leslie-alldridge"
                  >
                    Leslie A
                  </a>
                </li>
              </ul>
              As part of our final group project at Enspiral Dev Academy.
              <br />
              <img
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                src="/team.jpg"
              />
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

const SimpleModalWrapped = withStyles(styles)(Modal2);

export default withStyles(styles)(Modal2);
