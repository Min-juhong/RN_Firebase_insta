import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./screens/RootStack";
import {UserContextProvider} from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
    
  );
}

export default App;