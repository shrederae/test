import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


export default class App extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this.getLocationAsync();
  }

    handleMapRegionChange = (mapRegion) => {
      this.setState({ mapRegion });
    }

  async getLocationAsync (){
   let { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  }
  
  getMapView = () => {
    if (this.state.locationResult === null) {
      return (<Text>Finding your current location...</Text>)
    } else if (this.state.hasLocationPermissions === false) {
       return (<Text>Location permissions are not granted.</Text>)
    } else if (this.state.mapRegion === null) {
       return (<Text>Map region doesn't exist</Text>)
    } 
  }
  
  render() {
    return (
      <View style={styles.container}>

        {
          <View>
            {this.getMapView()}
            <MapView
              style={{ alignSelf: 'stretch', height: 400 }}
              region={this.state.mapRegion}
              onRegionChange={this.handleMapRegionChange}
            />
          </View>
        }
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
  },
});
