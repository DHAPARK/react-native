import React from 'react';
import styled from 'styled-components/native';
import QRarea from './QRarea';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Container = styled.SafeAreaView`
    width:100%;
    height:45%;
    background-color:white;
    margin-bottom:10%;
    border-radius:7px;
    border:0.5px solid gray;
`;

function NoticeViewOne(props){
    const [accountAddress,setAccountAddress] = React.useState('');
    AsyncStorage.getItem('userinformation', (err, result) => {
        const UserInfo = JSON.parse(result);
        console.log(UserInfo.userAccount);
        setAccountAddress(UserInfo.userAccount);
      });
    return(
        <Container style={props.style}>
            <QRarea value={accountAddress}/>
        </Container>
   );
}

export default NoticeViewOne;