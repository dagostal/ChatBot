import React, { Component } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { sbConnect } from "../SendBird/SendBirdConnect"
import accountLogin from "../authActions/login"
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginAlert from "../alerts/authAlerts"



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: "",
            password: ""
        };
    }

    async componentDidMount() {
        try {
            await AsyncStorage.removeItem('userId')
        }
        catch (err) { console.log(err) }
    }

    _onLoginPress = async () => {
        const { email, password } = this.state;
        this.setState({ isLoading: true }, async () => {
            let acctLogin;
            try {
                acctLogin = await accountLogin(email, password)
                if (acctLogin === false) return loginAlert();
                //save userId in Local storage
                await AsyncStorage.setItem('userId', (acctLogin.id));
                //connect user in sendbird and go to home
                const sb = await sbConnect((acctLogin.email))
                if (sb) {
                    return this.props.navigation.navigate('Home')
                }
                return loginAlert();
            } catch (err) {
                return console.log(err)
            }
        })
    }



    _onEmailChanged = email => {
        this.setState({ email });
    };

    _onPasswordChanged = password => {
        this.setState({ password });
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', display: 'flex' }}><Text >Login</Text></View>
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
                <Button
                    title="Login"
                    buttonStyle={styles.buttonStyle}
                    onPress={this._onLoginPress}
                    disabled={this.state.loading}
                />
                <Button
                    title="Signup"
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate('Signup')}
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
    buttonStyle: {
        flex: 1,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'black'
    }

}