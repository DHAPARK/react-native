import React from 'react';
import LongContainer from './LongContainer';
import FranchiseePageButton from './FranchiseePageButton';
import PTInput from './PTInput';
import AsyncStorage from '@react-native-async-storage/async-storage';


function InputAndSearchBtn(props){
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
            <PTInput text='가맹점 검색' onChangeText={(value)=>{setSValue(value);}}/>
            <FranchiseePageButton
                onPress={ props.onPress(svalue) }
            //onPress={()=>navigation.navigate('PaymentOneThree')}
            />
            
        </LongContainer>
    );
}

export default InputAndSearchBtn;