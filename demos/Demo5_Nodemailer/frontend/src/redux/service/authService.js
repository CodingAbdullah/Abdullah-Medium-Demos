import axios from 'axios';

const login = async (user) => {
    const { email, password } = user;

    try {
        // Make call to the backend using the credentials passed in from client side
        let options = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers : {
                'content-type' : 'application/json'
            }
        }

        // Return promise-based call made to backend server containing User data
        const response = await axios.post("http://localhost:5000/login-user", options);

        if (response.status === 200){
            localStorage.setItem("token", JSON.stringify(response.data.token)); // Set local storage to user information
        }
    
        return response.data;
    }
    catch (err) {
        return err;
    }
}

const logout = async () => {
    localStorage.clear(); // Clear entire localStorage of any items
}

const authService = {
    login, 
    logout
};

export default authService;