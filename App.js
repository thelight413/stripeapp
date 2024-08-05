import React,{useRef} from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';
import { ErrorReader } from './components/Reader';
import { Intro } from './components/steps/Intro';
const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = React.useRef(null);

  const fetchConnectionToken = async () => {

      const data = {org: 'yaschaffel',cause: 'charityisgood'};
      const url = `https://us-central1-tcf-backend${
        data.org == 'yaschaffel' || data.org == 'eliezer' ? '' : '-prod'
       }.cloudfunctions.net/terminal/getToken/${data.org}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { secret } = await response.json();
      return secret;
       
  }
  return (
    <StripeTerminalProvider tokenProvider={fetchConnectionToken} logLevel='verbose' >
            <NavigationContainer ref={navigationRef}>
          
          <Stack.Navigator
            navigationOptions={{
              safeAreaInsets: {top: 0},
            }}
            screenOptions={{
              safeAreaInsets: {top: 0},
              gestureEnabled: false,
              contentStyle: {backgroundColor: 'white'},
            }}>
  
            <Stack.Screen
              name="Intro"
              component={Intro}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen name="ErrorReader" component={ErrorReader} />
           
          </Stack.Navigator>
        </NavigationContainer>
    </StripeTerminalProvider>
  );
}
