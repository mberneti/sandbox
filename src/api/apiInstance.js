import axios from 'axios';

const apiInstance = axios.create({
    timeout: 10000,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    //'Access-Control-Allow-Origin' header
    withCredentials: false
});

export default apiInstance;
