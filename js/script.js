(function () {
    let weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Minsk,by&units=metric&APPID=11946a85ee67815615487da027c7e9d1';
    let divFiveDays = document.querySelector(".fiveDays");
    let pCityClass = document.querySelector(".cityClass");
    let pDateClass = document.querySelector(".dateClass");
    let divIconActual= document.querySelector(".iconActual");
    let divTempActual= document.querySelector(".tempActual");
    let date = '', dateActual = '', icon = '', iconActual = '', temp = '', tempActual = '', city = '', country = '';
    function makeRequest(url) {
        return fetch(url).then(function (response) {
             return response.json();
         })
     } 
     function showIcon(icon, elem){
        const imgIcon = document.createElement('img');
        imgIcon.src = 'http://openweathermap.org/img/w/' + icon + '.png';
        elem.appendChild(imgIcon);
        } 
    function getWeather(Url) {
    makeRequest(Url).then(function(items) {
        const ul = document.createElement('ul');
        divFiveDays.appendChild(ul);
        ul.style.listStyleType = 'none';
        ul.style.textAlign = 'center';
        for (var i = 0; i < items.list.length; i+=8) {
            date = items.list[i].dt_txt;
            icon = items.list[i].weather[0].icon;
            temp = items.list[i].main.temp;
            dateActual = items.list[0].dt_txt;
            iconActual = items.list[0].weather[0].icon;
            tempActual = items.list[0].main.temp; 
            const liDate = document.createElement('li');
            liDate.style.color = '#3a2f3c';
            liDate.style.fontSize = '20px';
            ul.appendChild(liDate);
            liDate.appendChild(document.createTextNode(date));
            showIcon(icon, liDate);
            liDate.appendChild(document.createTextNode("   °C  " + temp));
        }
            city = items.city.name;
            country = items.city.country;
            pCityClass.textContent = city + ', ' + country;
            pDateClass.textContent = dateActual;
            showIcon(iconActual, divIconActual);
            const pTemp = document.createElement('p');
            pTemp.textContent = "°C  " + tempActual;
            divTempActual.appendChild(pTemp);
    })}
    getWeather(weatherUrl);
})();