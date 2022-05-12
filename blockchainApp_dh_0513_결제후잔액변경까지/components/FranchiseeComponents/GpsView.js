import React from 'react';
import styled from 'styled-components/native';
import {Text,StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { State } from 'react-native-gesture-handler';

const Container = styled.SafeAreaView`
    width:100%;
    height:100%;
    background-color:white;
    border-radius:7px;
`;


function GpsView(props){ 
    // const [region, setRegion] = React.useState({
    //     latitude: 51.5079145,
    //     longitude: -0.0899163,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // });

    console.log("gps: "+props.value);
    //식당1
    const foodOne = {
        latitude: 37.58,
        longitude: 127.109715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    AsyncStorage.setItem('foodOneInformation',JSON.stringify({'latitude':foodOne.latitude,'longitude': foodOne.longitude}), (err) => {
        if(err){
            return false;
        }else{
            console.log('푸드1 위치 저장 완료');
        }
    });

    //식당2
    const foodTwo = {
        latitude: 37.581,
        longitude: 127.012715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    AsyncStorage.setItem('foodTwoInformation',JSON.stringify({'latitude':foodTwo.latitude,'longitude': foodTwo.longitude}), (err) => {
        if(err){
            return false;
        }else{
            console.log('푸드2 위치 저장 완료');
        }
    });

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
    AsyncStorage.setItem('coffeeOneInformation',JSON.stringify({'latitude':coffeeone.latitude,'longitude': coffeeone.longitude}), (err) => {
        if(err){
            return false;
        }else{
            console.log('카페1 위치 저장 완료');
        }
    });

    //커피2
    const coffeetwo = {
        latitude: 37.572410,
        longitude: 127.008715,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    AsyncStorage.setItem('coffeeTwoInformation',JSON.stringify({'latitude':coffeetwo.latitude,'longitude': coffeetwo.longitude}), (err) => {
        if(err){
            return false;
        }else{
            console.log('카페 위치 저장 완료');
        }
    });
    //커피3
    // const coffeethree = {
    //     latitude: 37.582410,
    //     longitude: 127.009715,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // };
    const [current_latitude, setCLatitude] =  React.useState(37.582410);
    const [current_longitude, setCLongitude] =  React.useState(127.009715);

    AsyncStorage.getItem('SearchLocationInfo', (err, result) => {
        const SearchLocation = JSON.parse(result);
        console.log(SearchLocation.latitude, SearchLocation.longitude);

        setCLatitude(Number(SearchLocation.latitude));
        setCLongitude(Number(SearchLocation.longitude));
      });

    // const HansungUnvRegion = {
    //     latitude: 37.582410,
    //     longitude: 127.009715,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    // };
//check
    const HansungUnvRegion = {
        latitude: current_latitude,
        longitude: current_longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    React.useEffect(() => {
        console.log("search clear")
    }, [current_latitude])

    React.useEffect(() => {
        console.log("@@@###%%%")
    }, [props])

    return (
        <Container>
            <MapView
            style={styles.map}
            //specify our coordinates.
            showUserLocation={true}
            region={HansungUnvRegion}
            //initialRegion={HansungUnvRegion}
            //onRegionChangeComplete={(region) => setRegion(region)}
            >

                {/*<Marker coordinate={tokyoRegion} />*/}
                
                {/*식당1 */}
                <Marker
                    coordinate = {foodOne}
                    title="식당1"
                    description="식당1이벤트"
                />
                {/*식당2 */}
                <Marker
                    coordinate={foodTwo}
                    title="식당2"
                    description="식당2이벤트"
                />

                {/*카페1 */}
                <Marker
                    coordinate = {coffeeone}
                    title="카페1"
                    description="카페1이벤트"
                />
                {/*카페2 */}
                <Marker
                    coordinate={coffeetwo}
                    title="카페2"
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