import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { sendUserMessage, sbConnect, getChannelMessages, createChannelHandler, removeChannelHandler } from "../SendBird/SendBirdConnect"
import Message from '../Components/Message'
import errorAlert from '../alerts/errorAlerts'


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initalLoad: true,
            email: "",
            userId: "",
            name: "",
            careProvider: "",
            providerChannel: "",
            messages: [],
            userMessage: '',
            animating: true,
            messageSending: false,
            messagesLoading: true,
            channelMounted: false
        };
    }

    //navigation
    _onBack = () => {
        this.props.navigation.navigate('Home')
    }

    //sendbird
    createMessage = async () => {
        this.setState({ messageSending: true })
        try {
            const message = await sendUserMessage(this.state.providerChannel, this.state.email, this.state.userMessage)
            this.setState({ messages: [...this.state.messages, message] })
            this.textInput.clear()
            return this.setState({ messageSending: false })
        } catch (err) {
            console.log(err)
            return this.setState({ messageSending: false })
        }
    }

    getAdditionalMessages = async () => {
        if (this.state.initalLoad) return;
        this.setState({ messagesLoading: true }, async () => {
            try {
                const messages = await getChannelMessages(this.state.providerChannel, this.state.email);
                const messageArray = messages.concat(this.state.messages)
                this.setState({ messages: messageArray, messagesLoading: false })
            } catch (err) { console.log(`error getting additional messages ${err}`) }
        })

    }

    setupChannelHandlers(channelHandler) {
        channelHandler.onMessageReceived = (channel, message) => {
            this.setState({ messages: [...this.state.messages, message] })
        }
        onChannelChanged = channel => { }
        onChannelDeleted = (channelUrl, channelType) => { }
        onChannelFrozen = channel => { }
        onChannelHidden = channel => { }
        onChannelUnfrozen = channel => { }
        onDeliveryReceiptUpdated = channel => { }
        onMessageDeleted = (channel, messageId) => { }
        onMessageUpdated = (channel, message) => { }
    }
    //lifecycle
    async componentDidMount() {
        console.log("MOUNTING CHAT")
        this.props.navigation.setOptions({ title: this.props.route.params.careProvider })
        try {
            const providerChannel = this.props.route.params.careProviderChannel
            const userEmail = this.props.route.params.email
            const userId = this.props.route.params.userId
            if (!userEmail || !providerChannel || !userId) return this.props.navigation.navigate('Login')
            const sb = await sbConnect(userEmail)
            const messages = await getChannelMessages(providerChannel, userEmail);
            const handler = createChannelHandler(sb, providerChannel)
            this.setupChannelHandlers(handler)
            this.setState({
                messages: messages,
                email: userEmail,
                userId: userId,
                providerChannel: providerChannel,
                initalLoad: false,
                messagesLoading: false,
                channelMounted: true
            })
        } catch (err) {
            console.log(err)
            return errorAlert()
        }
    }

    componentWillUnmount() {
        removeChannelHandler()
    }

    //helpers
    toStandardTime = (militaryTime) => {
        const [hours, minutes, seconds] = militaryTime.split(':');
        return `${(hours > 12) ? hours - 12 : hours}:${minutes}${seconds ? `:${seconds}` : ''} ${(hours >= 12) ? 'PM' : 'AM'}`;
    }

    _renderList = rowData => {
        const message = rowData.item;
        const dateSent = new Date(message.createdAt)
        const dateDisplay = this.toStandardTime(`${dateSent.getHours()}:${dateSent.getMinutes()}`)
        return (
            <Message message={message} dateDisplay={dateDisplay} />
        );
    };


    render() {
        return (
            <View style={styles.containerStyle}>
                <Spinner visible={this.state.messageSending} />
                <FlatList
                    style={styles.flatListStyle}
                    ref={elem => (this.flatList = elem)}
                    renderItem={this._renderList}
                    data={this.state.messages}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.messageId + ''}
                    onEndReachedThreshold={0}
                    refreshing={this.state.messagesLoading}
                    onRefresh={this.getAdditionalMessages}
                />
                <View style={styles.messageInputViewStyle}>
                    <TextInput
                        multiline={true}
                        ref={input => { this.textInput = input }}
                        style={styles.textInputStyle}
                        placeholder={'Your message'}
                        autoCapitalize="none"
                        autoCorrect={false}
                        selectionColor={'#212529'}
                        value={this.props.textMessage}
                        onChangeText={(text) => this.setState({ userMessage: text })}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.createMessage}
                        disabled={this.state.userMessage.length < 1}
                    ><View style={styles.sendButton}><Text>Send</Text></View>
                    </TouchableOpacity>
                </View >
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        padding: 30,
        display: 'flex',
        backgroundColor: '#fbffed'
    },
    flatListStyle: {
        display: 'flex',
        flex: 1,
        borderColor: '#d1a2f5',
        borderWidth: 2,
        borderRadius: 8,
        flexGrow: 8,
        padding: 10
    },
    textInputStyle: {
        flex: 3,
        borderRadius: 3,
        marginRight: 5,
        marginTop: 2,
        backgroundColor: 'pink'
    },
    messageInputViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    buttonStyle: {
        flex: 1,
        marginTop: 2,
        backgroundColor: '#e09bdc'
    },
    sendButton: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}