import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet,Text} from 'react-native';
//첫 버튼 (홈)
import UsageHistoryBottomHomeButton from './UsageHistoryBottomHomeButton';
import UsageHistoryBottomOfficialButton from './UsageHistoryBottomOfficialButton';
import UsageHistoryBottomMarketButton from './UsageHistoryBottomMarketButton';
import UsageHistoryBottomUseListButton from './UsageHistoryBottomUseListButton';

import {useNavigation} from '@react-navigation/native';

const Container = styled.SafeAreaView`
    width:95%;
    height:5%;
    background-color:white;
    margin: 0 auto;
    border:1px solid gray;
    border-radius:7px;
    flex-direction:row;
`;



function UsageHistoryBottomNavList(){
    const navigation = useNavigation();
    return(
        <Container style={styles.shadow}>
            <UsageHistoryBottomHomeButton onPress={()=>navigation.navigate('Index')}/>
            <UsageHistoryBottomOfficialButton onPress={()=>navigation.navigate('Notice')}/>
            <UsageHistoryBottomMarketButton onPress={()=>navigation.navigate('Franchisee')}/>
            <UsageHistoryBottomUseListButton onPress={()=>navigation.navigate('UsageHistory')}/>
        </Container>
    );
}
const styles = StyleSheet.create({
    shadow : {
        ...Platform.select({
            ios : {
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


export default UsageHistoryBottomNavList;