// config/index.js
console.log('All env:', import.meta.env);

// 打印具体的环境变量
console.log('Weather API Key:', import.meta.env.VITE_FREE_WEATHER_KEY);

const config = {
    FREE_WEATHER_KEY: import.meta.env.VITE_FREE_WEATHER_KEY
};

if (!config.FREE_WEATHER_KEY) {
    console.warn('Warning: Weather API key is not set in environment variables');
}

export default config;

