import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Dashboard from '../../views/Dashboard';
import DropOff from '../../views/DropOff';
import FavoriteLocations from '../../views/FavoriteLocations';
import YourTrips from '../../views/YourTrips';
import TripDetails from '../../views/TripDetails';
import Login from '../../views/Login';
import SelectVehicle from '../../views/SelectVehicle';
import FindingDrivers from '../../views/FindingDrivers';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const [isSignedIn, setSignedIn] = useState(false);
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSignedIn ?
        <Stack.Screen
          name="Auth"
          component={() => <AuthNavigator setSignedIn={setSignedIn} />}
        />
        :
        <Stack.Screen name="App" component={AppNavigator}
        />
      }
    </Stack.Navigator>
  </NavigationContainer>
}

function AuthNavigator({ setSignedIn }) {
  return <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Login"
      component={() =>  <Login setSignedIn={setSignedIn} />}
    />
  </Stack.Navigator>
}

function AppNavigator() {
  return <Drawer.Navigator >
    <Drawer.Screen name="Dashboard" component={DashboardStack}/>
    <Drawer.Screen name="Your Trips" component={TripsStack} />
  </Drawer.Navigator>
}

function DashboardStack() {
  return (<Stack.Navigator>
    <Stack.Screen name="DashBoard" component={Dashboard}/>
    <Stack.Screen name="DropOff" component={DropOff} />
    <Stack.Screen name="Select Sawari" component={SelectVehicle} />
    <Stack.Screen name="Finding Drivers" component={FindingDrivers} />
  </Stack.Navigator>)
}

function DashboardTabs() {
  return <Tab.Navigator>
    <Tab.Screen name="FavoriteTab" component={FavoriteLocations} />
    <Tab.Screen name="DashboardTab" component={Dashboard} />
  </Tab.Navigator>
}

function TripsStack() {
  return <Stack.Navigator>
    <Stack.Screen name="YourTrips" name={YourTrips} />
    <Stack.Screen name="TripDetails" name={TripDetails} />
  </Stack.Navigator>
}