import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLink: true
        }
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    _onBack = () => {
        Linking.openURL(this.props.message.message)
    }

    componentDidMount() {
        if (this.validURL(this.props.message.message)) {
            this.setState({ isLink: false })
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => Linking.openURL(this.props.message.message)}
                disabled={this.state.isLink}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: !this.props.message.isUserMessage() ? '#e8e8e8' : '#afffab',
                    borderRadius: 8,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    paddingBottom: 2,
                    display: 'flex',
                    margin: 8,
                    alignItems: !this.props.message.isUserMessage() ? 'flex-start' : 'flex-end'
                }}><Text>{this.props.message.message}</Text><Text style={{ fontSize: 8, color: 'gray' }}>{this.props.dateDisplay}</Text>
                </View>
            </ TouchableOpacity>
        )
    }
};
