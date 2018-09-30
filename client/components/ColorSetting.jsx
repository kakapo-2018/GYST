import React from 'react'
import { SketchPicker } from 'react-color'

class ColorSetting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    background: '#fff',
  };

  }
  
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };


  render() {
    console.log(this.state)
    return  <SketchPicker   color={ this.state.background }
                            onChangeComplete={ this.handleChangeComplete }/>
  }
}


export default ColorSetting