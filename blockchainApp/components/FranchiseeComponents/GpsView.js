import React from 'react';
import styled from 'styled-components/native';
import {Text,StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

const Container = styled.SafeAreaView`
    width:100%;
    height:100%;
    background-color:white;
    border-radius:7px;
`;


function GpsView(){ 
    // const [region, setRegion] = React.useState({
    //     latitude: 51.5079145,
    //     longitude: -0.0899163,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // });

    //식당1
    const foodOne = {
        latitude: 37.58,
        longitude: 127.109715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    //식당2
    const foodTwo = {
        latitude: 37.581,
        longitude: 127.012715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    //식당3
    // const foodThree = {
    //     latitude: 37.582410,
    //     longitude: 127.009715,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // };


    //커피1
    const coffeeone = {
        latitude: 37.582410,
        longitude: 127.009715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    
    //커피2
    const coffeetwo = {
        latitude: 37.572410,
        longitude: 127.008715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    //커피3
    // const coffeethree = {
    //     latitude: 37.582410,
    //     longitude: 127.009715,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // };

    const HansungUnvRegion = {
        latitude: 37.582410,
        longitude: 127.009715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };


    return (
        <Container>
            <MapView
            style={styles.map}
            //specify our coordinates.
            initialRegion={HansungUnvRegion}
            //onRegionChangeComplete={(region) => setRegion(region)}
            >

                {/*<Marker coordinate={tokyoRegion} />*/}
                
                
                {/*식당1 */}
                <Marker
                    coordinate = {foodOne}
                    title="식당1이름"
                    description="식당1이벤트"
                />
                {/*식당2 */}
                <Marker
                    coordinate={foodTwo}
                    title="식당2이름"
                    description="식당2이벤트"
                />

                {/*카페1 */}
                <Marker
                    coordinate = {coffeeone}
                    title="카페1이름"
                    description="카페1이벤트"
                />
                {/*카페2 */}
                <Marker
                    coordinate={coffeetwo}
                    title="카페2이름"
                    description="카페2이벤트"
                />


            </MapView>
            {/*
            <Text style={styles.text}>Current latitude: {region.latitude}</Text>
            <Text style={styles.text}>Current longitude: {region.longitude}</Text>
             */}
        </Container>
    ); 
}

export default GpsView;

//create our styling code:
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });