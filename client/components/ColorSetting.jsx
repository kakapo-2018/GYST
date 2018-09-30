import React from 'react';
import { SwatchesPicker } from 'react-color';

class ColorSetting extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <SwatchesPicker
          width={'100%'}
          height={'100%'}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default ColorSetting;
