import React from 'react'
import { SketchPicker } from 'react-color'

class ColorSetting extends React.Component {
  constructor(props){
    super(props)
 

  }
  
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };


  render() {
    console.log(this.state.background)
    return  <SketchPicker   /*color={ this.state.background }*/
                            onChangeComplete={ this.handleChangeComplete }/>
  }
}


export default ColorSetting