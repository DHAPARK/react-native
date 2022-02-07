import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

const Container = styled.SafeAreaView`
    flex : 1;
`;

function Index({navigation,route}){
    const userid = route.params.userid;
    const userWalletDist = route.params.userWalletDist;

    return(
        <Container>
            <Text>{userid}</Text>
            <Text>{userWalletDist}</Text>
        </Container>
    );
};

export default Index;