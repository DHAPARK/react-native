import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';

import styled from 'styled-components/native';
import LongContainer_onlyforDatepicker from './LongContainer_onlyforDatepicker';
import Test from './Test';
import {useEffect} from "react";


const Label = styled.Text`
    margin: 0 auto;
`;

function TopMiddleDateContainer(){
    const [date,setDate] = React.useState(['2021-01-01']);
    
    const pro1 = new Promise((res,rej)=>{
        res(AsyncStorage.getItem('searchHistoryDate'));
    });


    const getDate = ()=>{
        pro1
        .then((message)=>{
            return new Promise((res,rej)=>{
                res(message);
            });  
        })
        .then((message)=>{
            setDate(message);
        });
    }
    

    useEffect(() => {
        console.log("렌더링!");
    }, [date]);


    return(
        <LongContainer_onlyforDatepicker>
            
            <Label>
                {date}
            </Label>
            
            <Test getDateChange = {getDate()}/>
            
        </LongContainer_onlyforDatepicker>
    );
}

export default TopMiddleDateContainer;