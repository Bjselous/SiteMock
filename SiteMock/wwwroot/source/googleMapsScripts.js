var map;

var strathpine = { lat: -27.302796, lng: 152.989447};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: strathpine,
        zoom: 18
    });

    var marker = new google.maps.Marker({ position: strathpine, title: "Ahha Wellness Spa", map: map });
}