import React from 'react'
import { SketchPicker } from 'react-color'

class ColorSetting extends React.Component {
  render() {
    return  <SketchPicker onChangeComplete={this.props.handleChangeComplete }/>
  }
}


export default ColorSetting