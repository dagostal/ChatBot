import SendBird from 'sendbird'
const appId = ''
let messageQuery

const sbConnect = async email => {
    return new Promise((resolve, reject) => {
        if (!email) return reject('email is required to connect to sendbird.');
        let sb = SendBird.getInstance()
        if (!sb) sb = new SendBird({ appId });
        if (sb.getConnectionState() === "CLOSED") {
            sb.connect(email, (user, error) => {
                if (error) return reject(error);
                return resolve(sb);
            })
        } else return resolve(sb)
    })
};

//sendbird functions
const getGroupChannel = async (channel, sb) => {
    if (!channel) return
    try {
        return new Promise((resolve, reject) => {
            sb.GroupChannel.getChannel(channel, (groupChannel, error) => {
                if (error) return reject(error);
                return resolve(groupChannel)
            })
        })
    }
    catch (err) {
        console.log(err)
    }

}

const createMessageQuery = async messageQuery => {
    return new Promise((resolve, reject) => {
        messageQuery.load((messages, error) => {
            if (error) {
                console.log(err)
                reject(error)
            }
            resolve(messages)
        });
    })
}

const sendMessage = async (groupChannel, params) => {
    return new Promise((resolve, reject) => {
        groupChannel.sendUserMessage(params, (message, error) => {
            if (error) return reject(error)
            return resolve(message);
        })
    })
}

//functions to use

const getChannelMessages = async (channelUrl, email) => {
    try {
        const sb = await sbConnect(email);
        const groupChannel = await getGroupChannel(channelUrl, sb);
        // There should only be one single instance of a message query
        if (!messageQuery) {
            const prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
            prevMessageListQuery.reverse = true;
            prevMessageListQuery.limit = 10;
            messageQuery = prevMessageListQuery
        }
        return await createMessageQuery(messageQuery);
    } catch (err) {
        console.log(err)
        throw err
    }
}


const sendUserMessage = async (channelUrl, email, userMessage) => {
    try {
        const sb = await sbConnect(email);
        const channel = await getGroupChannel(channelUrl, sb);
        const params = new sb.UserMessageParams();
        params.isPublic = false;
        params.isEphemeral = false;
        params.isDistinct = false
        params.isPublic = false;
        params.isSuper = false;

        params.message = userMessage;
        const message = await sendMessage(channel, params)
        if (message.sendingStatus) {
            return message
        } else return console.log("error sending message")
    } catch (err) { throw (err) }
}

const createChannelHandler = (sb, careProviderChannel) => {
    let channelHandler = new sb.ChannelHandler();
    sb.addChannelHandler(careProviderChannel, channelHandler)
    return channelHandler
}

const removeChannelHandler = async channelUrl => {
    try {
        let sb = SendBird.getInstance()
        if (!sb) throw "no channel to remove";
        const groupChannel = await getGroupChannel(channelUrl, sb)
        return sb.removeChannelHandler(groupChannel);
    } catch (err) { throw err }

}

export { sbConnect, sendUserMessage, getChannelMessages, createChannelHandler, removeChannelHandler };