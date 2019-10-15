window.addEventListener('load', ()=>{
   let long;
   let lat;
   let temperatureDescription = document.querySelector(".temperature-description");
   let temperatureDegree = document.querySelector(".temperature-degree");
   let locationTimezone = document.querySelector(".location-timezone");
   let temperatureSection = document.querySelector('.temperature');
   const temperatureSpan = document.querySelector('.temperature span')

   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude;
         lat = position.coords.latitude;

         const proxy = "https://cors-anywhere.herokuapp.com/";
         const api = `${proxy}https://api.darksky.net/forecast/c791ceed436cd34ebcf10b89002f504e/${lat},${long}`;

         fetch(api)
            .then(response => {
               return response.json();
            })
            .then(data => {
               console.log(data);
               const { temperature, summary, icon } = data.currently;

               //Set data element DOM dari pemanggilan API
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               locationTimezone.textContent = data.timezone;
               //set and replace icon 
               setIcons(icon, document.querySelector('.icon'));

               //secara default menampilkan fahrenheit
               //seting ini untuk menggunakan celcius
               let celcius = (temperature - 32) * (5 / 9);

               temperatureSection.addEventListener('click', () =>{
                  if(temperatureSpan.textContent === "F"){
                     temperatureSpan.textContent = "C";
                     temperatureDegree.textContent = Math.floor(celcius);
                  }else{
                     temperatureSpan.textContent = "F";
                     temperatureDegree.textContent = temperature;
                  }
               })
            })
      });

   }else{
      h1.textContent = "Something Getting wrong, try again later !";
   }

   function setIcons(icon, iconID){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
   }
})