import { Alert } from 'react-native';

const loginAlert = () => {
    Alert.alert(
        "Error Logging in",
        "Wrong username or password",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
    );
    return;
};
const signUpAlert = () => {
    Alert.alert(
        "Error signing up",
        "something went wrong",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
    );
    return;
};


export { loginAlert, signUpAlert };