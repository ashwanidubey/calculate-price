const login = async ( email, password ) => {
    const host = process.env.REACT_APP_HOST

    try {
        const userdata = {  email, password }
        const url = `${host}/auth/login`
        var response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
        });
        
        console.log(response)
        const result=await response.json()
        console.log(result)
        return result;
    } 
    catch (error) {
        console.error('Error in login:', error);
        return { result: false }
    }
}

export default login ;
