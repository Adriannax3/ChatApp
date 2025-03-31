import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://157.158.162.124:8080/api',
});


export default instance;