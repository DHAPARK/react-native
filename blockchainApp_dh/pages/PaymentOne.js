import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { View} from 'react-native-web';
import {Button} from 'react-native';

import ExpoCamera from '../expoCamera/ExpoCamera';

import PaymentOneContainer from '../components/PaymentOneComponents/PaymentOneContainer';
import PaymentOneTopSmallContainer from '../components/PaymentOneComponents/PaymentOneTopSmallContainer';
import PaymentOneMiddleText from '../components/PaymentOneComponents/PaymentOneMiddleText';

import PaymentOneBottomMyInfo from '../components/PaymentOneComponents/PaymentOneBottomMyInfo';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { StyleSheet } from 'react-native';


//expo-camera 가져오기
//import { Camera } from 'expo-camera';
//import ExpoCamera from '../expoCamera/ExpoCamera';
//import ExpoCamera from '../expoCamera/ExpoCamera';


//index.js 에 쓰인 Text
const Text = styled.Text`
    font-size : 20px;
    line-height:20px;
`;

//이부분은 PaymentOneTwo를 보기 위해 visible:false로 테두리 안에 QR코드를 스캔해주세요
//바로 밑부분에 놓은 컴포넌트
const GotoPaymentOneTwo = styled.TouchableOpacity`
    background-color:yellow;
    width:10%;
    height:5%;
    margin:0 auto;
`;

function PaymentOne({navigation}){
    //const userid = route.params.userid;
    //const userWalletDist = route.params.userWalletDist;

    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState();
  
    //console.log("test1 clear");

    useEffect(() => {
       (async() => {
          const {status} = await BarCodeScanner.requestPermissionsAsync();
          console.log(status==="granted");
          setHasPermission(status === "granted");
       })();
    },[]);
  
    //console.log("test2 clear");

    if (!hasPermission) {
      return (
        <PaymentOneContainer>

        <PaymentOneTopSmallContainer/>
        {/*<Camera/>*/}

        <PaymentOneMiddleText/>
        
        {/*PaymentOneTwo로 가기위한 컴포넌트 나중에 지워야함 */}
        <GotoPaymentOneTwo onPress={()=>navigation.navigate('PaymentOneTwo')}/>

        <PaymentOneBottomMyInfo/>

    </PaymentOneContainer>

      )
    }

    //console.log("test3 clear");

    const handleBarCodeScanned = ({type, data}) => {
        setScanData(data);
        console.log(`Data: ${data}`);
        console.log(`Type: ${type}`);
    };    

    //console.log("test4 clear");
    return(
        <PaymentOneContainer>

            <PaymentOneTopSmallContainer/>
            <BarCodeScanner 
                style = {{height: 350}}
                onBarCodeScanned= {scanData ? undefined : handleBarCodeScanned}
            />
            {scanData && <Button title = 'Scan Again?' onPress={() => setScanData(undefined)}/>}

            <PaymentOneMiddleText/>
            
            {/*PaymentOneTwo로 가기위한 컴포넌트 나중에 지워야함 */}
            <GotoPaymentOneTwo onPress={()=>navigation.navigate('PaymentOneTwo')}/>

            <PaymentOneBottomMyInfo/>

        </PaymentOneContainer>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default PaymentOne;