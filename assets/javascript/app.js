var cardIdx = 0;

//DYNAMICALLY EMBEDDING MAPS
$('#add-city-button').on('click', function(event) {
    event.preventDefault();
    //FORMATTING USERINPUT
    var userInput = $('#add-city').val().charAt(0).toUpperCase() + $('#add-city').val().substr(1).toLowerCase();
    $('#add-city').val('');
    //CREATING CARD
    generateCard(userInput);

    var locLat, locLng;
    $.ajax ({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`,
        method: 'GET'
    }).then (function(response){
        centerLat = response.results[0].geometry.location.lat;
        centerLng = response.results[0].geometry.location.lng;
        initMap(centerLat, centerLng);
    })
    cardIdx++;
})

function initMap(centerLat, centerLng) {
    var map;
    var centerLatlng = {lat: centerLat, lng: centerLng}; 
        map = new google.maps.Map(document.getElementById('newMap'), {
            zoom: 12,
            center: centerLatlng
    });

    $('#newMap').attr('id','map'+cardIdx)

    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo&radius=1500&keyword=hotel&location=${centerLat},${centerLng}`,
        method: 'GET'
    }).then (function(response){
        var markerArr = [];
        for (let idx=0; idx<response.results.length; idx++){
            // console.log(response.results[idx])
            var markerLatLng = {lat: response.results[idx].geometry.location.lat, lng: response.results[idx].geometry.location.lng};
            markerArr[idx] = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: response.results[idx].name,
                cardCreationIdx: cardIdx-1,
                placeId: response.results[idx].place_id
            });
            var cardDetailIdx = cardIdx;
            markerArr[idx].addListener('click', function() {
                $(`#accommodation-name${this.cardCreationIdx}`).text(response.results[idx].name);
                $(`#rating-id${this.cardCreationIdx}`).text(response.results[idx].rating);
                var photoUrlArr = [];
                $.ajax({
                    method: 'GET',
                    url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.placeId}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`
                }).then (function(snapshot){
                    // console.log(snapshot.result)
                    for (var photoPullIdx = 0; photoPullIdx < 10; photoPullIdx++) {
                        var photoReference = snapshot.result.photos[photoPullIdx].photo_reference;
                        var photoQueryURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${photoReference}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`;
                            photoUrlArr[photoPullIdx] = photoQueryURL;
                    }
                })
                console.log(photoUrlArr)
                for (var photoPushIdx=0; photoPushIdx<photoUrlArr.length; photoPushIdx++) {
                    var img = $("<img>");
                    img.attr("src", photoQueryURL);
                    $(`#img-accommodation-${photoPushIdx}-${this.cardCreationIdx}`).attr("src", photoQueryURL)
                    console.log(photoPushIdx)
                    console.log(this.cardCreationIdx)
                }
            });
        };
    });
};

// Dynamically creating a new card function
function generateCard(city) {
    var newCard = $(`<div id="card1" class="col-md-4"><div class="card"><h5 id="city-name">${city}</h5><div class='map' id="newMap"></div><div class="card-info-box">
    <h4 id="accommodation-name${cardIdx}"></h4>
    <p>Price <span id="price-id${cardIdx}"></span> </p><p>Rating <span id="rating-id${cardIdx}"></span></p><button href="#" class="btn btn-outline-dark">More Info</button>
    </div><div id="carouselExampleControls${cardIdx}" class="carousel slide" data-ride="carousel"><div class="carousel-inner">
    <div class="carousel-item active"><img id="img-accommodation-0-${cardIdx}" class="d-block w-100" src="assets/img/hotel-1.jpeg" alt="First slide"></div>
    <div class="carousel-item"><img id="img-accommodation-1-${cardIdx}" class="d-block w-100" src="assets/img/hotel-2.jpeg" alt="Second slide"></div>
    <div class="carousel-item"><img id="img-accommodation-2-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-3-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-4-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-5-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-6-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-7-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-8-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    <div class="carousel-item"><img id="img-accommodation-9-${cardIdx}" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div>
    </div><a class="carousel-control-prev" href="#carouselExampleControls${cardIdx}" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls${cardIdx}" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div>`);
    

    $('#bodyRow').append(newCard);
}


// $.ajax ({
//     url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo&placeid=ChIJ-ZeDsnLGmoAR238ZdKpqH5I',
//     method: 'GET'
// }).then(function(response){
//     console.log(response)
// })

// $.ajax ({
//     url: `https://maps.googleapis.com/maps/api/geocode/json?address=sacramento&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`,
//     method: 'GET'
// }).then (function (response) {
//     console.log(response);
// })
