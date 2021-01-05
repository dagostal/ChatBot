import { Alert } from 'react-native';

const errorAlert = () => {
    Alert.alert(
        "Error Logging in",
        "We are sorry, something went wrong when accessing chat",
        [
            {
                text: "ok",
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );
    return;
};


export default errorAlert;