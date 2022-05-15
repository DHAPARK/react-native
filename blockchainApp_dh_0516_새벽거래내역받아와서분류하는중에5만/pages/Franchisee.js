import React from 'react';
import styled from 'styled-components/native';

import FranchiseeContainer from '../components/FranchiseeComponents/FranchiseeContainer';
import FranchiseeTopSmallContainer from '../components/FranchiseeComponents/FranchiseeTopSmallContainer';
import InputAndSearchBtn from '../components/FranchiseeComponents/InputAndSearchBtn';
import MiddleContainer from '../components/FranchiseeComponents/MiddleContainer';
import FranchiseeBottomNavList from '../components/FranchiseeComponents/FranchiseeBottomNavList';
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

    AsyncStorage.getItem('SearchLocationInfo', (err, result) => {
        const SearchLocation = JSON.parse(result);
        console.log("%!!"+SearchLocation.latitude, SearchLocation.longitude);
      });
}

function Franchisee(){

    const [isChanges, setIsChange] = React.useState("");

    function isChange(name){
        saveLocation(name)
        setIsChange(name);
    }

    return(
        <FranchiseeContainer>
            <FranchiseeTopSmallContainer/>
            <InputAndSearchBtn onPress={isChange}/>
            <MiddleContainer name={isChanges}/>

            <FranchiseeBottomNavList/>
        </FranchiseeContainer>
    );
};

export default Franchisee;