import React from 'react'
import { SwatchesPicker } from 'react-color'

class ColorSetting extends React.Component {
  render() {
    return  <SwatchesPicker onChange={this.props.handleChange }/>
  }
}


export default ColorSetting