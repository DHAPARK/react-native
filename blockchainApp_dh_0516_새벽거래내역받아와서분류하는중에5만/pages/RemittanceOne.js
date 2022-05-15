import React from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import _ from 'lodash';


import RemittanceOneContainer from '../components/RemittanceOneComponents/RemittanceOneContainer';
import RemittanceOneBottomMyInfo from '../components/RemittanceOneComponents/RemittanceOneBottomMyInfo';
import RemittanceOneMiddleFriendList from '../components/RemittanceOneComponents/RemittanceOneMiddleFriendList';
import RemittanceOneTopSmallContainer from '../components/RemittanceOneComponents/RemittanceOneTopSmallContainer';

import InputAndConfirmBtn from '../components/RemittanceOneComponents/InputAndConfirmBtn';
import TopMiddleText from '../components/RemittanceOneComponents/TopMiddleText';
//index.js 에 쓰인 Text
const Text = styled.Text`
    font-size : 20px;
    line-height:20px;
`;

//senderAddress
//receiverAddress
//password
//amount
//hscRemittance로
function RemittanceOne({navigation}){
    const [recevierAddress,setRecevierAddress] = React.useState('');
    //서버로 넘어갈 dataSet 생성
    var dataSet = {
        'userid':'',
        'userpassword':'',
        'senderAddress':'',
        'recevierAddress':'',
        'amount':'',
    }
    //모든정보 세팅 후 navigate
    
    function AllCheckOkGoNextPage(inputData){
        if(inputData!==''){
          console.log(`recevierAddress는: ${inputData}`);
          dataSet["recevierAddress"] = inputData;
          //navigation.navigate('PaymentOneTwo',{data:dataSet});
          navigation.navigate('RemittanceOneTwo',{data:dataSet});
        }else{
          console.log('scanData 든게 없습니다. Paymentone내부 오류');
          return false;
        }
        
      }


    return(
        <RemittanceOneContainer>
            
            <RemittanceOneTopSmallContainer/>

            <TopMiddleText/>

            <InputAndConfirmBtn 
                onChangeText={(value)=>{setRecevierAddress(value)}}
                onPress={()=>{AllCheckOkGoNextPage(recevierAddress)}}
            />
                

            <RemittanceOneMiddleFriendList/>
            
            <RemittanceOneBottomMyInfo/>

        </RemittanceOneContainer>
    );
};


export default RemittanceOne;