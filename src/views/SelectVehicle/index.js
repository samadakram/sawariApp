import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SelectVehicle({ route, navigation }) {

  const {
    currentLocation,
    dropOffLocation,
    region,
    area
  } = route.params;

  const [vehicleType, setVehicleType] = useState('');

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return parseInt(d);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const distance = getDistanceFromLatLonInKm(region.latitude, region.longitude, area.latitude, area.longitude);

  let mini = distance * 25;

  let go = distance * 45;

  let bussiness = distance * 60;

  console.log("Distance ==>", distance)

  console.log('Range from Vehilce ==>', region);
  console.log('Area from Vehilce ==>', area);

  return (
    <View style={{ flex: 1, }}>
      <View style={styles.description}>
        <Text>Select Vehicle Screen</Text>
        <Text> Current Location:  {currentLocation}</Text>
        <Text>Drop Off Location: {dropOffLocation} </Text>
        <Text>Distance : {distance} KM </Text>
      </View>

      <View style={styles.vehicleButton}>
        <TouchableOpacity style={styles.touchable} onPress={() => { setVehicleType('MINI') }} >
          <Text style={{ color: 'white' }}>MINI</Text>
          <Text style={{ color: 'white' }}>Rs: {mini} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable} onPress={() => { setVehicleType('GO') }} >
          <Text style={{ color: 'white' }}>GO</Text>
          <Text style={{ color: 'white' }}>Rs: {go} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable} onPress={() => { setVehicleType('BUSINESS') }} >
          <Text style={{ color: 'white' }}>BUSINESS</Text>
          <Text style={{ color: 'white' }}>Rs: {bussiness} </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.confirmButton}>
        <TouchableOpacity onPress={() => { navigation.navigate('Finding Drivers') }} style={styles.touchable}>
          <Text style={{ color: 'white' }}>CONFIRM : {vehicleType} </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  vehicleButton: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  touchable: {
    borderWidth: 1,
    height: 42,
    width: '72%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: 'black',
    marginBottom: 10
  },
  description: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    borderColor: 'blue',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  confirmButton: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'purple',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  }
});

export default SelectVehicle;