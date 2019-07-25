import {StatusBar,KeyboardAvoidingView,StyleSheet,ToastAndroid,NetInfo} from 'react-native';
export default function Message(msg){
    ToastAndroid.showWithGravityAndOffset(
       msg,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
}
