import React from 'react';
import styled from 'styled-components/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import _ from 'lodash';
import LoginContainer from '../components/LoginComponents/LoginContainer';
import LoginContents from '../components/LoginComponents/LoginContents';
import LoginPageButton from '../components/LoginComponents/LoginPageButton';

//로고부분 
import LoginPageLogo from '../components/LoginComponents/LoginPageLogo';
import LoginIdAndPw from '../components/LoginComponents/LoginIdAndPw';
import BlockForPreventAvoding from '../components/LoginComponents/BlockForPreventAvoding';
import axios from 'axios';


import {Platform,StyleSheet} from 'react-native';

const Label = styled.Text`
    font-size : 20px;
    font-weight : bold;
    margin-bottom:12px;
`;

const Input = styled.TextInput`
    width: 75%;
    
    margin:0 auto;
    background-color:white;
    border-radius : 8px;
    border : 1px solid #666666;
    padding: 4px;
    font-size:20px;
    margin-bottom:12px;  
`;

const styles = StyleSheet.create({
    shadow : {
        ...Platform.select({
            ios : {
                //shadowColor : '#95B3D7',
                shadowColor : '#95B3D7',
                shadowOffset: {width:0,height:10},
                shadowOpacity: 0.5,
                shadowRadius:2.8,
            },
            android : {
                elevation : 20,
            },
        })
    }
});


//배치용 box
const SmallContainer = styled.View`
    margin-top : 30px;
    margin-bottom : 35px;
`;

function Login({navigation}){
    const [id,setUserid] = React.useState('');
    const [pw,setUserpw] = React.useState('');

    const loginOk = async ()=>{
        if( id === '') return;
        if( pw === '') return;
        let list;
        //let list = await AsyncStorage.getItem(id);
        //이부분에서 서버와 통신 후 id pw를 받아와 로그인가능한지 확인해야함 130
        //json형태로 받아올것
        //220.67.231.91:80
        axios({
            method:"GET",
            url: `http://127.0.0.1:3000/getMember/${id}/${pw}`,
        }).then((data)=>{
            return data;
        }).then((res)=>{
            
            list = res.data;
            //이부분 조심
            let userinfo = JSON.parse(list);
            
            const db_id = id;
            const db_pw = userinfo["password"];
            const db_userAccount = userinfo["userAccount"];
            console.log(`pd_id : ${db_id}`);
            console.log(`db_pw : ${db_pw}`);
            console.log(`db_userAccount : ${db_userAccount}`);
            
            return userinfo;
            
            //})}
            //else끝
            //이부분 조심
        }).then((userInfo)=>{
            console.log(`여기까지오나 ${userInfo}`);
            const db_id = userInfo["userid"];
            const db_pw = userInfo["password"];
            const db_userAccount = userInfo["userAccount"];

            console.log(`pd_id2 : ${db_id}`);
            console.log(`db_pw2 : ${db_pw}`);
            console.log(`db_userAccount2 : ${db_userAccount}`);
            AsyncStorage.setItem('userinformation',JSON.stringify({'userid':db_id,'userpw': db_pw, 'userAccount' : db_userAccount}), (err) => {
                if(err){
                    return false;
                }else{
                    console.log('유저정보 저장 완료');
                }
            });
            return userInfo;
        }).then((userInfo)=>{
            console.log(`여기까지오나2 ${userInfo}`);
            const db_id = userInfo["userid"];
            const db_pw = userInfo["password"];
            if(db_id === id && db_pw === pw){
                navigation.navigate('Index',{userid : db_id});       
            }
        })
    }
    return(
    <LoginContainer>
        <LoginContents>
            {/* 로고 넣는자리 */}
            <LoginPageLogo/>

            <SmallContainer>
            <Input 
                style={styles.shadow}
                placeholder={'   ID :'}
                value={id}
                onChangeText = {value =>setUserid(value)}
            />
            <Input 
                style={styles.shadow}
                placeholder={'   PW :'}
                value={pw}
                onChangeText = {value =>setUserpw(value)}
            />
            </SmallContainer>

            <LoginPageButton onPress={()=>loginOk()}>로그인</LoginPageButton>
            <LoginPageButton onPress={()=>navigation.navigate('Regist')}>회원가입</LoginPageButton>

            <SmallContainer>
                <LoginIdAndPw/>
            </SmallContainer>


            <BlockForPreventAvoding/>
        </LoginContents>
    </LoginContainer>
    );
};


export default Login;