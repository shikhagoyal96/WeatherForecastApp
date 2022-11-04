const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const key = "5a8ba79eb07b46ada95d4cf05f228370";
var currentSelectedCity = "";

function getWeatherReport(selectedCity) {
    $.ajax({
        url: URL,
        type: "GET",
        data: { "key": key, "days": "5", "city": selectedCity },
        success: function (result) {
            if (result && result.data && result.data.length > 0) {
                var data = result.data;
                var weatherrow = $('#weatherinfo');
                $(".col").remove();
                for (var i = 0; i < data.length; i++) {
                    var weatherDate = new Date(data[i].valid_date);
                    var weatherDay = weekday[weatherDate.getDay()];
                    var weatherShortDate = weatherDate.toLocaleString('default', { month: 'short', day: 'numeric' });
                    $('<div>', { class: 'col' }).append(
                        $('<div>', { class: '', title: 'WeatherDay' })
                            .append('<h6>' + weatherDay + '</h6>')
                            .append('<p>' + weatherShortDate + '<p>')
                            .append('<img src="./assets/icons/' + data[i].weather.icon + '.png" />')
                            .append('<p>' + data[i].temp + "&deg;C" + '<p>')

                    ).appendTo(weatherrow);
                }
            } else { console.log("Empty result from API"); }
        },
        error: function (error) {
            console.log(`Error ${error}`)
        },

    });
}

$(document).ready(function () {
    var cities = ["Toronto", "Vancouver", "Calgary", "Seattle", "Montreal", "Miami"];
    var cityList = document.querySelector('#city');
    cityList.add(new Option(cities[0], cities[0], true), undefined);
    var selectedCity = cities[0];
    currentSelectedCity = selectedCity;
    for (var i = 1; i < cities.length; i++) {
        const option = new Option(cities[i], cities[i]);
        cityList.add(option, undefined);
    }
    getWeatherReport(selectedCity);

    $('.apply').click(function () {
        var selectedCity = $('#city').find(":selected").val();
        if(currentSelectedCity !== selectedCity) {
            getWeatherReport(selectedCity);
        }
    });

});