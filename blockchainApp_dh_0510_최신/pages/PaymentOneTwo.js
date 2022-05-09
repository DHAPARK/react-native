import React from 'react';
import styled from 'styled-components/native';

import PaymentOneTwoContainer from '../components/PaymentOneTwoComponents/PaymentOneTwoContainer';
import PaymentOneTwoTopSmallContainer from '../components/PaymentOneTwoComponents/PaymentOneTwoTopSmallContainer';
import TopMiddleText from '../components/PaymentOneTwoComponents/TopMiddleText';
import InputAndConfirmBtn from '../components/PaymentOneTwoComponents/InputAndConfirmBtn';
import MiddlePriceContainer from '../components/PaymentOneTwoComponents/MiddlePriceContainer';
import BottomContainer from '../components/PaymentOneTwoComponents/BottomContainer';



function PaymentOneTwo({navigation,route}){
    const dataSet = route.params.data;
    console.log(`넘어온값 : ${JSON.stringify(dataSet)}`);

    const [Amount,setAmount] = React.useState('');
    function AllCheckOkGoNextPage(Amount){
        if(Amount !== ''){
            dataSet['amount'] = Amount;
            console.log(JSON.stringify(dataSet));
            navigation.navigate('PaymentOneThree',{data:dataSet});
        }else{
            console.log('돈을 입력하셔야 넘어가죠');
            return false;
        }
    }


    return (
        <PaymentOneTwoContainer>
            {/*맨위 로고와 결제 텍스트를 담은 컴포넌트 */}
            <PaymentOneTwoTopSmallContainer/>

            <TopMiddleText/>

            <InputAndConfirmBtn 
                onChangeText={(value)=>{setAmount(value)}}
                onPress={()=>{AllCheckOkGoNextPage(Amount)}}
            />
            
            <MiddlePriceContainer/>

            <BottomContainer/>




        </PaymentOneTwoContainer>
    );
}

export default PaymentOneTwo;