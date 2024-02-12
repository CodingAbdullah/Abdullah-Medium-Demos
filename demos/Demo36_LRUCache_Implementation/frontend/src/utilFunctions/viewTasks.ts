import axios from 'axios';

export async function viewTasks() {
    try {
        const response = await axios.get("http://localhost:5000/view-tasks");
        return response.data;
    }
    catch(err) {
        throw new Error();
    }    
}