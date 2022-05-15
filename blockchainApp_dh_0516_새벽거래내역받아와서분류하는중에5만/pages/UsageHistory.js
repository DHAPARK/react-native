import React from 'react';
import styled from 'styled-components/native';

import UsageHistoryContainer from "../components/UsageHistory/UsageHistoryContainer";
import UsageHistoryTopSmallContainer from '../components/UsageHistory/UsageHistoryTopSmallContainer';
import TopMenuListContainer from '../components/UsageHistory/TopMenuListContainer';
import TopMiddleDateContainer from '../components/UsageHistory/TopMiddleDateContainer';
import MiddleContainer from '../components/UsageHistory/MiddleContainer';
import UsageHistoryBottomNavList from '../components/UsageHistory/UsageHistoryBottomNavList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
function UsageHistory(){
    //가져온 데이터 갯수
    var [dataLength,setDataLength] = React.useState(0);
    //객체도 가져올수있나 테스트
    //var [obj,setObj] = React.useState();

    //거래내역 전부 받아와야함
    //const [userAccountValue,setUserAccoutValue] = React.useState('');
    AsyncStorage.getItem('userinformation', (err, result) => {
        const UserInfo = JSON.parse(result);
        return UserInfo;
    })
    .then((userInfo)=>{
        const userAccount = JSON.parse(userInfo)['userAccount'];
        axios({
            method:"POST",
            url: `http://220.67.231.91:80/getTransactionLog/${userAccount}`,
        })
        .then((data)=>{
            return data;
        })
        .then((result)=>{
            //var userValance = result["data"]["userValance"];
            //setUserAccoutValue(userValance);
            console.log(`검사 ${result}`);
            console.log(`검사 ${JSON.stringify(result)}`);
            console.log(`검사2 ${result["data"]}`);
            //console.log(`펼쳐 ${JSON.stringify(result["data"])}`);
            var arrKeys = [];
            //var arrValues = [];
            //거래번호까지 받아옴
            var Alldata = result["data"];
            //모든 거래 식별번호가 들어감 arrKeys = [1244134,51241242]
            arrKeys = Object.keys(Alldata);
            //console.log(`가져온 길이 : ${arrKeys.length}`);
            setDataLength(arrKeys.length);
            //그 식별번호로 거래배열 하나씩 받아옴 ["transactionTime","receiverAddress","amount","senderAddress"]
            var varif = Alldata[arrKeys[0]];
            //var varif = Object.values(arrKeys[0]);
            console.log(`뭐지 ${JSON.stringify(varif)}`);
        })
        
    })
    //거래내역 전부 받아와야함
    //console.log(`뭐지 ${JSON.stringify(obj)}`);

    return(
        <UsageHistoryContainer>
            <UsageHistoryTopSmallContainer/>
            <TopMenuListContainer/>
            <TopMiddleDateContainer/>
            <MiddleContainer/>
            <UsageHistoryBottomNavList/>
        </UsageHistoryContainer>
    );
};

export default UsageHistory;