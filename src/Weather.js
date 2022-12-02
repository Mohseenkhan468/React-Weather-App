import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './weather.css'
export default function Weather(){
  const[city,setCity]=useState('Delhi');
  const[weather,setWeather]=useState(null);
  const[temp,setTemp]=useState(0)
  const[maxTemp,setMaxTemp]=useState(0)
  const[minTemp,setMinTemp]=useState(0)
  const[weatherType,setWeatherType]=useState('')
  const[image,setImage]=useState("")
  const [searchInput,setSearchInput]=useState("")
  useEffect(()=>{
    
  const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=afd10e0ef17d485991144c49a805a91b`
    async function WeatherCall(){
      const weatherData=await axios.get(url)
      console.log(weatherData.data.weather[0].main)
       setWeather(weatherData.data)
      setTemp(Math.round((weatherData.data.main.temp-273.15) * 100) / 100)
      setMaxTemp(Math.round((weatherData.data.main.temp_max-273.15) * 100) / 100)
      setMinTemp(Math.round((weatherData.data.main.temp_min-273.15) * 100) / 100)
      setWeatherType(weatherData.data.weather[0].main)
    }
    WeatherCall()
    
  },[city])
  useEffect(()=>{
    switch(weatherType){
      case 'Smoke':
        setImage("https://images.pexels.com/photos/3250570/pexels-photo-3250570.jpeg?auto=compress&cs=tinysrgb&w=600")
        break;
       case 'Clear':
        setImage("https://images.unsplash.com/photo-1613931189161-1f4d2660bd1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60") 
        break;
        case 'Clouds':
          setImage("https://images.unsplash.com/photo-1532178910-7815d6919875?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")
          break;
        case 'Rain':
          setImage("https://images.unsplash.com/photo-1620385019253-b051a26048ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fFJhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")  
          break;
        case 'Sunny':  
        setImage("https://images.unsplash.com/photo-1622278647429-71bc97e904e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Vubnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")
        break;
        case 'Haze':
          setImage("https://images.pexels.com/photos/720725/pexels-photo-720725.jpeg?auto=compress&cs=tinysrgb&w=600")
          break;
          case 'Fog':
            setImage("https://images.pexels.com/photos/1679772/pexels-photo-1679772.jpeg?auto=compress&cs=tinysrgb&w=600")
            break;
        default:
          setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1etEitQy3TgCQNDKRXCtbC0xmG5J04w_XKw&usqp=CAU")
          break;
    }
  },[weatherType])
const handleSearchBox=(e)=>{
  
  setSearchInput(e.target.value);
    
}  
const handleSubmit=(e)=>{
  e.preventDefault();
  setCity(searchInput)
}

  if(!weather) return 'No data'
  return(
    <div className='container'>
      <div className='weather' style={{backgroundImage: `url(${image})`}}>
      <h1 className='city'>{city}</h1>
      <h2 className='temp'>{temp}<span>&#176;</span>C</h2>
      <h2 className='weather-type'>{weatherType}</h2>
      <h3 className='temp-diff'><span>{maxTemp}</span>&#176;/<span>{minTemp}</span>&#176;</h3>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
      <input type="text" className='search-box' placeholder='Enter City' onChange={handleSearchBox} value={searchInput}/>
      <div>
      <button className='search-button'>Search</button>
      </div>
      </form>
    </div>
    </div>
  )
}