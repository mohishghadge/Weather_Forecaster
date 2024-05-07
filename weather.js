let cityName = document.querySelector(".location");
let time = document.querySelector(".time");
let weather_logo = document.getElementById("logo");
let weather_temp = document.getElementById("temp");
let w_min = document.getElementById("w_min");
let w_max = document.getElementById("w_max");
let search_btn = document.getElementById("search_btn");


let feelsLike = document.querySelector(".feelsLike");
let Humid = document.querySelector(".Humid");
let Wind = document.querySelector(".Wind");
let Pressure = document.querySelector(".Pressure");


let city_search = document.querySelector(".form-inline")



const  getCountryName=(code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

const getCountryTime = (dt)=>{
   const curDate = new Date(dt * 1000);
   console.log(curDate);

   const options = {
    weekday : "long",
    year:"numeric",
    month:"long",
    day:'numeric',
    hour:"numeric",
    minute:"numeric",
   };

   const formatter  = new Intl.DateTimeFormat("en-US",options);
   console.log(formatter);
   return formatter.format(curDate)
    
}
let city = "pune";

city_search.addEventListener("submit",(e)=>{
    e.preventDefault();

    let  cityName = document.getElementById("search_inp");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();

    cityName.value= '';

});
 
const getWeatherData = async () =>{
    const  apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfe64f108abf6fecd54e611f8b47c8a1`
    try{
        const res = await fetch(apiUrl);
       const data = await  res.json();

       const {main,name,weather,wind,sys,dt} = data;

        
       cityName.innerHTML = `${name},${getCountryName(sys.country)}`
       time.innerHTML = getCountryTime(dt)
       weather_temp.innerHTML = `${main.temp}&#176`;
       w_min.innerHTML = `Min:${main.temp_min.toFixed()}&#176`;
       w_max.innerHTML = `Max:${main.temp_max.toFixed()}&#176`;
       feelsLike.innerHTML =`${ main.humidity.toFixed()}&#176`;
       Humid.innerHTML =`${ main.feels_like.toFixed()}%`;
       Wind.innerHTML = `${wind.speed}m/s`;
       Pressure.innerHTML =`${main.pressure} hPa`;

       search_btn.innerHTML = `${weather[0].main}`
       weather_logo.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`


      
       console.log(data)
    }   

    catch(error){
        console.log(error)
    }

   
}




document.body.addEventListener("load",getWeatherData());