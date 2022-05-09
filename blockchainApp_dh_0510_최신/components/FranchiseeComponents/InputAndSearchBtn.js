import React from 'react';
import styled from 'styled-components/native';
import LongContainer from './LongContainer';
import FranchiseePageButton from './FranchiseePageButton';
import PTInput from './PTInput';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function saveLocation(name) {
    if (name === "식당1"){
        AsyncStorage.setItem('SearchLocationInfo',JSON.stringify({'latitude':37.58,'longitude': 127.109715}), (err) => {
            if(err){
                return false;
            }else{
                console.log('푸드1 위치');
            }
        });
    }
    else if (name === "식당2"){
        AsyncStorage.setItem('SearchLocationInfo',JSON.stringify({'latitude':37.581,'longitude': 127.012715}), (err) => {
            if(err){
                return false;
            }else{
                console.log('푸드2 위치');
            }
        });
    }
    else if (name === "커피1"){
        AsyncStorage.setItem('SearchLocationInfo',JSON.stringify({'latitude':37.582410,'longitude': 127.009715}), (err) => {
            if(err){
                return false;
            }else{
                console.log('커피1 위치');
            }
        });
    }
    else if (name === "커피2"){
        AsyncStorage.setItem('SearchLocationInfo',JSON.stringify({'latitude':37.572410,'longitude': 127.008715}), (err) => {
            if(err){
                return false;
            }else{
                console.log('커피2 위치');
            }
        });
    }
    else {
        AsyncStorage.setItem('SearchLocationInfo',JSON.stringify({'latitude':37.582410,'longitude': 127.009715}), (err) => {
            if(err){
                return false;
            }else{
                console.log('검색 X');
            }
        });
    }
}

function InputAndSearchBtn(){
    console.log("@@@t");
    const [svalue,setSValue] = React.useState("");
    console.log("@ test1");
    AsyncStorage.setItem('SearchLocationInfo',JSON.stringify({'latitude':37.58,'longitude': 127.109715}), (err) => {
        if(err){
            console.log(err);
            return false;
        }else{
            console.log('기본위치');
        }
    });
    return(
        <LongContainer>
            <PTInput text='가맹점 검색' onChangeText={(value)=>{setSValue(value)}}/>
            <FranchiseePageButton
                onPress={ () => saveLocation(svalue) }
            //onPress={()=>navigation.navigate('PaymentOneThree')}
            />
            
        </LongContainer>
    );
}

export default InputAndSearchBtn;