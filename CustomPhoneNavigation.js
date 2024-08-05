import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorReader } from './components/Reader';
import { Intro } from './components/steps/Intro';

const Stack = createNativeStackNavigator();


export default function CustomNavigation() {

  const navigationRef = React.useRef(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  container: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  c: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    height: 40,

    borderBottomColor: 'rgba(0, 0, 0, 0.87)',
    margin: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    width: '100%',

    padding: 10,
  },
  image: {width: 100, height: 100},
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  bottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loginHeader: {
    fontSize: 22,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  custom_header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  disconnect: {
    textDecorationLine: 'underline',
    color: 'blue',
    position: 'absolute',
    padding: 15,
    right: 0,
    top: 0,
  },

  buttonView: {
    alignSelf: 'stretch',

    marginTop: 10,
  },
  button: {
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    width: '100%',
    fontSize: 20,
  },
});
