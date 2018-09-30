import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

const wrapperStyles = {
  maxWidth: '100%',
  maxHeight: '100%',
  minWidth: '100%',
  minHeight: '100%'
};

const styles = theme => ({
  card: {
    padding: '3px',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%'
  },
  name: {
    textAlign: 'center'
  }
});

class WorldMap extends Component {
  state = {
    place: ''
  };

  handleClick(i) {
    this.setState({
      place:
        this.state.place == ''
          ? this.state.place + i.properties.name
          : this.state.place.includes(i.properties.name)
            ? this.state.place.replace(', ' + i.properties.name, '')
            : this.state.place + ', ' + i.properties.name
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{
              scale: 205,
              rotation: [-11, 0, 0]
            }}
            width={980}
            height={551}
            style={{
              width: '100%',
              height: 'auto'
            }}
          >
            <ZoomableGroup center={[0, 20]} disablePanning>
              <Geographies geography="./world.json">
                {(geographies, projection) =>
                  geographies.map(
                    (geography, i) =>
                      geography.id !== 'ATA' && (
                        <Geography
                          key={i}
                          onClick={i => {
                            this.handleClick(i);
                          }}
                          geography={geography}
                          projection={projection}
                          style={{
                            default: {
                              fill: '#ECEFF1',
                              stroke: '#607D8B',
                              strokeWidth: 0.75,
                              outline: 'none'
                            },
                            pressed: {
                              fill: '#607D8B',
                              stroke: 'grey',
                              strokeWidth: 0.75,
                              outline: 'none'
                            }
                          }}
                        />
                      )
                  )
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <p className={classes.name}>{this.state.place}</p>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(WorldMap);
