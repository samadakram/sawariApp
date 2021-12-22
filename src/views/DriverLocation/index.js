import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { geohashForLocation } from 'geofire-common';
import { storeDriverLocation } from '../../config/firebase';
import uuid from 'react-native-uuid';
import Car from '../../../assets/car.png';

function DriverLocation({ driverName }) {

    const id = uuid.v4();
    console.log("Driver Name==>", driverName);

    const [region, setRegion] = useState({
        latitude: 24.9299578,
        longitude: 67.0884178,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.021
    });

    const [venue, setVenue] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                distanceInterval: 0.01,
            }, async (location) => {
                const { coords: { latitude, longitude } } = location;
                setRegion({ ...region, latitude, longitude });

                const lat = latitude;
                const lng = longitude;

                try {
                    const hash = geohashForLocation([lat, lng]);
                    await storeDriverLocation(driverName, id, {
                        geohash: hash, lat, lng
                    })
                 } catch (e) {
                    console.log('Nahi Gaya', e);
                }
            }
            );

            // let location = await Location.getCurrentPositionAsync({});
            // const { coords: { latitude, longitude } } = location;
            // console.log('location==>', location)

            // setRegion({ ...region, latitude, longitude });
        })();
    }, []);


    useEffect(() => {
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=FEFGU0HLWLYHKDM5XLIB2JNGNOJAQKGQYKNKBPGL2BJCS4YH&client_secret=OH3ZXLT2L5TVGJT55YNWBT3N53ZZJZEBNALQPSDRW4N5ZU1X&ll=${region.latitude},${region.longitude}&v=20210811`)
            .then((res) => res.json())
            .then((data => setVenue(data.response.venues.map(place => place.name))))
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
                    <Image source={require('../../../assets/car.png')} style={{ height: 35, width: 35, tintColor: '#367677' }} />
                    <Callout>
                        <Text>{venue[0]}</Text>
                    </Callout>
                </Marker>
            </MapView>
            <View
                style={styles.button}
            >
                <Button
                    title="Select Drop Off"
                    style={styles.btn}
                    onPress={() => { }}
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
        width: 400,
    },
    btn: {
        backgroundColor: '#367677'
    },
});

export default DriverLocation;