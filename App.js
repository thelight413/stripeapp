import React from 'react';

import { View } from 'react-native';

import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';
import CustomNavigation from './CustomPhoneNavigation';


export default function App() {
  const fetchConnectionToken = () => {
    return new Promise((resolve,reject)=>{
      // getCauseData().then((data)=>{
      //   console.log(data);
      const data = {org: 'yaschaffel',cause: 'charityisgood'};
        if(data.org){
        const url = `https://us-central1-tcf-backend${
         data.org == 'yaschaffel' || data.org == 'eliezer' ? '' : '-prod'
        }.cloudfunctions.net/terminal/getToken/${data.org}`;
        fetch(url,{method: "POST"}).then(res => res.json()).then(r => {
          resolve(r.secret);
        }).catch(error=>{
          console.log(error);
        })
      }else{
        resolve(null);
      }
    })
  }
  return (
    <StripeTerminalProvider tokenProvider={fetchConnectionToken} logLevel='verbose' >
    <View style={{flexDirection: 'column', flex: 1}}>
      <CustomNavigation />
    </View>
    </StripeTerminalProvider>
  );
}
