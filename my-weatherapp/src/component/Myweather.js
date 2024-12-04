import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import cloud  from "../Image/Clouds.png"
import rain  from "../Image/Rain.png"
import clear  from "../Image/Clear.png"
import mist  from "../Image/mist.png"
import err from "../Image/error.jpg"

const Myweather = () => {
    const [search,setSearch]=useState("")
    const[data,setData]=useState()
    const [error,setError]=useState()


    const apiKey="5feae517c485a46c18d8ec3715319a6f";
    
    
    const handleValue=(e)=>{
      setSearch(e.target.value)
    }

    const myFun=async()=>{
        const get =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
        const jsondt = await get.json()
        console.log(jsondt);
        setData(jsondt)
       if(search===""){
        setError("please enter the name")
       } 
      else if(jsondt.cod==='404'){
        setError("please valid Name")
       }
       else{
        setError("")
       }
       setSearch("")
    }
  return (
    <div className='container'>
        <div className='inputs-name'>
            <input type='text' placeholder='Enter the city name' value={search} onChange={handleValue}/>
            <button onClick={myFun}>
               <SearchIcon style={{ fontSize:"34px",display:"flex",alignItems:"center",padding:"2px"}}/>
            </button>
        </div>
        <div>
        {
          error ?
          <div className='errorimage'>
            <p>{error}</p>
            <img src={err} alt=''/>
          </div> : ""
        }
             {
                data && data.weather ? 
                <div className='weathersimage'>
                    <h2 className='cityName'>{data.name}</h2>
                    <img src={data.weather[0].main === "Clouds" ? cloud : "" } alt=''/>
                    <img src={data.weather[0].main === "Rain" ? rain : "" } alt=''/>
                    <img src={data.weather[0].main === "Clear" ? clear : "" } alt=''/>
                    <img src={data.weather[0].main === "Mist" ? mist : "" } alt=''/>
                    <img src={data.weather[0].main === "Haze" ? cloud : "" } alt=''/>
                    <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                    <p  className='climate'>{data.weather[0].description}</p>
                    
                   
                </div>: ""
             }
        </div>
    </div>
  )
}

export default Myweather