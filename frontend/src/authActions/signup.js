const accountSignup = async (email, password, name, careProvider) => {
    try {
        let response = await fetch('https://nameless-fjord-98873.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name,
                careProvider
            })
        })
        let json = await response.json();
        console.log(json)
        if (json.error) {
            return false
        }
        return json
    } catch (error) {
        return false
    }
};


export default accountSignup;