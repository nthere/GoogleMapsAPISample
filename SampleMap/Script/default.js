﻿// global variables
var LocalHostName = 'localhost/SampleMap';
var PublicHostName = 'googlemapsdemo.azurewebsites.net';

var InfoWindow = new google.maps.InfoWindow();
var MessageWindow;
var iconKebap = "Icon/kebabIcon_32x32.png";
var iconNew = "Icon/newRecord_32x32.png";
var iconHome = "Icon/home_32x32.png";
var heatMapData = [
    new google.maps.LatLng(39.529106, 28.583154),
    new google.maps.LatLng(39.629106, 28.583154),
    new google.maps.LatLng(39.729106, 28.683154),
    new google.maps.LatLng(39.571462, 28.841333),
    new google.maps.LatLng(39.660325, 29.319238),
    new google.maps.LatLng(39.333936, 29.868555),
    new google.maps.LatLng(38.650833, 29.714746),
    new google.maps.LatLng(38.805106, 29.516992),
    new google.maps.LatLng(39.685693, 28.660059),
    new google.maps.LatLng(39.673010, 28.747949),
    new google.maps.LatLng(39.683010, 28.647949),
    new google.maps.LatLng(39.684010, 28.645949),
    new google.maps.LatLng(38.914039, 27.960239),
    new google.maps.LatLng(38.814039, 27.960239),
    new google.maps.LatLng(38.714039, 27.960239),
    new google.maps.LatLng(38.614039, 27.960239),
    new google.maps.LatLng(38.914039, 28.260239),
    new google.maps.LatLng(38.814039, 28.260239),
    new google.maps.LatLng(38.714039, 28.260239),
    new google.maps.LatLng(38.614039, 28.260239),
    new google.maps.LatLng(38.814039, 28.060139),
    new google.maps.LatLng(38.718039, 28.128239),
];

$(document).ready(function () {
    $('#searchLocationBtn').click(onSubmitButtonClick);

    google.maps.event.addDomListener(window, "load", initialize);


});


// TODO : Saving User Added Form Data https://developers.google.com/maps/documentation/javascript/info-windows-to-db
// TODO : Combining Data feature incelenecek https://developers.google.com/maps/documentation/javascript/combining-data
// TODO : GroundOverlay super bir seye benziyor, bak buna
// HeatMap &libraries=visualization

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(38.535276, 35.040894),
        zoom: 7,
        disableDefaultUI: true,
        zoomControl: true,
        panControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        overviewMapControl: true
    };

    var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    window.map = map; // set map as a property of window object, will be accessable global
    var initialCenter = mapOptions.center;
    var initialZoom = mapOptions.zoom;

    //addPolyline(map);
    //addCircle(map);
    //addRectangle(map);
    addMarker();
    addPolygon(map);
    addKmlLayer(map);
    addGeoJSONDataLayer(map);
    setInputForm();
    addMarkerClusterer();
    //addGoToInitialExtent(map, initialCenter, initialZoom);

    var pointArray = new google.maps.MVCArray(heatMapData);
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });
    heatmap.setMap(map);

    google.maps.event.addListener(map, "click", function () {
        InfoWindow.close();
    });

}

function addMarker() {

    var centerMarker = new google.maps.Marker({
        icon: iconKebap,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(36.76811, 35.458997),
        map: window.map,
        title: "Capital Of Kebab"
    });

    var contentString = '<div id="content" style="width:350px; height:300px;">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id=firstHeading" class="firstHeading">The Capital of Kebab - Adana</h1>' +
        '<div id="bodyContent">' +
        '<p>The <b>Capital of Kebab</b> is located in the south of Turkey.' +
        'It takes one hour flight from Istanbul</p>' +
        '<img src="http://cdn.kilissultanradyo.com/wp-content/uploads/2015/11/kebap.jpg" height="200px" width="350px" />' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });

    google.maps.event.addListener(centerMarker, 'click', function () {
        infowindow.open(window.map, centerMarker);
    });
    google.maps.event.addListener(window.map, 'click', function () {
        infowindow.close();
    });
    centerMarker.setMap(window.map);
}

function addPolyline(map) {
    var pathCoordinates = [
        new google.maps.LatLng(41.030272, 29.121061),
        new google.maps.LatLng(40.997406, 29.120333),
        new google.maps.LatLng(40.983759, 29.203896),
        new google.maps.LatLng(40.956977, 29.222754),
        new google.maps.LatLng(40.930021, 29.206533),
        new google.maps.LatLng(40.906242, 29.210858),
        new google.maps.LatLng(40.888516, 29.238013),
        new google.maps.LatLng(40.893589, 29.244121)
    ];

    var pathToCenter = new google.maps.Polyline({
        path: pathCoordinates,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    pathToCenter.setMap(map);
}

function addPolygon(map) {
    var interlandCoors = [
        new google.maps.LatLng(41.040307, 28.940870),
        new google.maps.LatLng(41.034456, 28.938114),
        new google.maps.LatLng(41.019441, 28.923519),
        new google.maps.LatLng(40.988860, 28.919333), // southeast corner
        new google.maps.LatLng(41.001957, 28.936991),
        new google.maps.LatLng(41.001495, 28.945973),
        new google.maps.LatLng(41.003883, 28.955670),
        new google.maps.LatLng(41.002342, 28.979452),
        new google.maps.LatLng(41.009506, 28.986903),
        new google.maps.LatLng(41.017361, 28.985883),
        new google.maps.LatLng(41.018209, 28.971491),
        new google.maps.LatLng(41.037998, 28.945157)
    ];

    var erzurumBoundaries = [
new google.maps.LatLng(40.02341, 40.30334),
new google.maps.LatLng(40.00658, 40.42969),
new google.maps.LatLng(40.06126, 40.52856),
new google.maps.LatLng(40.10749, 40.64392),
new google.maps.LatLng(40.15789, 40.70984),
new google.maps.LatLng(40.20634, 40.71512),
new google.maps.LatLng(40.33604, 40.55324),
new google.maps.LatLng(40.37584, 40.5835),
new google.maps.LatLng(40.46541, 40.55676),
new google.maps.LatLng(40.52981, 40.60387),
new google.maps.LatLng(40.59727, 40.7373),
new google.maps.LatLng(40.6639, 40.92407),
new google.maps.LatLng(40.82628, 41.15479),
new google.maps.LatLng(40.76806, 41.25366),
new google.maps.LatLng(40.73352, 41.34485),
new google.maps.LatLng(40.63897, 41.31409),
new google.maps.LatLng(40.56807, 41.3855),
new google.maps.LatLng(40.65564, 41.5448),
new google.maps.LatLng(40.70949, 41.59943),
new google.maps.LatLng(40.69313, 41.69861),
new google.maps.LatLng(40.65147, 41.77551),
new google.maps.LatLng(40.6848, 41.82495),
new google.maps.LatLng(40.82072, 41.87388),
new google.maps.LatLng(40.86117, 41.85374),
new google.maps.LatLng(40.96331, 42.00073),
new google.maps.LatLng(40.95501, 42.1106),
new google.maps.LatLng(40.91766, 42.31384),
new google.maps.LatLng(40.82212, 42.38525),
new google.maps.LatLng(40.78886, 42.5061),
new google.maps.LatLng(40.72681, 42.56618),
new google.maps.LatLng(40.65981, 42.56653),
new google.maps.LatLng(40.54303, 42.53906),
new google.maps.LatLng(40.4344, 42.5116),
new google.maps.LatLng(40.39258, 42.45117),
new google.maps.LatLng(40.34236, 42.33032),
new google.maps.LatLng(40.28372, 42.14905),
new google.maps.LatLng(40.22922, 42.19849),
new google.maps.LatLng(40.12429, 42.41272),
new google.maps.LatLng(39.94765, 42.56653),
new google.maps.LatLng(39.86796, 42.39157),
new google.maps.LatLng(39.82577, 42.3036),
new google.maps.LatLng(39.77477, 42.3468),
new google.maps.LatLng(39.69028, 42.45117),
new google.maps.LatLng(39.65108, 42.50994),
new google.maps.LatLng(39.60992, 42.5116),
new google.maps.LatLng(39.51713, 42.40628),
new google.maps.LatLng(39.42076, 42.20719),
new google.maps.LatLng(39.35979, 42.19849),
new google.maps.LatLng(39.3003, 42.16003),
new google.maps.LatLng(39.28369, 42.08494),
new google.maps.LatLng(39.24927, 42.03918),
new google.maps.LatLng(39.19436, 41.90832),
new google.maps.LatLng(39.16865, 41.67346),
new google.maps.LatLng(39.34704, 41.35254),
new google.maps.LatLng(39.35129, 41.17676),
new google.maps.LatLng(39.45561, 40.99855),
new google.maps.LatLng(39.46153, 40.89949),
new google.maps.LatLng(39.41049, 40.77462),
new google.maps.LatLng(39.41073, 40.66315),
new google.maps.LatLng(39.45538, 40.60284),
new google.maps.LatLng(39.61475, 40.66804),
new google.maps.LatLng(39.74078, 40.5688),
new google.maps.LatLng(39.86658, 40.5245),
new google.maps.LatLng(39.94083, 40.28758),
new google.maps.LatLng(40.02341, 40.30334)
    ];

    var interlandArea = new google.maps.Polygon({
        path: erzurumBoundaries,
        strokeColor: "red",
        strokeOpacity: 0.7,
        strokeWeight: 0.7,
        fillColor: "#6afbff",
        fillOpacity: 0.3
    });

    interlandArea.setMap(map);
}

function addCircle(map) {
    var circle = new google.maps.Circle({
        center: new google.maps.LatLng(41.031927, 29.112089),
        fillColor: "black",
        fillOpacity: 0.6,
        strokeColor: "white",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        radius: 1000,
        map: map
    });
}

function addRectangle(map) {
    var rectangle = new google.maps.Rectangle({
        bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(41.029264, 29.095723),
            new google.maps.LatLng(41.031927, 29.112089)
        ),
        fillColor: "black",
        fillOpacity: 0.6,
        strokeColor: "white",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map
    });
}

function addKmlLayer(map) {

    var interlandLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/70378149/Interland01.kml',
        preserveViewport: true
    });
    interlandLayer.setMap(map);

    /* to Remove KmlLayer */
    //kmlLayer.setMap(null);
    //kmlLayer = null;
}

function addGeoJSONDataLayer(map) {
    map.data.loadGeoJson('http://' + PublicHostName + '/Json/branches.json');

    // show infowindow
    map.data.addListener('click', function (event) {
        var contentString =
            '<div id="content" style="width:300px; height:250px;">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id=firstHeading" class="firstHeading">' + event.feature.getProperty("name") + '</h1>' +
                '<div id="bodyContent">' +
                '<p>Address Information Here </p>' +
                '<p>' + event.feature.getProperty("city") + '</p>' +
                '<img src="' + event.feature.getProperty("theme") + '" alt="' + event.feature.getProperty("name") + '" width="300px" height="130px" />' +
                '</div>' +
                '</div>';


        //var myHtml = event.feature.getProperty("name");
        //InfoWindow.setContent("<div style='width:150px;'>" + myHtml + "</div>");

        InfoWindow.setContent(contentString);
        // position the infowindow on the marker
        InfoWindow.setPosition(event.feature.getGeometry().get());
        // anchor the infowindow on the marker
        InfoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
        InfoWindow.open(map);
    });

    map.data.setStyle(function (feature) {
        return { icon: feature.getProperty('icon'), title: feature.getProperty('name') };
    });
}

function addGoToInitialExtent(map, initialCenter, initialZoom) {
    google.maps.event.addListener(map, 'rightclick', function () {
        map.setCenter(initialCenter);
        map.setZoom(initialZoom);
    });
}

function saveNewPosition(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    var addPositionMarker = new google.maps.Marker({
        icon: iconHome,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: "Add New Position"
    });
    addPositionMarker.addListener('click', function () {
        if (addPositionMarker.getAnimation() !== null) {
            addPositionMarker.setAnimation(null);
        } else {
            addPositionMarker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });

    addPositionMarker.setMap(window.map);

    //var contentString = '<div id="content">' +
    //    '<div id="siteNotice">' +
    //    '</div>' +
    //    '<h1 id=firstHeading" class="firstHeading">Clicked location info</h1>' +
    //    '<div id="bodyContent">' +
    //    '<p>Lat : ' + lat + '; Lng: ' + lng +
    //    '</p></br>' +
    //    '<button type="button">Update</button>'+
    //    '</div>' +
    //    '</div>';

    //var infowindow = new google.maps.InfoWindow({
    //    content: contentString
    //});
    //infowindow.setMap(window.map);

    // populate yor box/field with lat, lng
    //alert("Lat=" + lat + "; Lng=" + lng);

}

function pinAddressLocation(lat, lng) {

    var addressMarker = new google.maps.Marker({
        icon: iconNew,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat, lng),
        map: window.map,
        title: "Address Search Result"
    });

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id=searchHeading" class="searchHeading">Search Result</h1>' +
        '<div id="bodyContent">' +
        '<p><b>GeoCoding Search Result</b> ' +
        '</p>' +
        '</div>' +
        '</div>';

    var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    })

    google.maps.event.addListener(addressMarker, 'click', function () {
        infoWindow.open(window.map, addressMarker);
    });

    addressMarker.setMap(window.map);
}

function getLatLong(address) {
    var geocoder = new google.maps.Geocoder();
    var location;
    geocoder.geocode({ 'address': address, 'region': 'tr' }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            location = results[0].geometry.location;
            if (location) {
                pinAddressLocation(location.lat(), location.lng());
            }
        } else {
            var msg = "Unable to find address: " + status;
            $('#warningLbl').text(msg);
        }
    });
}

function getAddressFromLatLng(latlng) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            alert(results[0].formatted_address)
        } else {
            var msg = "Unable to find address: " + status;
            alert(msg);
            //$('#warningLbl').text(msg);
        }
    });
}

function setInputForm() {

    InfoWindow = new google.maps.InfoWindow({
        content: document.getElementById('form')
    })

    MessageWindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'rightclick', function (event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: window.map,
            icon: iconNew
        });

        google.maps.event.addListener(marker, 'click', function () {
            InfoWindow.open(window.map, marker);
        });
    });
}

function saveData() {
    var name = escape(document.getElementById('name').value);
    var address = escape(document.getElementById('address').value);
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
    var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
              '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

    var result = 'name : ' + name + '\r\n'
                + 'surname : ' + address + '\r\n'
                + 'type : ' + type + '\r\n'
                + 'latitude : ' + latlng.lat() + '\r\n'
                + 'longitude : ' + latlng.lng();

    alert(result);

    getAddressFromLatLng(latlng)

    //downloadUrl(url, function (data, responseCode) {

    //    if (responseCode == 200 && data.length <= 1) {
    //        infowindow.close();
    //        messagewindow.open(map, marker);
    //    }
    //});
}

function addMarkerClusterer() {
    //var map = new google.maps.Map(document.getElementById('mapDiv'), {
    //    zoom: 3,
    //    center: { lat: -28.024, lng: 140.887 }
    //});

    var locations = [
        new google.maps.LatLng(40.002520, 38.059819),
        new google.maps.LatLng(39.703109, 36.955693),
        new google.maps.LatLng(39.705222, 37.032597),
        new google.maps.LatLng(39.264307, 37.320988),
        new google.maps.LatLng(38.755000, 35.766044),
        new google.maps.LatLng(38.837802, 35.530466),
        new google.maps.LatLng(38.657675, 35.414987),
        new google.maps.LatLng(38.390254, 35.572039),
        new google.maps.LatLng(37.969057, 34.620487),
        new google.maps.LatLng(37.983621, 34.809874),
        new google.maps.LatLng(38.335926, 31.451729),
        new google.maps.LatLng(37.867024, 32.366327),
        new google.maps.LatLng(37.823252, 32.574190),
        new google.maps.LatLng(36.968217, 32.592666)
    ];
    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var markers = locations.map(function (item, i) {
        return new google.maps.Marker({
            position: item,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(window.map, markers,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}

function onSubmitButtonClick() {
    $('#warningLbl').text('');
    if ($('#addressInput').val() !== '') {
        var address = $('#addressInput').val();

        getLatLong(address);

    } else {
        $('#warningLbl').text('Address Coordinates Not Found !!!');
    }
}
