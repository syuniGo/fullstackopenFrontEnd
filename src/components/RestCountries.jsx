import { useState, useEffect } from "react";
import api from "../services/restapi";



const ContryDetail = ({ countryInfo, weatherInfo }) => {
  console.log('weatherInfo',weatherInfo);
  
  return (
    <div>
      <h1>{countryInfo.name.common}</h1>
      <div>capital:{countryInfo.capital[0]}</div>
      <div>area:{countryInfo.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.entries(countryInfo.languages).map(([k, v]) => (
          <li key={k}>{v}</li>
        ))}
      </ul>
      <img src={countryInfo.flags.png}></img>
      {weatherInfo && (
        <div>
          <h2>Weather in {countryInfo.name.common}</h2>
          <div>temperature {weatherInfo.current.temp_c} Celcius</div>
          <img src={weatherInfo.current.condition.icon}></img>
          <div>wind {weatherInfo.current.wind_mph} m/s </div>
        </div>
      )}
    </div>
  );
};

const Lookup = (props) => {
  const renderInfo = () => {
    if (props.countres.length == 1) {
      const countryInfo = props.countres[0];
      return (
        <ContryDetail
          countryInfo={countryInfo}
          weatherInfo={props.weatherInfo}
        ></ContryDetail>
      );
    }
    if (props.countres.length >= 10) {
      return <div> Too many mathes specify another filter</div>;
    }
    return props.countres.map((e) => {
      return (
        <div key={e.name.common}>
          {" "}
          {console.log("rrr", e)}
          {e.name.common}
          <button onClick={() => props.showInfo(e)}>show</button>
          {props.selectedCountry &&
            props.selectedCountry.name.common == e.name.common && (
              <ContryDetail countryInfo={e} weatherInfo={props.weatherInfo}></ContryDetail>
            )}
        </div>
      );
    });
  };
  return (
    <div>
      <div>
        find countries{" "}
        <input value={props.filterWords} onChange={props.handleInput}></input>
      </div>
      {renderInfo()}
    </div>
  );
};

const RestCountries = () => {
  const [originalCountries, setOriginalCountries] = useState([]);
  const [countres, setCountres] = useState([]);
  const [filterWords, setFilterWords] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null); // 添加新的状态
  const [weatherInfo, setWeatherInfo] = useState({});

  const apiName = "api/all";

  const handleInput = (event) => {
    const searchValue = event.target.value;

    setFilterWords(searchValue);
    console.log("filterWords", filterWords);
    setFilterWords(searchValue);
    // 基于原始数据进行过滤
    setCountres(
      originalCountries.filter((e) =>
        e.name.common.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const showInfo = (country) => {
    console.log("ssss", country);
    setSelectedCountry(country);
  };

  useEffect(() => {
    console.log("effect");
    api.getCountries(apiName).then((res) => {
      console.log("promise fulfilled", res);
      console.log("promise fulfilled", res.length);
      const countryInfos = res.map((e) => e);
      //   setCountres(countryInfos.length >= 10 ? countryInfos.slice(0,10) : countryInfos);
      setCountres(countryInfos);
      setOriginalCountries(countryInfos);
    });
  }, []);

  // 获取天气信息（当 selectedCity 改变时更新）
  useEffect(() => {
    if (!selectedCountry?.capital?.[0]) {
      setWeatherInfo(null); // 清空之前的天气信息
      return;
    }

    const fetchWeather = async () => {
      try {
        const res = await api.getWeather(selectedCountry.capital[0]);
        setWeatherInfo(res);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [selectedCountry]); // 当 selectedCity 改变时重新获取天气

  return (
    <Lookup
      countres={countres}
      handleInput={handleInput}
      value={filterWords}
      showInfo={showInfo}
      selectedCountry={selectedCountry}
      weatherInfo={weatherInfo}
    ></Lookup>
  );
};

export default RestCountries;
