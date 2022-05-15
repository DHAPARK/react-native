import React from 'react';
import styled from 'styled-components/native';

import RemittanceOneTwoContainer from '../components/RemittanceOneTwoComponents/RemittanceOneTwoContainer';
import RemittanceOneTwoTopSmallContainer from '../components/RemittanceOneTwoComponents/RemittanceOneTwoTopSmallContainer';
import TopMiddleText from '../components/RemittanceOneTwoComponents/TopMiddleText';
import InputAndConfirmBtn from '../components/RemittanceOneTwoComponents/InputAndConfirmBtn';
import MiddlePriceContainer from '../components/RemittanceOneTwoComponents/MiddlePriceContainer';
import BottomContainer from '../components/RemittanceOneTwoComponents/BottomContainer';


//senderAddress
//receiverAddress
//password
//amount
//hscRemittance로
/*
var dataSet = {
    'userid':'',
    'userpassword':'',
    'senderAddress':'',
    'recevierAddress':'',
    'amount':'',
}
*/
function RemittanceOneTwo({navigation,route}){

    const dataSet = route.params.data;
    console.log(`넘어온값 : ${JSON.stringify(dataSet)}`);

    const [Amount,setAmount] = React.useState('');

    function AllCheckOkGoNextPage(Amount){
        if(Amount !== ''){
            dataSet['amount'] = Amount;
            console.log(JSON.stringify(dataSet));
            //navigation.navigate('PaymentOneThree',{data:dataSet});
            navigation.navigate('RemittanceOneThree',{data:dataSet});
        }else{
            console.log('돈을 입력하셔야 넘어가죠');
            return false;
        }
    }

    

    return (
        <RemittanceOneTwoContainer>
            {/*맨위 로고와 결제 텍스트를 담은 컴포넌트 */}
            <RemittanceOneTwoTopSmallContainer/>

            <TopMiddleText/>

            <InputAndConfirmBtn 
                onChangeText={(value)=>{setAmount(value)}}
                onPress={()=>{AllCheckOkGoNextPage(Amount)}}
            />
            
            <MiddlePriceContainer/>

            <BottomContainer/>

        </RemittanceOneTwoContainer>
    );
}

export default RemittanceOneTwo;