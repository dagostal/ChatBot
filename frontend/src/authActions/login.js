const accountLogin = async (email, password) => {
    try {
        let response = await fetch('https://nameless-fjord-98873.herokuapp.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        let json = await response.json();
        if (json.error) {
            return false
        }
        return json
    } catch (err) {
        return false
    }
};


export default accountLogin;