//sinple component to display the intro text
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

import { useNavigation } from '@react-navigation/native';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
const buttonTexts = [
  'Next',
  'Provide Permissions',
  'Continue',
  'Save Password',
  'Start Fundraising',
];
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
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const {initialize,isInitialized} = useStripeTerminal({});
  const org = "yaschaffel";
  const cause = "charityisgood";
  useEffect(()=>{
    if(step == 1.5){
      console.log('init')
    initialize().then(({reader,error})=>{
      // await clearCachedCredentials()
      console.log(error);
      if(!error){
        
      }

    }).catch((error)=>{
      console.log(error);
    })
  }
  },[initialize,step]);
  useEffect(()=>{
    if(isInitialized){
    navigation.navigate('ErrorReader', {
      org: org,
      nfc: false,
      cause: cause,
    });
  }
  },[isInitialized])
  if (loading) {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="grey" />
        </View>
         <Text>{typeof loading === "string" ? loading : null}</Text>
         <Text style={styles.error}>{error}</Text>
      </>
    );
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}>
   
      {step == 1 ? <View><Text style={{color: 'black'}}>Provide Permissions</Text></View> : null}
      {step == 1.5 ? <View><Text>Initializing the terminal...</Text></View>: null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <TouchableOpacity
          onPress={() => {
            switch (step) {
           
              case 1:
                setLoading(true);
                requestMultiple(
                  Platform.OS == 'android'
                    ? androidPermissions
                    : iosPermissions,
                )
                  .then(async result => {
                    setLoading(true);
                    
                    //step 1.5 will initializing the terminal instance in the useEffect above.
                    setStep(1.5);
                    setLoading(false);
                  });
                 
                break;
              
          
             
              default:
                setStep(step + 1);
                break;
            }
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: '#219466',
            }}>
            {loading ? (
              <ActivityIndicator color="blue" />
            ) : (
              <>
                {step != 1.5 ? <Text
                  style={[
                    styles.button,
                    {
                      backgroundColor: '#219466',
                      color: 'white',
                    },
                  ]}>
                  {buttonTexts[step]}
                </Text> : null }
                
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
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
