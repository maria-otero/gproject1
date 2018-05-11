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
        locLat = response.results[0].geometry.location.lat;
        locLng = response.results[0].geometry.location.lng;
        initMap(locLat, locLng);
    })

    cardIdx++;
    
})

function initMap(myLat, myLng) {
    var myLatlng = {lat: myLat, lng: myLng}; 
        var map = new google.maps.Map(document.getElementById('newMap'), {
            zoom: 10,
            center: myLatlng
    });
    $('#newMap').attr('id','map'+cardIdx)
}

// Dynamically creating a new card function
function generateCard(city) {
    var newCard = $(`<div id="card1" class="card"><div class="card-body"><h5 id="accommodation-name">${city}</h5><div class='map' id="newMap"></div><div class="card-info-box">
    <p>Price: $00.00</p><p>Rating:</p><button href="#" class="btn btn-outline-dark">More Info</button>
    </div><div id="carouselExampleControls${cardIdx}" class="carousel slide" data-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><img id="img-accommodation-1" class="d-block w-100" src="assets/img/hotel-1.jpeg" alt="First slide"></div><div class="carousel-item"><img id="img-accommodation-2" class="d-block w-100" src="assets/img/hotel-2.jpeg" alt="Second slide"></div><div class="carousel-item"><img id="img-accommodation-3" class="d-block w-100" src="assets/img/hotel-3.jpeg" alt="Third slide"></div></div><a class="carousel-control-prev" href="#carouselExampleControls${cardIdx}" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls${cardIdx}" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div></div>`);
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
