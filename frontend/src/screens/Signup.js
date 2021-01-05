import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { sbConnect } from "../SendBird/SendBirdConnect"
import accountSignup from "../authActions/signup"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signUpAlert } from "../alerts/authAlerts"
import { Picker } from '@react-native-picker/picker';


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: "",
            name: "",
            password: "",
            careProvider: "a"
        };
    }

    async componentDidMount() {
        try {
            await AsyncStorage.removeItem('userId')
        }
        catch (err) { console.log(err) }
    }

    _onSignupPress = async () => {
        const { email, password, name, careProvider } = this.state;

        this.setState({ isLoading: true }, async () => {
            let acctSignup;
            try {
                acctSignup = await accountSignup(email, password, name, careProvider)
                if (acctSignup === false) return signUpAlert();
                const sendBirdConnect = await sbConnect(email)
                //save userId in Local storage                          
                await AsyncStorage.setItem('userId', acctSignup.id)
                //connect user in sendbird and go to home
                if (sendBirdConnect) this.props.navigation.navigate('Home')
            } catch (err) {
                console.log(err)
            }
        })

    }



    _onEmailChanged = email => {
        this.setState({ email });
    };

    _onNameChanged = name => {
        this.setState({ name });
    };

    _onPasswordChanged = password => {
        this.setState({ password });
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.inputHolder}>
                    <TextInput
                        label="email"
                        placeholder="email"
                        style={styles.textInputStyle}
                        value={this.state.userId}
                        duration={100}
                        autoCorrect={false}
                        maxLength={50}
                        onChangeText={this._onEmailChanged}
                    />
                </View>
                <View style={styles.inputHolder}>
                    <TextInput
                        label="name"
                        placeholder="name"
                        style={styles.textInputStyle}
                        value={this.state.name}
                        duration={100}
                        autoCorrect={false}
                        maxLength={50}
                        onChangeText={this._onNameChanged}
                    />

                </View>
                <View style={styles.inputHolder}>
                    <TextInput
                        label="password"
                        placeholder="password"
                        secureTextEntry={true}
                        style={styles.textInputStyle}
                        value={this.state.password}
                        duration={100}
                        autoCorrect={false}
                        maxLength={50}
                        onChangeText={this._onPasswordChanged}
                    />

                </View>
                <View style={styles.inputHolder}>
                    <Picker
                        selectedValue={this.state.careProvider}
                        style={styles.pickerStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ careProvider: itemValue })
                        }>
                        <Picker.Item label="Dr. A" value="DrA" />
                        <Picker.Item label="Dr. B" value="DrB" />
                        <Picker.Item label="Dr. C" value="DrC" />
                    </Picker>

                </View>
                <Button
                    title="Signup"
                    buttonStyle={styles.buttonStyle}
                    onPress={this._onSignupPress}
                    disabled={this.state.loading}
                />
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        margin: 35,
        justifyContent: 'space-around'
    },
    inputHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputStyle: {
        width: 250,
        height: 100,
        borderWidth: 1,
        borderColor: 'black'
    },
    pickerStyle: {
        width: 250,
        height: 100,
        flex: 1
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'black'
    }

}