import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// See the README file
import SvgQRCode from 'react-native-qrcode-svg';
//import CustomQRCodes from './components/CustomQRCodes';


function Simple(props) {
  return <SvgQRCode value={JSON.stringify(props.props.value)}/>;
}
function QRarea(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Simple props={props}/>
      </View>

      {/*<CustomQRCodes />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default QRarea;