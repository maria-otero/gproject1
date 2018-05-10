//DYNAMICALLY EMBEDDING MAPS
$('#addCity').on('click', function(event) {
    event.preventDefault();
    var mapInput = $('#cityInput').val();
    $('#cityInput').val('');
    var newFrame = $('<iframe>')
    newFrame.attr({
        src: `https://www.google.com/maps/embed/v1/search?key=AIzaSyBEL_ixBbgLQWdqBAVuH5Ibs-WTuYdjhqo&q=hotels+in+${mapInput}`,
        width: '400px',
        height: '400px',
        frameborder: '0',
        style: 'border:0'
    })
    $('#frameBox').append(newFrame);
})

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
