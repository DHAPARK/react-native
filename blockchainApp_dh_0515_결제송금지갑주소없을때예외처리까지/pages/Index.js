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

import axios from 'axios';
//불안한데
import { useIsFocused } from '@react-navigation/native';

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

function Index({navigation,route}) {
    //그냥 코인 잔량 받아오는 정형적인 코드
    const [userAccountValue,setUserAccoutValue] = React.useState('');
    AsyncStorage.getItem('userinformation', (err, result) => {
        const UserInfo = JSON.parse(result);
        return UserInfo;
    })
    .then((userInfo)=>{
        const userAccount = JSON.parse(userInfo)['userAccount'];
        
        axios({
            method:"GET",
            url: `http://220.67.231.91:80/getMyBalance/${userAccount}`,
        })
        .then((data)=>{
            return data;
        })
        .then((result)=>{
            var userValance = result["data"]["userValance"];
            setUserAccoutValue(userValance);
        })
    })
    //그냥 코인 잔량 받아오는 정형적인 코드



    const isFocused = useIsFocused(); // isFoucesd Define
    //컴포넌트가 포커싱을 받을시에 리랜더링을 하는 방법
    React.useEffect(() => {
    return () => {
        AsyncStorage.getItem('userinformation', (err, result) => {
            const UserInfo = JSON.parse(result);
            return UserInfo;
        })
        .then((userInfo)=>{
            const userAccount = JSON.parse(userInfo)['userAccount'];
            
            axios({
                method:"GET",
                url: `http://220.67.231.91:80/getMyBalance/${userAccount}`,
            })
            .then((data)=>{
                return data;
            })
            .then((result)=>{
                var userValance = result["data"]["userValance"];
                setUserAccoutValue(userValance);
            })
        })
        //그냥 코인 잔량 받아오는 정형적인 코드
        
    }
    }, [isFocused]);
    //컴포넌트가 포커싱을 받을시에 리랜더링을 하는 방법

    return(
        <Container>
            {/*맨상단 로고와 내 지갑 텍스트 */}
            <IndexTopSmallContainer/>
            
            {/*중간부분 코인잔량표시와 이미지 */}
            <SmallContainer>
                <IndexMiddleSmallContainer/>
                <IndexMiddleCoinAmount text={userAccountValue}/>
            </SmallContainer>

            {/*하단 송금,결제 버튼 */}
            <IndexRemittancePaymentButton/>



            
            
            <IndexBottomNavList/>

        </Container>
    );
};

export default Index;