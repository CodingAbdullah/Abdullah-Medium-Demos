import axios from 'axios';

const login = async (user) => {
    // Make a call to the backend to verify, user and if so, issue a JWT Token 
    let options = {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
    };

    const response = await axios.post("http://localhost:5000/login", options); // Make async-await call to backend

    if (response.status === 200){
        localStorage.setItem("user", JSON.stringify(response.data)); // Set local storage to user information
    }

    return response.data;
}

const logout = async () => {    
    // Clear all LocalStorage...
    localStorage.clear();
}

const authService = {
    login,
    logout
};

export default authService;