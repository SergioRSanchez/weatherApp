import { useEffect, useState } from 'react';

import { ReactComponent as LocationPin } from './assets/locationPin.svg';
import { ReactComponent as Wind } from './assets/wind.svg';
import { ReactComponent as Humidity } from './assets/humidity.svg';
import { ReactComponent as Rain } from './assets/rain.svg';
import { ReactComponent as Leaf } from './assets/leaf.svg';
import { ReactComponent as Time } from './assets/time.svg';
import { ReactComponent as SunChart } from './assets/sunChart.svg';

import closed from './assets/closed.png';
import cloudy from './assets/cloudy.png';
import lightning from './assets/lightning.png';
import rainy from './assets/rainy.png';
import sunny from './assets/sunny.png';


function App() {

  //  Depois colocar a KEY em um .env e trocar essa key na API pois foi exposta
  const apiKey = '66ba19186b666343f6fdca1fbe74f216';


  const [ city, setCity ]  = useState('São José do Rio Preto');
  const [ temperature, setTemperature ]  = useState('-');
  const [ weatherIcon, setWeatherIcon ] = useState('nuvens dispersas')
  const [ maxTemperature, setMaxTemperature ]  = useState('-');
  const [ minTemperature, setMinTemperature ]  = useState('-');
  const [ wind, setWind ]  = useState('-');
  const [ humidity, setHumidity ]  = useState('-');
  const [ precipitation, setPrecipitation ]  = useState('-');
  const [ airQuality, setAirQuality ] = useState('1')
  const [ airQualityValue, setAirQualityValue ]  = useState('20');
  const [ pm2, setPm2 ]  = useState('12.9');
  const [ pm10, setPm10 ]  = useState('12.9');
  const [ so2, setSo2 ]  = useState('2.1');
  const [ no2, setNo2 ]  = useState('1.4');
  const [ o3, setO3 ]  = useState('21.2');
  const [ co, setCo ]  = useState('420');
  const [ minTomorrow, setMinTomorrow ] = useState('-');
  const [ maxTomorrow, setMaxTomorrow ] = useState('-');
  const [ minSecondDay, setMinSecondDay ] = useState('-');
  const [ maxSecondDay, setMaxSecondDay ] = useState('-');
  const [ minThirdDay, setMinThirdDay ] = useState('-');
  const [ maxThirdDay, setMaxThirdDay ] = useState('-');
  const [ minFourthDay, setMinFourthDay ] = useState('-');
  const [ maxFourthDay, setMaxFourthDay ] = useState('-');
  const [ minFifthDay, setMinFifthDay ] = useState('-');
  const [ maxFifthDay, setMaxFifthDay ] = useState('-');
  const [ longitude, setLongitude ] = useState('-49.3794');
  const [ latitude, setLatitude ] = useState('-20.8197');
  const [ sunrise, setSunrise ] = useState('');
  const [ sunset, setSunset ] = useState('');
  const [ time, setTime ] = useState('');
  const [ timeZone, setTimeZone ] = useState('');
  const [ diaDois, setDiaDois ] = useState('-');
  const [ diaTres, setDiaTres ] = useState('-');
  const [ diaQuatro, setDiaQuatro ] = useState('-');
  const [ diaCinco, setDiaCinco ] = useState('-');
  const [ sunPercentage, setSunPercentage ] = useState(0);



  async function getWeatherData() {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const apiWeatherURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const apiWeatherURLGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const apiWeatherURLAirPollution = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const res = await fetch(apiWeatherURL)
    const resForecast = await fetch(apiWeatherURLForecast)
    const resGeoCode = await fetch(apiWeatherURLGeo)
    const resAirPollution = await fetch(apiWeatherURLAirPollution)
    const data = await res.json()
    const dataForecast = await resForecast.json()
    const dataGeo = await resGeoCode.json()
    const dataAirPollution = await resAirPollution.json()

    setLatitude(data.coord.lat)
    setLongitude(data.coord.lon)

    setPm2(parseFloat(dataAirPollution.list[0].components.pm2_5).toFixed(1))
    setPm10(parseFloat(dataAirPollution.list[0].components.pm10).toFixed(1))
    setSo2(parseFloat(dataAirPollution.list[0].components.so2).toFixed(1))
    setNo2(parseFloat(dataAirPollution.list[0].components.no2).toFixed(1))
    setO3(parseFloat(dataAirPollution.list[0].components.o3).toFixed(1))
    setCo(parseFloat(dataAirPollution.list[0].components.co).toFixed(0))
    setAirQuality(dataAirPollution.list[0].main.aqi)
    

    setCity(data.name)
    setTemperature(parseFloat(data.main.temp).toFixed(0))
    setWind(parseFloat(data.wind.speed).toFixed(1))
    setHumidity(parseFloat(data.main.humidity).toFixed(0))
    if (data.rain === null || data.rain === undefined) {
      setPrecipitation('-')
    } else {
      setPrecipitation(parseFloat(data.rain['1h']))
    }
    setWeatherIcon(data.weather[0].description)

    const dif = data.sys.sunset - data.sys.sunrise
    const dif2 = data.dt - data.sys.sunrise
    const percent = (dif2 / dif) * 100
    if (percent >= 0 || percent <= 100) {
      setSunPercentage(percent)
    }
    if (percent < 0) {
      setSunPercentage(0)
    }
    if (percent > 100) {
      setSunPercentage(100)
    }


    const dateSunrise = new Date((data.sys.sunrise + 10800 + data.timezone) * 1000)
    const hourSunrise = dateSunrise.getHours()
    const minuteSunrise = dateSunrise.getMinutes()
    const formattedTimeSunrise = `${hourSunrise.toString().padStart(2, '0')}:${minuteSunrise.toString().padStart(2, '0')}`
    setSunrise(formattedTimeSunrise)

    const dateSunset = new Date((data.sys.sunset + 10800 + data.timezone) * 1000)
    const hourSunset = dateSunset.getHours()
    const minuteSunset = dateSunset.getMinutes()
    const formattedTimeSunset = `${hourSunset.toString().padStart(2, '0')}:${minuteSunset.toString().padStart(2, '0')}`
    setSunset(formattedTimeSunset)

    const dateNow = new Date((data.dt + 10800 + data.timezone) * 1000)
    const hourNow = dateNow.getHours()
    const minuteNow = dateNow.getMinutes()
    const formattedTimeNow = `${hourNow.toString().padStart(2, '0')}:${minuteNow.toString().padStart(2, '0')}`
    setTime(formattedTimeNow)
    
    const segundoDia = new Date()
    segundoDia.setDate(segundoDia.getDate() + 2)
    setDiaDois(segundoDia.toLocaleString('pt-BR', {weekday: 'long'}))
    
    const terceiroDia = new Date()
    terceiroDia.setDate(terceiroDia.getDate() + 3)
    setDiaTres(terceiroDia.toLocaleString('pt-BR', {weekday: 'long'}))
    
    const quartoDia = new Date()
    quartoDia.setDate(quartoDia.getDate() + 4)
    setDiaQuatro(quartoDia.toLocaleString('pt-BR', {weekday: 'long'}))
    
    const quintoDia = new Date()
    quintoDia.setDate(quintoDia.getDate() + 5)
    setDiaCinco(quintoDia.toLocaleString('pt-BR', {weekday: 'long'}))



    

    const todayMinArr = [dataForecast.list[0].main.temp_min, dataForecast.list[1].main.temp_min, dataForecast.list[2].main.temp_min]
    const todayMaxArr = [dataForecast.list[0].main.temp_max, dataForecast.list[1].main.temp_max, dataForecast.list[2].main.temp_max]
    setMinTemperature(parseFloat(Math.min(...todayMinArr)).toFixed(0))
    setMaxTemperature(parseFloat(Math.max(...todayMaxArr)).toFixed(0))
    
    const tomorrowMinArr = [dataForecast.list[3].main.temp_min, dataForecast.list[4].main.temp_min, dataForecast.list[5].main.temp_min, dataForecast.list[6].main.temp_min, dataForecast.list[7].main.temp_min, dataForecast.list[8].main.temp_min, dataForecast.list[9].main.temp_min, dataForecast.list[10].main.temp_min]
    const tomorrowMaxArr = [dataForecast.list[3].main.temp_max, dataForecast.list[4].main.temp_max, dataForecast.list[5].main.temp_max, dataForecast.list[6].main.temp_max, dataForecast.list[7].main.temp_max, dataForecast.list[8].main.temp_max, dataForecast.list[9].main.temp_max, dataForecast.list[10].main.temp_max]
    setMinTomorrow(parseFloat(Math.min(...tomorrowMinArr)).toFixed(0))
    setMaxTomorrow(parseFloat(Math.max(...tomorrowMaxArr)).toFixed(0))

    const secondDayMinArr = [dataForecast.list[11].main.temp_min, dataForecast.list[12].main.temp_min, dataForecast.list[13].main.temp_min, dataForecast.list[14].main.temp_min, dataForecast.list[15].main.temp_min, dataForecast.list[16].main.temp_min, dataForecast.list[17].main.temp_min, dataForecast.list[18].main.temp_min]
    const secondDayMaxArr = [dataForecast.list[11].main.temp_max, dataForecast.list[12].main.temp_max, dataForecast.list[13].main.temp_max, dataForecast.list[14].main.temp_max, dataForecast.list[15].main.temp_max, dataForecast.list[16].main.temp_max, dataForecast.list[17].main.temp_max, dataForecast.list[18].main.temp_max]
    setMinSecondDay(parseFloat(Math.min(...secondDayMinArr)).toFixed(0))
    setMaxSecondDay(parseFloat(Math.max(...secondDayMaxArr)).toFixed(0))

    const thirdDayMinArr = [dataForecast.list[19].main.temp_min, dataForecast.list[20].main.temp_min, dataForecast.list[21].main.temp_min, dataForecast.list[22].main.temp_min, dataForecast.list[23].main.temp_min, dataForecast.list[24].main.temp_min, dataForecast.list[25].main.temp_min, dataForecast.list[26].main.temp_min]
    const thirdDayMaxArr = [dataForecast.list[19].main.temp_max, dataForecast.list[20].main.temp_max, dataForecast.list[21].main.temp_max, dataForecast.list[22].main.temp_max, dataForecast.list[23].main.temp_max, dataForecast.list[24].main.temp_max, dataForecast.list[25].main.temp_max, dataForecast.list[26].main.temp_max]
    setMinThirdDay(parseFloat(Math.min(...thirdDayMinArr)).toFixed(0))
    setMaxThirdDay(parseFloat(Math.max(...thirdDayMaxArr)).toFixed(0))

    const fourthDayMinArr = [dataForecast.list[27].main.temp_min, dataForecast.list[28].main.temp_min, dataForecast.list[29].main.temp_min, dataForecast.list[30].main.temp_min, dataForecast.list[31].main.temp_min, dataForecast.list[32].main.temp_min, dataForecast.list[33].main.temp_min, dataForecast.list[34].main.temp_min]
    const fourthDayMaxArr = [dataForecast.list[27].main.temp_max, dataForecast.list[28].main.temp_max, dataForecast.list[29].main.temp_max, dataForecast.list[30].main.temp_max, dataForecast.list[31].main.temp_max, dataForecast.list[32].main.temp_max, dataForecast.list[33].main.temp_max, dataForecast.list[34].main.temp_max]
    setMinFourthDay(parseFloat(Math.min(...fourthDayMinArr)).toFixed(0))
    setMaxFourthDay(parseFloat(Math.max(...fourthDayMaxArr)).toFixed(0))

    const fifthDayMinArr = [dataForecast.list[35].main.temp_min, dataForecast.list[36].main.temp_min, dataForecast.list[37].main.temp_min, dataForecast.list[38].main.temp_min, dataForecast.list[39].main.temp_min]
    const fifthDayMaxArr = [dataForecast.list[35].main.temp_max, dataForecast.list[36].main.temp_max, dataForecast.list[37].main.temp_max, dataForecast.list[38].main.temp_max, dataForecast.list[39].main.temp_max]
    setMinFifthDay(parseFloat(Math.min(...fifthDayMinArr)).toFixed(0))
    setMaxFifthDay(parseFloat(Math.max(...fifthDayMaxArr)).toFixed(0))
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      getWeatherData()
    }
  }

  useEffect(() => {
    getWeatherData()
  }, [longitude])


  return (
    <div className='box-border font-["Lato"] bg-[url("/src/assets/background.png")] bg-cover sm:h-screen flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-8 sm:px-32 py-12'>
      
      <div className='bg-[url("/src/assets/backgroundBlock.png")] sm:w-[480px] sm:h-[480px]  h-[400px] flex flex-col justify-between rounded-[10px]'>
        <div className='flex justify-between relative'>
          {
            weatherIcon === 'algumas nuvens'
            &&
            <img src={closed} className='relative -top-20 -left-6 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'tempo limpo'
            &&
            <img src={sunny} className='relative -top-20 -left-12 sm:-top-20 sm:-left-20 w-[176px]' />
          }
          {
            weatherIcon === 'céu limpo'
            &&
            <img src={sunny} className='relative -top-20 -left-12 sm:-top-20 sm:-left-20 w-[176px]' />
          }
          {
            weatherIcon === 'nuvens dispersas'
            &&
            <img src={cloudy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'névoa'
            &&
            <img src={cloudy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'nublado'
            &&
            <img src={cloudy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'chuva leve'
            &&
            <img src={rainy} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'chuva moderada'
            &&
            <img src={rainy} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'pouca neve'
            &&
            <img src={rainy} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'garoa de leve intensidade'
            &&
            <img src={rainy} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'trovoada'
            &&
            <img src={lightning} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'chuva forte'
            &&
            <img src={lightning} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'trovoada com chuva fraca'
            &&
            <img src={lightning} className='relative -top-20 -left-8 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          <div className='absolute right-0 flex gap-1 items-center pr-4 pt-4 sm:pr-8 sm:pt-8'>
            <button onClick={getWeatherData}><LocationPin /></button>
            <input onChange={(e) => setCity(e.target.value)} value={city} onClick={() => setCity('')} onKeyDown={handleKeyDown} onBlur={getWeatherData} className='text-[#C2BFF4] text-sm font-bold bg-[#6D67D0] w-36 outline-[#6D67D0] pl-1' />
          </div>
        </div>

        <div className='relative -top-16'>
          <div className='flex justify-center font-bold'>
            <span className='text-white text-[88px] leading-none'>{temperature}</span>
            <span className='text-[#DAD8F7] text-2xl '>ºC</span>
          </div>
          <div className='flex justify-center text-xl font-bold gap-1'>
            <span className='text-white'>{maxTemperature}º</span>
            <span className='text-[#DAD8F7]'>{minTemperature}º</span>
          </div>
        </div>

        <div className='flex justify-between px-1 sm:px-3 mb-3 sm:gap-2 gap-1'>
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Wind className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Vento</p>
              <p className='text-sm text-[#E7E6FB]'>{wind} <span className='text-[#DAD8F7]'>km/h</span></p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Humidity className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Umidade</p>
              <p className='text-sm text-[#E7E6FB]'>{humidity} <span className='text-[#DAD8F7]'>%</span></p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Rain className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Chuva</p>
              <p className='text-sm text-[#E7E6FB]'>{precipitation} <span className='text-[#DAD8F7]'>mm</span></p>
            </div>
          </div>


        </div>
      </div>


      <div className='flex flex-col gap-6'>
        <div className='flex flex-col sm:flex-row gap-6'>
          
          <div className='bg-[#6D67D0] pt-8 px-4 pb-4 flex flex-col items-center gap-8 rounded-[10px]'>
            <div className='flex items-center gap-2'>
              <Leaf />
              <p className='font-bold text-[#DAD8F7]'>Qualidade do ar</p>
            </div>
            <div className='flex flex-col items-center'>
              {
                airQuality == '1'
                &&
                <p className='text-[#87EBCD] font-bold text-lg'>Boa</p>
              }
              {
                airQuality == '2'
                &&
                <p className='text-blue-700 font-bold text-lg'>Justa</p>
              }
              {
                airQuality == '3'
                &&
                <p className='text-[#F6C833] font-bold text-lg'>Moderada</p>
              }
              {
                airQuality == '4'
                &&
                <p className='text-[#dbb85e] font-bold text-lg'>Ruim</p>
              }
              {
                airQuality == '5'
                &&
                <p className='text-[#ee4343] font-bold text-lg'>Péssima</p>
              }
              {
                airQuality == '1'
                &&
                <p className='text-[#E7E6FB] font-bold text-[40px]'>20</p>
              }
              {
                airQuality == '2'
                &&
                <p className='text-[#E7E6FB] font-bold text-[40px]'>40</p>
              }
              {
                airQuality == '3'
                &&
                <p className='text-[#E7E6FB] font-bold text-[40px]'>60</p>
              }
              {
                airQuality == '4'
                &&
                <p className='text-[#E7E6FB] font-bold text-[40px]'>80</p>
              }
              {
                airQuality == '5'
                &&
                <p className='text-[#E7E6FB] font-bold text-[40px]'>100</p>
              }
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{pm2}</p>
                <p className='text-[#E7E6FB] text-xs'>PM2.5</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{pm10}</p>
                <p className='text-[#E7E6FB] text-xs'>PM10</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{so2}</p>
                <p className='text-[#E7E6FB] text-xs'>SO₂</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{no2}</p>
                <p className='text-[#E7E6FB] text-xs'>NO₂</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{o3}</p>
                <p className='text-[#E7E6FB] text-xs'>O₃</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{co}</p>
                <p className='text-[#E7E6FB] text-xs'>CO</p>
              </div>
            </div>
          </div>
          
          <div className='bg-[#6D67D0] pt-8 px-4 pb-4 flex flex-col items-center gap-8 rounded-[10px]'>
            <div className='flex items-center gap-2'>
              <Time />
              <p className='font-bold text-[#DAD8F7]'>Horário do sol</p>
            </div>
            <div className='sun-chart-wrapper h-[110px]'>
              <div className='sun-chart relative m-auto w-[216px] h-[216px]'>
                <div className='h-[108px] overflow-hidden'><div style={{background: 'linear-gradient(180deg, rgba(251, 219, 96, 0.2) 0%, rgba(251, 219, 96, 0) 101.89%)', mask: 'linear-gradient(0deg, white 50%, transparent 0%)', webkitMask: 'linear-gradient(0deg, white 50%, transparent 0%)', transform: `rotate(calc(1.8deg * ${sunPercentage}))`}} className='w-[216px] h-[216px] block rounded-full transition-all duration-1000'></div></div>
                <div className='chart'>
                  <div style={{transform: `rotate(calc(1deg * (((100 - ${sunPercentage}) / -100) * 180))) translate(106px)`}} className='w-[12px] h-[12px] absolute bg-[#F6C833] rounded-full top-1/2 left-1/2 -m-[6px] transition-all duration-1000'></div>
                  <SunChart className='absolute top-0'/>
                </div>
                <p className='text-white text-sm font-bold absolute top-1/4 left-1/2 -translate-x-1/2'>{time}</p>
              </div>
            </div>
            <div className='flex text-xs text-white align-middle flex-row justify-between w-[230px] max-w-[276px] -mt-6 sm:mt-0'>
              <p>{sunrise}</p>
              <p>{sunset}</p>
            </div>
          </div>

        </div>
        
        <div className='bg-[#6D67D0] rounded-[10px] flex flex-col sm:flex-row p-10 gap-3 justify-between'>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>amanhã</p>
            <img src={cloudy} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>{maxTomorrow}°</span>
              <span className='text-[#C2BFF4] font-bold'>{minTomorrow}°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>{diaDois}</p>
            <img src={sunny} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>{maxSecondDay}°</span>
              <span className='text-[#C2BFF4] font-bold'>{minSecondDay}°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>{diaTres}</p>
            <img src={rainy} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>{maxThirdDay}°</span>
              <span className='text-[#C2BFF4] font-bold'>{minThirdDay}°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>{diaQuatro}</p>
            <img src={lightning} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>{maxFourthDay}°</span>
              <span className='text-[#C2BFF4] font-bold'>{minFourthDay}°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>{diaCinco}</p>
            <img src={closed} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>{maxFifthDay}°</span>
              <span className='text-[#C2BFF4] font-bold'>{minFifthDay}°</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
