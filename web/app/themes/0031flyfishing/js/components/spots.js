import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import googleMapsStyles from './google-maps-styles'
import { connect } from 'react-redux'
import axios from 'axios'
import * as Actions from './../actions'

const createMapOptions = (maps) => {
    return {
        styles: googleMapsStyles
    }
}

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
    onClick={props.onMapClick}
    options={createMapOptions()}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
))

@connect((state, ownProps)=>{
    return {
        spots: state.contentReducer.content.spots
    }
})

export default class Spots extends Component {

    constructor(props){
        super(props)
        this.state = {
            center: {
                lat: 51.928431,
                lng: 4.070296
            },
            zoom: 3
        }
    }

    componentWillMount(){
        if (!this.props.spots.length) {
            let content = axios.get('/wp-json/wp/v2/spots?per_page=100')
            content.then(response => {
                this.props.dispatch(Actions.getSpots(response.data))
            })
        }
    }

    getMarkers(){
        return this.props.spots.map(spot=>{
            return {
                position: {
                    lat: Number(spot.acf.lat),
                    lng: Number(spot.acf.lng)
                },
                key: spot.id
            }
        })
    }

    render(){
        return(
            <div className="single">
                <h2>Spots page!</h2>
                <GettingStartedGoogleMap
                    containerElement={
                      <div style={{ height: `700px` }} />
                    }
                    mapElement={
                      <div style={{ height: `100%` }} />
                    }
                    onMapLoad={_.noop}
                    onMapClick={_.noop}
                    markers={this.getMarkers()}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onMarkerRightClick={_.noop}
                />
            </div>
        )
    }
}
