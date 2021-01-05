import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('userId', (err, user) => {
            if (user) {
                // value previously stored
                this.props.navigation.navigate('Home', { userId: user })
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }
    render() {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        );
    }
}