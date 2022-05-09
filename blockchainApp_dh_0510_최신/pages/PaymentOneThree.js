import React from 'react';
import styled from 'styled-components/native';

import PaymentOneThreeContainer from '../components/PayMentOneThreeComponent/PaymentOneThreeContainer';

//최상단 로와 결제 텍스트
import PaymentOneThreeTopSmallContainer from '../components/PayMentOneThreeComponent/PaymentOneThreeTopSmallContainer';

//최상단 바로 밑 지불가격을 선택해주세요 텍스트
import TopMiddleText from '../components/PayMentOneThreeComponent/TopMiddleText';

import InputAndConfirmBtn from '../components/PayMentOneThreeComponent/InputAndConfirmBtn';

import MiddleContainer from '../components/PayMentOneThreeComponent/MiddleContainer';

import BottomContainer from '../components/PayMentOneThreeComponent/BottomContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import qs from 'qs';

function PaymentOneThree({route}){
    function execute(){
        var dataSet = route.params.data;
        console.log(`PaymentOneThree 넘어온값 : ${JSON.stringify(dataSet)}`);
        
        AsyncStorage.getItem('userinformation', (err, result) => {
            const UserInfo = JSON.parse(result);
            console.log('아이디 : ' + UserInfo.userid); //
            console.log('비번 : ' + UserInfo.userpw); //  
            console.log('계정 : ' + UserInfo.userAccount); //

            return UserInfo;
        })
        .then((UserInfo)=>{
            const UserInfo2 = JSON.parse(UserInfo);
            console.log(`버근가 ${UserInfo2['userid']}`);
            var dataSet2 = {
                'userId':UserInfo2['userid'],
                'userPassword':UserInfo2['userpw'],
                'senderAddress':UserInfo2['userAccount'],
                'receiverAddress':dataSet.recevierAddress,
                'amount':dataSet.amount,
            }
            
            console.log(`\n\n ${JSON.stringify(dataSet2)}`);



            axios({
                method:"POST",
                url: `http://220.67.231.91:80/hscPayment`,
                data: qs.stringify(dataSet2),
            }).then((res)=>{
                console.log(res.data);
                console.log(`서버와 연결 성공`);
                //navigation.goBack();
            }).catch(error=>{
                console.log(`서버와 연결 실패 ${error}`);
                throw new Error(error);
            });
        })
    }
    return(
        <PaymentOneThreeContainer>
            <PaymentOneThreeTopSmallContainer/>
            <TopMiddleText/>
            <InputAndConfirmBtn onPress={()=>{execute()}}/>

            <MiddleContainer/>

            <BottomContainer/>
            
        </PaymentOneThreeContainer>
    );
}

export default PaymentOneThree;