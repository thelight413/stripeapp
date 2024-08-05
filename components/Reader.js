import { useNavigation } from '@react-navigation/native';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ErrorReader = ({route}) => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const nfc = false;
  const org = "yaschaffel";
  const {isInitialized,connectBluetoothReader,discoverReaders} = useStripeTerminal({
   
    onUpdateDiscoveredReaders: async (readers) => {
      if(readers.length > 0){
        setText("Connecting to reader...")
        connectBluetoothReader({reader: readers[0],locationId: readers[0].locationId}).then(({reader,error})=>{
          console.log({error});
          if(error){
          setError(error.message)
          }else{
            navigation.goBack();
          }
        })
      }
    // }
    },
    onDidChangeConnectionStatus:(status)=>{
      console.log(status);
      if(status == "connected"){
        Alert.alert("Successfully Connected to a reader");
      }
},  
});
  
  useEffect(()=>{

    const fetchReaders = async () => {
      setText("Looking for readers...");
      const {error} = await discoverReaders({simulated:true,discoveryMethod:( nfc ? 'localMobile' : 'bluetoothScan')});
      if(error){
      setError(error.message)
      }
    } 
    if(isInitialized){
    fetchReaders();
    }else{
      console.log('not initialized');
    }
  },[isInitialized,discoverReaders])
  

  
  return (
    <SafeAreaView style={styles.container}>
      <View>
         <Text style={{color:'black'}}>{text}</Text>
         <Text style={{color: 'red'}}>{error}</Text>

      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
  },
  wifi: {
    marginTop: 20,
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
  },
  wifi_text: {
    fontSize: 18,
    textAlign: 'center',
  },
  wifi_icon: {
    marginTop: 10,
  },
  listitem: {
    fontSize: 16,
    margin: 10,
  },
});
