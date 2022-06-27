import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import React, {Component} from 'react'
export class Maps extends Component {
    
    render() {
        const mapStyles = {
            width: '50%',
            height: '50%',
          };
        return (
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 12.97, lng: 77.5}}
          >
            <Marker position={{ lat: 12.97, lng: 77.5}} />
          </Map>
        );
      }
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAz1ANL77X3uPqUb61f94GsX3_j0WXvELY'
  })(Maps);
 