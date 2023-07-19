import axios from 'axios';

const login = async (user) => {
    try {
        // Make call to the backend using the credentials passed in from client side
        let options = {
            method: 'POST',
            body: JSON.stringify({ user }),
            headers : {
                'content-type' : 'application/json'
            }
        }

        // Return promise-based call made to backend server containing User data
        return await axios.post("http://localhost:5000/login-user", options);
    }
    catch (err) {
        return err;
    }
}

const logout = async () => {
    return localStorage.clear(); // Clear entire localStorage of any items
}

const authService = {
    login, 
    logout
};

export default authService;