import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    border-radius : 30px;
    margin: 0 auto;
    margin-top : 10px;
    width : 28%;
    height : 35px;
    background : black;
    justify-content : center;
    align-items : center;
`;
//#95B3D7
const Label = styled.Text`
    font-size : 16px;
    font-weight : bold;
    color : #ffffff;
`;

function UsageHistoryPageAllButton(props){
    return (
        <Container onPress = {props.onPress}>
            <Label>{props.text}</Label>
        </Container>
    )
}
export default UsageHistoryPageAllButton;