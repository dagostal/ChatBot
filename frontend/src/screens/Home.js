import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { sbConnect } from "../SendBird/SendBirdConnect"
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUser from '../networking/getUser'


//TODO: add new ConnectionHandler() to handle drops

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userId: "",
            name: "",
            careProvider: "",
            email: ""
        };
    }

    async componentDidMount() {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const user = await getUser(userId)
            if (!user) return this.props.navigation.navigate('Login')
            await sbConnect(user.email);
            this.setState({
                userId: userId,
                careProvider: user.careProvider,
                careProviderChannel: user.careProviderChannel,
                name: user.name,
                loading: false,
                email: user.email
            })
        } catch (err) {
            console.log(err)
        }
    }


    _onChatPress = () => {
        this.setState({ isLoading: true }, async () => {
            this.props.navigation.navigate('Chat', { userId: this.state.userId, email: this.state.email, careProviderChannel: this.state.careProviderChannel, careProvider: this.state.careProvider })
        })
    }


    _onLogoutPress = () => {
        this.setState({ isLoading: true }, async () => {
            try {
                await AsyncStorage.removeItem('userId')
                this.props.navigation.navigate('Login')
            }
            catch (err) { console.log(err) }
        })
    }


    render() {
        return (
            <View style={styles.containerStyle} >
                {!this.state.loading ?
                    <View>
                        <View style={styles.homeText}><Text>Welcome {this.state.name}</Text></View>
                        <TouchableOpacity
                            onPress={this._onChatPress}
                            style={styles.chat}
                        >
                            <View style={styles.goToChatButton}><Text>chat with {this.state.careProvider}</Text></View>
                        </TouchableOpacity >
                        <Button
                            title="Logout"
                            buttonStyle={styles.buttonStyle}
                            onPress={this._onLogoutPress}
                            disabled={this.state.loading}
                        />
                    </View > : <View><Text style={styles.homeText}>Loading...</Text></View>
                }
            </View >
        );
    }
}




const styles = {
    containerStyle: {
        flex: 1,
        margin: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chat: {
        flex: 1
    },
    homeText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goToChatButton: {
        backgroundColor: '#afffab',
        height: 100,
        width: 200,
        borderWidth: 2,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'black'
    }
}