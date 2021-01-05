const getUser = async (userId) => {
    try {
        let response = await fetch('https://nameless-fjord-98873.herokuapp.com/getUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId
            })
        })
        let json = await response.json();
        if (json.error) {
            return false
        }
        return json
    } catch (error) {
        return false
    }
};


export default getUser;