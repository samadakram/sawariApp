import React, { useState } from 'react';
import MainNavigator from './src/config/navigation';
import DriverLocation from './src/views/DriverLocation';
import DriverLogin from './src/views/DriverLogin/DriverLogin';

export default function App() {

  const [driverDashboard, setDriverDashboard] = useState(false);
  const [driverName, setDriverName] = useState('');

  return (<>
    <MainNavigator />
    {/* {!driverDashboard ? <DriverLogin
      setDriverDashboard={setDriverDashboard}
      setDriverName={setDriverName}
    />
      :
      <DriverLocation driverName={driverName} />
    } */}

  </>

  );
}

