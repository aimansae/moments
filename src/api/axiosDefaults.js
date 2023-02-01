import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-as.herokuapp.com/'
//data format api expexts
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// to avoid errors when sending cookies
axios.defaults.withCredentials = true