var map;        // Google map object
var colors;     // Colours for the map markers x 100
var schoolImgs; // pictures for different schools
var centerNZ;   // Marker for center of nz
var pc;         // Page controller object

// called on completing google maps API. The launch point for any other function.
function main() {
    colors = [
        '#6dfdcf', '#6cfbc8', '#6cf9c1', '#6bf7ba', '#6af5b3',
        '#68f3ac', '#67f1a5', '#66ee9e', '#64ec97', '#62ea90',
        '#60e889', '#5ee682', '#5ce47b', '#5ae273', '#58e06c',
        '#55de65', '#52dc5d', '#4fda55', '#4cd84d', '#49d645',
        '#45d43c', '#41d232', '#3dd027', '#38ce19', '#33cc00',
        '#42ce00', '#4fd100', '#5ad300', '#65d500', '#6ed700',
        '#77da00', '#80dc00', '#88de00', '#91e000', '#99e200',
        '#a1e500', '#a8e700', '#b0e900', '#b7eb00', '#bfed00',
        '#c6ef00', '#cdf100', '#d4f300', '#dcf500', '#e3f700',
        '#eaf900', '#f1fb00', '#f8fd00', '#ffff00', '#fffb00',
        '#fff700', '#fff300', '#ffee00', '#ffea00', '#ffe600',
        '#ffe200', '#ffde00', '#ffda00', '#ffd500', '#ffd100',
        '#ffcd00', '#ffc900', '#ffc500', '#ffc000', '#ffbc00',
        '#ffb800', '#ffb300', '#ffaf00', '#ffab00', '#ffa600',
        '#ffa200', '#ff9d00', '#ff9900', '#ff9600', '#ff9200',
        '#ff8f00', '#ff8b00', '#ff8800', '#ff8400', '#ff8000',
        '#ff7d00', '#ff7900', '#ff7500', '#ff7100', '#ff6d00',
        '#ff6900', '#ff6500', '#ff6100', '#ff5c00', '#ff5700',
        '#ff5300', '#ff4d00', '#ff4800', '#ff4200', '#ff3c00',
        '#ff3500', '#ff2d00', '#ff2400', '#ff1700', '#ff0000'
    ];
    centerNZ = {
        lat: -41.0,
        lng: 172.8333
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: centerNZ,
        streetViewControl: false,
        styles: [
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          }
        ]
    });

    // TODO: set up a matrix div

    pc = new PageController();

    // make JSON request for:
    // - data for the matrix
    // - data for the efficiency map
    pc.initMap();
}

function PageController() {
    /* Makes data request and initializes data layer for the map */
    this.initMap = function initMap() {
        // first API call to schools
        d3.json('http://api.schoolgen.co.nz/schools/', efficiencyCallback) //efficiency data
    }
    /* Makes data request for the efficiency matrix */
}

function efficiencyCallback(results) {
    results.forEach(dataToMapHandler);
    // second call - data gathering
    d3.csv('data/directiontiltlist.csv', statisticCallback);

    function dataToMapHandler(v, i, a) {
        if (v.Perf === 0) {
            console.log("perf = 0 for " + v.Name);
            return; // this gets rid of grey spots on map
        }
        map.data.add(createFeature(v));

        function createFeature(v) {
            var schoolName, schoolArray;
            var regexKW = / - [0123456789. ]*k[wW]$/
            var matchIndex = v.Name.search(regexKW);
            if (matchIndex != -1) {
                // do the replacements
                schoolName = v.Name.substring(0, matchIndex);
                schoolArray = v.Name.substring(matchIndex + 3);
            } else {
                schoolName = v.Name;
                schoolArray = null;
            }
            // enter a new map feature
            var mapFeature = new google.maps.Data.Feature({
                geometry: {
                    lat: v.Lat,
                    lng: v.Lng,
                },
                id: v.ID,
                properties: {
                    perf: v.Perf,
                    name: schoolName,
                    array: schoolArray
                }
            });
            return mapFeature;
        }
    }
}
function statisticCallback(results){
    // final handler
    results.forEach(directionalToMapHandler)
    setHandlers();
    setMapStyle();
    configTop10();

    function directionalToMapHandler(v, i, a){
        // assume all features already in map
        var nodeId = +v.ID;
        var ft = map.data.getFeatureById(nodeId);
        if (ft === undefined){
            return;
        }
        ft.setProperty('altitude', v.Altitude);
        ft.setProperty('azimuth', v.Azimuth);
    }
}

function setMapStyle() {
    map.data.setStyle(function (feature) {
        var performance = feature.getProperty('perf');
        if (performance <= 0 || performance > 100) {
            console.warn("Irregular reading: " + feature.getProperty('name') + ": " + performance + '%')
        }
        return {
            icon: getCircle(performance)
        };
    });
}

function setHandlers() {
    map.data.addListener('click', markerHandler);

    function markerHandler(event) {
        var ft = event.feature;
        focusSchool(ft);
    }
}

function configTop10() {
    console.log("config top 10")
    var featureArray = [];
    var ff = new FunctionFactory();
    // put in array
    map.data.forEach(function getTop10(ft) {
        featureArray.push(ft);
    });
    // sort array
    featureArray.sort(function comparator(ft1, ft2) {
        return ft2.getProperty("perf") - ft1.getProperty("perf");
    });
    // for the top 10 in the array:
    for (var i = 1; i <= 10; i++) {
        // throw elements onto the table
        var elem = document.getElementById('top-10-' + i)
        var ft = featureArray[i - 1];
        ftName = ft.getProperty("name");
        ftPerf = ft.getProperty("perf");
        if (ftPerf > 100) {
            ftPerf = 100;
        }
        elem.innerText = ftName + ": " + ftPerf;
        // set handlers on list items
        // get id, zoom to marker with id
        elem.onclick = ff.getFunction(ft);
    }
    focusSchool(featureArray[0]); // default focus on first school


    function FunctionFactory () {
        this.getFunction = function getFunction (ft) {
            return function () {
                // get ft latlng
                map.setCenter({
                    lat: ft.getGeometry().get().lat(),
                    lng: ft.getGeometry().get().lng()
                });
                map.setZoom(13);
                focusSchool(ft);
            }
        }
    }

}

function focusSchool(ft) {
    document.getElementById('map-info-ph').style.display = "none";  // kill placeholder
    console.log("ID clicked: " + ft.getId());                       // get id
    replacePanelText(ft);                                           // replace all text
    document.getElementById('info-div').style.display = "flex";     // show new div

    function replacePanelText (ft) {
        // set school name
        document.getElementById('school-name').innerText = ft.getProperty('name');
        // set school img
        setSchoolImg(ft.getId());
        // set array size
        if (ft.getProperty('array') === null) {
            document.getElementById('array-size').style.display = "none";
        } else {
            document.getElementById('array-size').style.display = "block"
            document.getElementById('school-array').innerText = ft.getProperty('array');
        }
        // set performance
        var perf = ft.getProperty('perf');
        if (perf > 100) {
            document.getElementById('school-eff').innerText = "100+%";
        } else {
            document.getElementById('school-eff').innerText = perf + '%'
        }
        document.getElementById('direction').innerText = ft.getProperty('azimuth');
        document.getElementById('tilt').innerText = ft.getProperty('altitude');
    }
    function setSchoolImg(nodeId) {
        document.getElementById('school-img').src = "img/school-01.jpg";
    }
}

/* getCircle returns a circle who's color is determined by the magnitude */
function getCircle(magnitude) {

    var CircUtil = new ColorUtil();

    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: CircUtil.getCircleColor(magnitude),
        fillOpacity: CircUtil.getCircleOpacity(magnitude),
        scale: 10,
        strokeColor: 'white',
        strokeWeight: .5,
        zIndex: magnitude
    };
}

function ColorUtil() {
    this.getCircleColor =
        function getCircleColor(x) {
            x = Math.trunc(x);
            if (x === 0) {
                return '#666666';
            }
            if (x > 100) {
                return '#ff0000'
            }
            return colors[x];
        }

    this.getCircleOpacity = function getCircleOpacity(x) {
        x = Math.trunc(x);
        if (x < 1 || x > 100) {
            return 0.2;
        }
        return 0.8;
    }
}
