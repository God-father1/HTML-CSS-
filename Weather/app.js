
/*


function getWeatherWithLocation() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
  
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "5000d707896849b1ad8dc06292d650b7";
  
    location.innerHTML = "Locating...";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=imperial";
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let temp = data.main.temp;
          temperature.innerHTML = temp + "° F";
          location.innerHTML =
            data.name + " (" + latitude + "°, " + longitude + "°)";
          description.innerHTML = data.weather[0].main;
        });
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }
  

-->
  

*/


function convert_unix(time){				// This will convert EPOCH time or Unix time into Human readable time
	var date = new Date(time*1000);
	var day = "0"+date.getDate();
	var mon = date.getMonth();
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var yr = date.getFullYear();
	var hours = date.getHours();
	var min = "0"+date.getMinutes();
	return day.substr(-2)+"-"+months[mon]+"-"+yr+", "+hours+":"+min.substr(-2);
}


function cityW(){
var city = document.getElementById("search").value;

let api="http://api.openweathermap.org/data/2.5/weather?q=";
let apikey="5000d707896849b1ad8dc06292d650b7";
let url=api+city+"&units=metric&apikey="+apikey;
//console.log(url);
var request = new XMLHttpRequest();
request.open('GET',url);
request.onload = function(){
 var obj = JSON.parse(this.response);
 if (request.status >= 200 && request.status < 400) {
 var lat = obj.coord.lat;
 var lon = obj.coord.lon;
 var weathEr = obj.weather[0].main;
 var temp = obj.main.temp;
 var pressure = obj.main.pressure;
 var humidity = obj.main.humidity;
 var country =obj.sys.country;
 var sunr = obj.sys.sunrise;
 sunr=convert_unix(sunr);
 var suns = obj.sys.sunset;
 suns=convert_unix(suns);
 var name= obj.name;
 var tdate = obj.dt;
 tdate=convert_unix(tdate);
 console.log(tdate);
 flagOfcountry(country);
 document.getElementById("total").className = "visible";
 document.getElementById("country").innerHTML="COUNTRY - "+ country;
 document.getElementById("city").innerHTML=name.toUpperCase();
 document.getElementById("info").innerHTML=tdate + "<br><br>" + "Temperature (C) : " + temp ;
 document.getElementById("sunr").innerHTML=sunr.toUpperCase();
 document.getElementById("suns").innerHTML=suns.toUpperCase();
 document.getElementById("p&h").innerHTML="Pressure, Humidity : "+ pressure +" , "+humidity;
 document.getElementById("weather").innerHTML=weathEr.toUpperCase();
 document.getElementById("sunrp").src='https://source.unsplash.com/300x300/?sun';
 document.getElementById("sunsp").src='https://source.unsplash.com/300x300/?sunset';
 document.getElementById("wp").src='https://source.unsplash.com/300x300/?'+weathEr;
 document.getElementById("hpp").src='https://3.bp.blogspot.com/-G7ujG9ITdPg/Thl52SP2FBI/AAAAAAAAAc0/syssaNlyBcM/s400/heat.gif';

 document.getElementById("search").value="";

 }
 else{
  console.log("The city doesn't exist! Kindly check");
 }
}
request.send();

}

function flagOfcountry(country){
  document.getElementById("flag").className = "inline float-right";
  document.getElementById("flag").style = "height: 64px; width:64px";

    document.getElementById("flag").src = "https://www.countryflags.io/"+country+"/shiny/64.png";
}

