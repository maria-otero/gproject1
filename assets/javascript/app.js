var cardIdx = 0;
var cityInput, activityInput, distanceInput, starInput;

//DYNAMICALLY EMBEDDING MAPS
$('#add-city-button').on('click', function(event) {
    event.preventDefault();
    $("header").slideUp(400);
    //FORMATTING USERINPUT
    cityInput = $('#add-city').val().charAt(0).toUpperCase() + $('#add-city').val().substr(1).toLowerCase();
    // $('#add-city').val('');
    activityInput = $('#add-item').val();
    // $('#add-item').val('');
    distanceInput = $('#distanceSelector').val();
    switch(distanceInput) { //CONVERTING MILES TO METERS
        case '2.5 miles':
            distanceInput = '4000';
            break;
        case '5 miles':
            distanceInput = '8000';
            break;
        case '7.5 miles':
            distanceInput = '12000';
            break;
        case '10 miles':
            distanceInput = '16000';
            break;
        case '12.5 miles':
            distanceInput = '20000';
            break;
        case '15 miles':
            distanceInput = '24000';
            break;
    }

    //CREATING CARD
    generateCard();

    var locLat, locLng;
    $.ajax({//LOOKING UP CITY LAT/LONG
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${cityInput}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`,
        method: 'GET'
    }).then(function(response) {
        centerLat = response.results[0].geometry.location.lat;
        centerLng = response.results[0].geometry.location.lng;
        initMap(centerLat, centerLng);
    })
    cardIdx++;
})

function initMap(centerLat, centerLng) {//CREATING MAP
    var map;
    var centerLatlng = { lat: centerLat, lng: centerLng };
    map = new google.maps.Map(document.getElementById('newMap'), {
        zoom: 12,
        center: centerLatlng
    });
    switch(distanceInput) { //SETTING MAP ZOOM
        case '4000':
            map.zoom = 11;
            break;
        case '8000':
            map.zoom = 10;
            break;
        case '12000':
            map.zoom = 9;
            break;
        case '16000':
            map.zoom = 9;
            break;
        case '20000':
            map.zoom = 8;
            break;
        case '24000':
            map.zoom = 8;
            break;
    }

    $('#newMap').attr('id', 'map' + cardIdx)
    var queryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo&radius=${distanceInput}&keyword=${activityInput}&location=${centerLat},${centerLng}`
    $.ajax({//SEARCHING FOR MATCHES NEAR CENTER
        url: queryURL,
        method: 'GET'
    }).then(function(response) {//PLACING MARKERS
        
        //sorting function
        response.results.sort(function(a, b) {
            return a.rating - b.rating;
        })
        var sortedArr = response.results.slice(0, 5);

        var markerArr = [];

        for (let idx=0; idx<sortedArr.length; idx++){
            var markerLatLng = {lat: sortedArr[idx].geometry.location.lat, lng: sortedArr[idx].geometry.location.lng};

            markerArr[idx] = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: sortedArr[idx].name,
                cardCreationIdx: cardIdx-1,
                placeId: sortedArr[idx].place_id
            });
            markerArr[idx].addListener('click', function() {//MARKER CLICK LISTENING
                $(`#accommodation-name${this.cardCreationIdx}`).text(sortedArr[idx].name);
                $(`#rating-id${this.cardCreationIdx}`).text(sortedArr[idx].rating);
                var photoDetailIdx = this.cardCreationIdx;
                $.ajax({//GETTING PLACE DETAILS AND PHOTOREFS
                    method: 'GET',
                    url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.placeId}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`
                }).then (function(snapshot){
                    console.log(snapshot);
                    for (var photoIdx = 0; photoIdx < 10; photoIdx++) {
                        var photoReference = snapshot.result.photos[photoIdx].photo_reference;
                        var photoQueryURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${photoReference}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`;
                        $(`#img-accommodation-${photoIdx}-${photoDetailIdx}`).attr("src", photoQueryURL);
                    };
                });

            });
            // markerArr[idx].addListener("mouseover", function() {
            //     var contentString = `<h1>${sortedArr[idx].name}</h1>`
            //     var infowindow = new google.maps.Infowindow({
            //         content: contentString
            //     });
            //     infowindow.open(contentString);
            // })
        };
    });
};

// Dynamically creating a new card function
function generateCard() {
    var newCard = $(`
    <div class="container">

        <div class="row">
            <div class="col-md-3 no-left-padding ">
                <div class="card border-primary mb-3" style="max-width: 18rem;">

                    <div class="card-header city-name">    
                        <i class="far fa-map"></i>
                        <span id="city-name">${cityInput}.</span>
                        <span id='activity-name'>${activityInput}</span>
                    </div>
                        <div class="card-body text-primary">
                        <div class='map' id="newMap"></div>
                    </div>
                </div>
            </div>

            <div class="col-md-9 no-left-padding">
                <div class="card margin-bottom">
                    <div class="card-header">
                        <i class="fas fa-map-pin"></i>
                        <span id="nameOfActivity">Delete this Title</span><span id="addressOfActivity">Delete this address: 123 Whaling Way, Long Beach, California 90803</span>
                    </div>  

                    <div class="row">
                        <div class="col-md-4">
                            <div class="cardInside">
                                <div id="carouselExampleControls${cardIdx}" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item carouImages active">
                                            <img id="img-accommodation-0-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-1.jpeg" alt="First slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-1-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-2.jpeg" alt="Second slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-2-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-3-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-4-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-5-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-6-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-7-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-8-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-9-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#carouselExampleControls${cardIdx}" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                     </a>
                                    <a class="carousel-control-next" href="#carouselExampleControls${cardIdx}" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2 top-padding">
                            <div class="cardInside">
                                <p>Type: <span id="typeOfPlace"></span></p>
                                <p>Price: <span id="priceOfPlace"></span></p>
                                <p>Ratng: <span id="ratingOfPlace"></span></p>
                            </div>
                        </div>

                        <div class="col-md-6 top-padding">
                            <div class="cardInside">
                                <p>Reviewer: <span id="reviewer1"></span></p>
                                <p>Rated: <span id="reviewerRated"></span></p>
                                <p><span id="reviewResult"></span></p>
                            </div>
                        </div>
                        </div>

                    </div>  
                    



                    <div class="card margin-bottom">
                    <div class="card-header">
                        <i class="fas fa-map-pin"></i>
                        <span id="nameOfActivity">Delete this Title</span><span id="addressOfActivity">Delete this address: 123 Whaling Way, Long Beach, California 90803</span>
                    </div>  
                    <div class="row">
                        <div class="col-md-4">
                            <div class="cardInside">
                                <div id="carouselExampleControls${cardIdx}" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item carouImages active">
                                            <img id="img-accommodation-0-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-1.jpeg" alt="First slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-1-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-2.jpeg" alt="Second slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-2-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-3-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-4-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-5-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-6-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-7-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-8-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-9-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#carouselExampleControls${cardIdx}" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                     </a>
                                    <a class="carousel-control-next" href="#carouselExampleControls${cardIdx}" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2 top-padding">
                            <div class="cardInside">
                                <p>Type: <span id="typeOfPlace"></span></p>
                                <p>Price: <span id="priceOfPlace"></span></p>
                                <p>Ratng: <span id="ratingOfPlace"></span></p>
                            </div>
                        </div>

                        <div class="col-md-6 top-padding">
                            <div class="cardInside">
                                <p>Reviewer: <span id="reviewer1"></span></p>
                                <p>Rated: <span id="reviewerRated"></span></p>
                                <p><span id="reviewResult"></span></p>
                            </div>
                        </div>
                        </div>

                    </div>  


                    <div class="card margin-bottom">
                    <div class="card-header">
                        <i class="fas fa-map-pin"></i>
                        <span id="nameOfActivity">Delete this Title</span><span id="addressOfActivity">Delete this address: 123 Whaling Way, Long Beach, California 90803</span>
                    </div>  
                    <div class="row">
                        <div class="col-md-4">
                            <div class="cardInside">
                                <div id="carouselExampleControls${cardIdx}" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item carouImages active">
                                            <img id="img-accommodation-0-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-1.jpeg" alt="First slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-1-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-2.jpeg" alt="Second slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-2-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-3-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-4-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-5-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-6-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-7-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-8-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                        <div class="carousel-item carouImages">
                                            <img id="img-accommodation-9-${cardIdx}" class="d-block w-100" src="gproject1/assets/img/hotel-3.jpeg" alt="Third slide">
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#carouselExampleControls${cardIdx}" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                     </a>
                                    <a class="carousel-control-next" href="#carouselExampleControls${cardIdx}" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2 top-padding">
                            <div class="cardInside">
                                <p>Type: <span id="typeOfPlace"></span></p>
                                <p>Price: <span id="priceOfPlace"></span></p>
                                <p>Ratng: <span id="ratingOfPlace"></span></p>
                            </div>
                        </div>

                        <div class="col-md-6 top-padding">
                            <div class="cardInside">
                                <p>Reviewer: <span id="reviewer1"></span></p>
                                <p>Rated: <span id="reviewerRated"></span></p>
                                <p><span id="reviewResult"></span></p>
                            </div>
                        </div>
                        </div>

                    </div>  



                    
                </div>
            </div>
            

        </div>
    </div>
`);

    $('#bodyRow').append(newCard);
}





///////////////////////////////////////// Weather Page2 ////////////////////////////////////

// API Key 36e67cbc7819b260cde6008d38c27bdf  works
// https://home.openweathermap.org/api_keys
// Other API Key b8149193e64f315d8b0f4e9a79a3f3bc doen't work as 3AM
// https://www.youtube.com/watch?v=4UoUqnjUC2c
// Other API Key 001b0f58045147663b1ea518d34d88b4 works

// When I click the search icon or hit enter after
// typing a city in the search field, call the 
// getWeather and getForecast functions.
$('#submitWeather').click(getWeather);
//document.querySelector('#submitWeather').addEventlistener('click', getWeather);
$('#submitWeather').click(getForecast);
$("#city").keyup(function(hitKey) {
    if (hitKey.keyCode == "") {
        $("#submitWeather").click();
    }
});



function getWeather() {
    var inputString = document.getElementById('city').value;
    loadWeather(inputString);
}

// function to call the API with the city in the input field
// API Key 36e67cbc7819b260cde6008d38c27bdf
function loadWeather(searchString) {
    var requestString = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchString +
        "&units=imperial&APPID=001b0f58045147663b1ea518d34d88b4";
    //console.log(requestString) enter city placeholder
    $.getJSON(requestString, processAPIResults);
}

// function to post current weather info

function processAPIResults(data) {
    if (data.name !== undefined) {

        // This part of the function shows Today's data in the top      
        // to round the temp to a whole number and show the rest of
        // of the weather info in the current weather section
        // var roundedTemp = Math.round(data.main.temp);
        // $('#showTemp').html(roundedTemp);
        $('.deg').html("&deg");
        $('.f').html("F");
        // $('#showMain').html(data.weather[0].main);
        // $('#humidity').html(data.weather[0].main);
        // $('#name').html(data.weather[0].main);
        // console.log(data.weather.main);
    } else if (data.name == undefined) {
        console.log(data.name);
        $("#error").html('City Could Not Be Located');
    }
}

// function to call the API with the city in the input field

function getForecast() {
    var inputString = document.getElementById('city').value;
    loadForecast(inputString);
}

// function to call the forecast API with the city in the
// input field

function loadForecast(searchString) {
    var requestString = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' +
        searchString +
        "&units=imperial&APPID=001b0f58045147663b1ea518d34d88b4";
    console.log(requestString);
    $.getJSON(requestString, processForecastResults);
}

var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var day = new Date().getDay();

// function to post all the forecast info
function processForecastResults(data) {
    if (data.city.name !== undefined) {

        $('.day-name').text(function(i) {

            return dayNames[(day + +i) % dayNames.length];
        });

    }

    // $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");



    //day 1 weather icon
    var iconCodeOne = data.list[1].weather[0].icon;
    var iconUrlOne = "http://openweathermap.org/img/w/" + iconCodeOne + ".png";
    $("#iconOne").html("<img src='" + iconUrlOne + "'>" + data.list[1].weather[0].main);
    //day 2 weather icon
    var iconCodeTwo = data.list[2].weather[0].icon;
    var iconUrlTwo = "http://openweathermap.org/img/w/" + iconCodeTwo + ".png";
    $("#iconTwo").html("<img src='" + iconUrlTwo + "'>" + data.list[1].weather[0].main);
    //day 3 weather icon
    var iconCodeThree = data.list[3].weather[0].icon;
    var iconUrlThree = "http://openweathermap.org/img/w/" + iconCodeThree + ".png";
    $("#iconThree").html("<img src='" + iconUrlThree + "'>" + data.list[1].weather[0].main);
    //day 4 weather icon
    var iconCodeFour = data.list[4].weather[0].icon;
    var iconUrlFour = "http://openweathermap.org/img/w/" + iconCodeFour + ".png";
    $("#iconFour").html("<img src='" + iconUrlFour + "'>" + data.list[1].weather[0].main);
    //day 5 weather icon
    var iconCodeFive = data.list[5].weather[0].icon;
    var iconUrlFive = "http://openweathermap.org/img/w/" + iconCodeFive + ".png";
    $("#iconFive").html("<img src='" + iconUrlFive + "'>" + data.list[1].weather[0].main);

    //day 5 weather icon
    var iconCodeSix = data.list[6].weather[0].icon;
    var iconUrlSix = "http://openweathermap.org/img/w/" + iconCodeSix + ".png";
    $("#iconSix").html("<img src='" + iconUrlSix + "'>" + data.list[1].weather[0].main);



    //forecast temp highs
    $('#dayOneMax').html(Math.round(data.list[1].temp.max));
    $('#dayTwoMax').html(Math.round(data.list[2].temp.max));
    $('#dayThreeMax').html(Math.round(data.list[3].temp.max));
    $('#dayFourMax').html(Math.round(data.list[4].temp.max));
    $('#dayFiveMax').html(Math.round(data.list[5].temp.max));
    $('#daySixMax').html(Math.round(data.list[6].temp.max));
    // forecast temp lows
    $('#dayOneMin').html(Math.round(data.list[1].temp.min));
    $('#dayTwoMin').html(Math.round(data.list[2].temp.min));
    $('#dayThreeMin').html(Math.round(data.list[3].temp.min));
    $('#dayFourMin').html(Math.round(data.list[4].temp.min));
    $('#dayFiveMin').html(Math.round(data.list[5].temp.min));
    $('#daySixMin').html(Math.round(data.list[6].temp.min));
}