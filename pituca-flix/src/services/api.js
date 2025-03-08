import axios from "axios"


// base da url: https://api.themoviedb.org/3/
//url da api:/movie/now_playing?api_key=09cb032a5dc82af31448350df5b23055&language=pt-br



const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
