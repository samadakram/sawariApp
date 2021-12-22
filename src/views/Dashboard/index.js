import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { storeLocation, getNearestDrivers } from '../../config/firebase';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Dashboard({navigation}) {

  console.ignoredYellowBox = ['Setting a timer'];

  const [region, setRegion] = useState({
    latitude: 24.9299578,
    longitude: 67.0884178,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.021
  });

  const [venue, setVenue] = useState([]);

  const id = uuid.v4();
  console.log('UUID==>', id);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try{
        let location = await Location.getCurrentPositionAsync({});
        const { coords: { latitude, longitude } } = location;
        console.log('location==>', location)
  
        setRegion({ ...region, latitude, longitude });
      } catch(e) {
        console.log("Error",e);
      }


      const lat = latitude;
      const lng = longitude;

      const name = await AsyncStorage.getItem('@storage_Key')
      if (name !== null) {
        console.log(name);
      }

      try {
        const hash = geohashForLocation([lat, lng]);
        await storeLocation( id, {
          geohash: hash, lat, lng
        })
        console.log('Chala Gaya');
      } catch (e) {
        console.log('Nahi Gaya', e);
      }

    })();
  }, []);


  useEffect(() => {
    try{
      fetch(`https://api.foursquare.com/v2/venues/search?client_id=FEFGU0HLWLYHKDM5XLIB2JNGNOJAQKGQYKNKBPGL2BJCS4YH&client_secret=OH3ZXLT2L5TVGJT55YNWBT3N53ZZJZEBNALQPSDRW4N5ZU1X&ll=${region.latitude},${region.longitude}&v=20210811`)
        .then((res) => res.json())
        .then((data => setVenue(data.response.venues.map(place => place.name))))
    } catch(e) {
      console.log("Error==>", e);
      throw e;
    }
  }, [region]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={region}
          draggable
          onDragStart={(e) => console.log('Drag Star', region)}
          onDragEnd={(e) => setRegion({
            ...region,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })}
        >
          <Callout>
            <Text>{venue[0] || "?"}</Text>
          </Callout>
        </Marker>
      </MapView>
      <View
        style={styles.button}
      >
        <Button
          title="Select Drop Off"
          onPress={() => {
            navigation.navigate('DropOff', {
              venue: venue[0] || '?',
              region
            })
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 20,
    width: 400
  },
});

export default Dashboard;