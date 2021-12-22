import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const FindingDrivers = () => {

    const [isvisible, setVisible] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setVisible(!isvisible);
          }, 3000);
        }, [])
      


    return (
        <View>
            <Spinner
                visible={isvisible}
                textContent={'Finding Drivers....'}
                // textStyle={styles.spinnerTextStyle}
            />
            <Text>Finding Drivers....</Text>
        </View>
    )
}

export default FindingDrivers;

const styles = StyleSheet.create({})
