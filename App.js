import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Button, View, Dimensions} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function PantallaPrincipal({ navigation }) {
  return(
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
    </View>
  )
}

function PantallaMapa({ navigation }) {
      return(
          <View style={styles.estiloContenedor}>
          <MapView style={styles.estiloMapa}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
                latitude: -32.696790,
              longitude: -62.105270,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
          }}
         />
         <View style={styles.mapDrawerOverlay} />
        </View>
      )
    }

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
render() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={PantallaPrincipal} />
        <Drawer.Screen name="Mapa" component={PantallaMapa} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
 }
}

const styles = StyleSheet.create({
  estiloMapa: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  estiloContenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapDrawerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.0,
    height: Dimensions.get('window').height,
    width: 10
  }
})
