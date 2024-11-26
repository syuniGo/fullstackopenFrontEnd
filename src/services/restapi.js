import axios from 'axios';
import config from '../config';


// console.log('All env variables:', import.meta.env);
// 特别打印这个 key
console.log('config.FREE_WEATHER_KEY API Key:', config.FREE_WEATHER_KEY);


// 1. 集中管理 API URLs
const ENDPOINTS = {
    COUNTRIES: 'https://studies.cs.helsinki.fi/restcountries',
    WEATHER: 'http://api.weatherapi.com/v1'
};

// 2. 创建 axios 实例
const countriesApi = axios.create({
    baseURL: ENDPOINTS.COUNTRIES
});

const weatherApi = axios.create({
    baseURL: ENDPOINTS.WEATHER,
    // params: {
    //     key: config.FREE_WEATHER_KEY,
    //     aqi: 'no'
    // }
});
// 3. API 方法
const api = {
    // 获取国家信息
    getCountries: async (endpoint) => {
        try {
            const response = await countriesApi.get(`/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    },

    // 获取天气信息
    getWeather: async (city) => {
        console.log('weatherApi', weatherApi)

        try {
            const response = await weatherApi.get('/current.json', {
                params: {
                    q: city,
                    key: config.FREE_WEATHER_KEY,
                    aqi: 'no'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }
};

export default api;