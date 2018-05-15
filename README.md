# Foodie Finds Food

## Overview

Created with foodies in mind, this tool provides comparison between all the top rated restaurants in the user's search parameters. Users are presented with 3 different search parameters: city, cuisine, and distance. Users fill in all the parameters and the tool generates a map with markers containing the top 5 restaurants based on cuisine. Increasing the search radius will include more searches, but will always display the top 5 restaurants only. The current weather will be displayed under the map as well. Once the list has been generated, users can see all the pertinent information on each restaurant, as well as pictures provided by Google Photoreference. Users can indicate if they are interested in a restaurant, which stores the data in Firebase. Doing so will increase the popularity of a restaurant based on user input. 

* * *
![Foodie Finds Food](#)

## Process

- The user is given a set of instructions at the top of the screen.
- Users input their city, desired cuisine, and radius of search.
    - By default, radius of search is 2.5 miles.
- Upon search, multiple Google API calls will generate a map with markers, as well as populate a dynamically created card with the top 5 restaurants serving the desired cuisine.
- A weather API will provide temperature and status of the weather by location.
- The newly created card will have more detailed information on each restaurant that was populated including:
    - Name
    - Address
    - Photos
    - Price Range
    - Rating
    - Most recent reviewer
    - What rating that reviewer gave
- Users can click on the (INTERESTED) button, that will increase a counter linked to a google Firebase, then ping back the "popularity" of the restaurant

## Techonologies

### API's

- Google Maps API - [googlemaps API](https://developers.google.com/maps/documentation/javascript/tutorial)
- Google Geocoding API - [googlegeocoding API](https://developers.google.com/maps/documentation/geocoding/start)
- Google Places API - [googleplaces API](https://developers.google.com/places/web-service/intro)
- Openweathermap - [openweathermap API](https://openweathermap.org/api)

### CDN Used

- Bootstrap v4.1.0 - [getbootstrap](https://getbootstrap.com/)
- jQuery v3.3.1 (uncompressed) - [jQuery core](https://code.jquery.com/)
- FontAwesome v4.7 - [font awesome](https://fontawesome.com/get-started)
- Google Fonts - [googlefonts](https://fonts.google.com/)


### Applications

- Adobe Photoshop v15.0.0 - [adobe photoshop](https://www.adobe.com/products/photoshopfamily.html)
- Adobe Illustrator v19.2.0 - [adobe illustrator](https://www.adobe.com/products/illustrator.html)

### Database

- Firebase 5.0.1 - [Google Firebase](https://firebase.google.com/)