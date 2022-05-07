import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//맨윗부분 로고와 내 지갑 담는 Small Container
import IndexTopSmallContainer from '../components/IndexComponents/IndexTopSmallContainer';

//가운데 코인 잔량 표시 뒷배경 ring 이미지
import IndexMiddleSmallContainer from '../components/IndexComponents/IndexMiddleSmallContainer';
//가운데 코인 잔량표시 텍스트 2개담은 Component
import IndexMiddleCoinAmount from '../components/IndexComponents/IndexMiddleCoinAmount';

//하단 송금/결제버튼
import IndexRemittancePaymentButton from '../components/IndexComponents/IndexRemittancePaymentButton';

//맨 하단 NavList
import IndexBottomNavList from '../components/IndexComponents/IndexBottomNavList';

const Container = styled.SafeAreaView`
    flex : 1;
    background-color:white;
`;

const SmallContainer = styled.SafeAreaView`
    position:relative;
    width:87%;
    height:53%;
    margin:0 auto;
    background-color:white;
`;

function Index({navigation,route}){
    //const userid = route.params.userid;
    //const userWalletDist = route.params.userWalletDist;
    AsyncStorage.getItem('userinformation', (err, result) => {
        const UserInfo = JSON.parse(result);
        console.log('아이디 : ' + UserInfo.userid); //
        console.log('비번 : ' + UserInfo.userpw); //  
        console.log('계정 : ' + UserInfo.userAccount); //
        return UserInfo;
    })
    .then((userInfo)=>{
        const userAccount = userInfo.userAccount;
        axios({
            method:"GET",
            url: `http://127.0.0.1:3000/getMyBalance/${userAccount}`,
        })
        .then((data)=>{
            return data;
        })
        .then((result)=>{
            console.log(`서버로부터 받은 이더량은 ${result}`);
        })
    })

    


    return(
        <Container>
            {/*맨상단 로고와 내 지갑 텍스트 */}
            <IndexTopSmallContainer/>
            
            {/*중간부분 코인잔량표시와 이미지 */}
            <SmallContainer>
                <IndexMiddleSmallContainer/>
                <IndexMiddleCoinAmount/>
            </SmallContainer>

            {/*하단 송금,결제 버튼 */}
            <IndexRemittancePaymentButton/>



            
            
            <IndexBottomNavList/>

        </Container>
    );
};

export default Index;