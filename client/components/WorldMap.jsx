import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        default: {
          fill: "#ECEFF1",
          stroke: "#607D8B",
          strokeWidth: 0.75,
          outline: "none",
        }
      }
    }
  }
  handleClick() {
    console.log("clicked")
    console.log(this.state.style.default.fill)
    this.setState({
      style: {
      default: {
        fill: "#607D8B",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },                    
      pressed: {
        fill: "red",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },

    }
    })
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="./world.json">
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  onClick={() => this.handleClick()}
                  style={{
                    default: {
                      fill: this.state.style,
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "red",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}
export default WorldMap