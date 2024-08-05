//sinple component to display the intro text
import React, { useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

import { useNavigation } from '@react-navigation/native';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';

const androidPermissions = [
  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
];
const iosPermissions = [
  PERMISSIONS.IOS.LOCATION_ALWAYS,
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
];

export const Intro = ({route}) => {
  const navigation = useNavigation();
  const {initialize,isInitialized} = useStripeTerminal({});
  const org = "yaschaffel";
  const cause = "charityisgood";
  useEffect(()=>{
    requestMultiple(
      Platform.OS == 'android'
        ? androidPermissions
        : iosPermissions,
    )
      .then(async result => {
       
    initialize().then(({reader,error})=>{
      // await clearCachedCredentials()
      console.log(error);
      if(!error){
        
      }

    }).catch((error)=>{
      console.log(error);
    })

  });
  }
  ,[initialize]);
  useEffect(()=>{
    if(isInitialized){
    navigation.navigate('ErrorReader', {
      org: org,
      nfc: false,
      cause: cause,
    });
  }
  },[isInitialized])

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}>
   
     <Text style={{color:'black'}}>First page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 20,
  },
  icon: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
  },
  buttonView: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
  },
});
