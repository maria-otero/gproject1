//DYNAMICALLY EMBEDDING MAPS
$('#add-city-button').on('click', function(event) {
    event.preventDefault();
    var userInput = $('#add-city').val().charAt(0).toUpperCase() + $('#add-city').val().substr(1).toLowerCase();
    $('#add-city').val('');
    generateCard(userInput);
    var newFrame = $('<iframe>')
    newFrame.attr({
        src: `https://www.google.com/maps/embed/v1/search?key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo&q=hotels+in+${userInput}`,
        width: '300em',
        height: '300em',
        frameborder: '0',
        style: 'border:0'
    })
    $(`#mapDiv${cardIdx}`).append(newFrame);
    cardIdx++;
})

var cardIdx = 0;

// Dynamically creating a new card function
function generateCard(city) {
    var newCard = $(`<div id="card${cardIdx}" class="card" style="width: 30%"><div class="card-body"><h6 id="accommodation-name" class="card-title">${city}</h6><div id="mapDiv${cardIdx}"></div><p class="card-text">Price: $00.00</p><p class="card-text">Rating: <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></p><a href="#" class="btn btn-primary">More Info</a><br><br><div id="carouselExampleControls${cardIdx}" class="carousel slide" data-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><img id="img-accommodation-1" class="d-block w-100 rounded" src="assets/img/hotel-1.jpeg" alt="First slide"></div><div class="carousel-item"><img id="img-accommodation-2" class="d-block w-100 rounded" src="assets/img/hotel-2.jpeg" alt="Second slide"></div><div class="carousel-item"><img id="img-accommodation-3" class="d-block w-100 rounded" src="assets/img/hotel-3.jpeg" alt="Third slide"></div></div><a class="carousel-control-prev" href="#carouselExampleControls${cardIdx}" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls${cardIdx}" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div>`);
    $('#bodyRow').append(newCard);
}

// photo api pull function

function callPhoto() {
var photoReference = "CmRaAAAA6z2646XkCoeArns1jXNvuSQbezHOHG2mxDgUuE6iJpVBsKfhAtgt1SEaO57FN0i-t9ejtjSglH6naCUBxuUojIMTFTamUOPuC_LoqtOp7qdQkAItyTcesQAjmiQCBvKeEhC3o-5gQ3t6JeUpVRYf1ODzGhTLY_6L1ydiWry4gsMLxVV86nez0Q"

var photoQueryURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=" + photoReference + "&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo";
  
    var img = $("<img>");
    img.attr("src", photoQueryURL);
   
    $("#img-accommodation-1").attr("src", photoQueryURL)
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

// var map;
// var infowindow;
// function initMap() {
//   var city = {lat: -33.867, lng: 151.195};
//   map = new google.maps.Map(document.getElementById('mapCanvas'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });

// infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch({
//     location: city,
//     radius: 100,
//     type: ['store']
//   }, callback);
// }

// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });
// }

// CONVERTING CITY INPUTS TO COORDS
// $('#addCity1').on('click', function(event) {
//     var cityLat, cityLng;
//     event.preventDefault();
//     var mapInput = $('#cityInput1').val();
//     $('#cityInput1').val('');
//     $.ajax ({
//         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${mapInput}&key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo`,
//         method: 'GET'
//     }).then (function (response) {
//         cityLat = response.results[0].geometry.location.lat;
//         cityLng = response.results[0].geometry.location.lng;
        
//     })
// })
