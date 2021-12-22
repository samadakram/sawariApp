import React, { useState, useEffect } from 'react';
import { Button, View, Text, FlatList, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function DropOff({ navigation ,route }) {

    const { venue, region } = route.params;
    const [area, setArea] = useState({
        latitude: 24.9299578,
        longitude: 67.0884178,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.021
    });

    const [dropOff, setDropOff] = useState([]);
    const [searchTerm, SetSearchTerm] = useState('');

    // console.log('Latitude from Drop ==>', latitude);
    // console.log('Longitude from Drop ==>', longitude);


    useEffect(() => {
        (async () => {

            try{
                let location = await Location.getCurrentPositionAsync({});
                const { coords: { latitude, longitude } } = location;
                console.log('location==>', location)
    
                setArea({ ...area, latitude, longitude });
            } catch(e) {
                console.log("--->", e);
            }


        })();
    }, []);

    useEffect(() => {
        try{
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=FEFGU0HLWLYHKDM5XLIB2JNGNOJAQKGQYKNKBPGL2BJCS4YH&client_secret=OH3ZXLT2L5TVGJT55YNWBT3N53ZZJZEBNALQPSDRW4N5ZU1X&ll=${area.latitude},${area.longitude}&v=20210811`)
                .then((res) => res.json())
                .then((data => setDropOff(data.response.venues.map(place => place.name))))
        } catch(e) {
            console.log("==>", e);
        }
    }, [area]);


    return (
        <View style={styles.dropOff}>
            <Text>Book Ride Screen</Text>
            <TextInput
                style={styles.input}
                onChangeText={() => { }}
                value={searchTerm}
                placeholder="Search..."
            />
            <MapView style={styles.map} region={area}>
                <Marker
                    coordinate={area}
                    draggable
                    onDragStart={(e) => console.log('Drag Star', area)}
                    onDragEnd={(e) => setArea({
                        ...area,
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude
                    })}
                >
                    <Callout>
                        <Text>{dropOff[0] || "?"}</Text>
                    </Callout>
                </Marker>
            </MapView>
            <View
                style={styles.button}
            >
                <Button
                    title="Select Sawari Type"
                    onPress={() => { navigation.navigate('Select Sawari', {
                        currentLocation: venue || '?',
                        dropOffLocation: dropOff[0] || '?',
                        region,
                        area
                    }) }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        textAlign: 'center',
        fontSize: 18,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    dropOff: {
        flex: 1,
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

export default DropOff;