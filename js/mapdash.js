var map;        // Google map object variable
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
    // this is a variable for the center of nz, which the map defaults to
    centerNZ = {
        lat: -41.0,
        lng: 172.8333
    };
    // main map object. This builds the actual map,
    // but has no role in getting the data.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: centerNZ,
        streetViewControl: false,
        // these styles change what can be visible on the map.
        // Currently it is set to disable landmark objects, highway signs etc,
        //  while still visualizing their terrain (e.g. geometry.fill and .stroke are both on)
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

    pc = new PageController();

    // this is a call to get the data for the map.
    pc.initMap();
}

function PageController() {
    this.initMap = function initMap() {
        /* So the page actually makes two requests. This is the first request,
        which is a remote request to the schoolgen API for the efficiency data. */
        d3.json('http://api.schoolgen.co.nz/schools/', efficiencyCallback)
    }
}

/* This callback runs when the API request has been completed.
 That is to say, it doesn't run immediately when initMap() gets called.*/
function efficiencyCallback(results) {

    /* So, for each element in the results (i.e. what we got back from the API call),
     we want to run dataToMapHandler. See the Mozilla Developer Network docs
     for Array.prototype.forEach() for more info. */
    results.forEach(dataToMapHandler);

    /* This is the second request, which is a local request for the direction and tilt data. */
    d3.csv('data/directiontiltlist.csv', statisticCallback);

    /* forEach calls a function with three arguments:
    - the value of the element in the array (v)
    - the index of that element (i)
    - and the array itself (a)
    In making a callback function for the forEach function,
    we need to specify each of those three arguments.
    (we can name them whatever we want though). */
    function dataToMapHandler(v, i, a) {
        /* do not add grey nodes (nodes where perf = 0) to the map */
        if (v.Perf === 0) {
            /* log with a warning */
            console.warn("perf = 0 for " + v.Name);
            return;
        }
        /* add everything else to the map */
        map.data.add(createFeature(v));

        /* creates a new Google Map Feature. See https://developers.google.com/maps/documentation/javascript/reference#Data.Feature
        for more info. */
        function createFeature(v) {
            var schoolName,
                schoolArray;
            /* This regex allows us to search for where in a string the " - 2 kWh" in the
             school name occurs.
             This regular expression specifies a part of a string which has " - "
             followed by any number of digits, decimals, or spaces, followed by kwh or kWh,
             followed by an end of string character.*/
            var regexKW = / - [0123456789. ]*k[wW]$/
            /* Search the string for the regex and return the index where it starts... */
            var matchIndex = v.Name.search(regexKW);
            /* If string.prototype.search() can't find it, it returns -1.
             So any case where it doesn't return -1, we want to process as below*/
            if (matchIndex != -1) {
                // take substrings and assign to above variables
                schoolName = v.Name.substring(0, matchIndex);
                schoolArray = v.Name.substring(matchIndex + 3);
            } else {
                // on a failutre to find the string, process as below
                schoolName = v.Name;
                schoolArray = null;
            }
            /* After setting name and array strings, we will
             add a new Feature based on that data. Remember that v is the
             value from the array of results. */
            var mapFeature = new google.maps.Data.Feature({
                /* Geometry is where the feature is located */
                geometry: {
                    lat: v.Lat,
                    lng: v.Lng,
                },
                /* id is a unique identifier for the feature.
                 Here, I am using the nodeID.*/
                id: v.ID,
                /* properties is additional data for the feature.
                 Here, we are storing the performance, name, and array size.
                 Later on, after the second request, we will add azimuth and altitude
                  to the properties object. */
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

/* This callback runs when the second request completes (for the local file holding
 tilt and direction data) */
function statisticCallback(results){
    /* Similar to what happens in the first callback, we call a function on
    every row in the data table.*/
    results.forEach(directionalToMapHandler);
    /* Following this, we render the rest of the page. */
    setHandlers();
    setMapStyle();
    configTop10();

    /* At this point (when we call this method) we can assume all features are in the map.
    So we match up the data from the API and the data in the file using
    the nodeIDs, which I am assuming shouldn't change*/
    function directionalToMapHandler(v, i, a){
        // get the feature
        var nodeId = +v.ID;
        var ft = map.data.getFeatureById(nodeId);
        // if we can't find the feature, stop processing this data point
        if (ft === undefined){
            return;
        }
        // otherwise we add the altitude and azimuth to the feature's properties
        ft.setProperty('altitude', v.Altitude);
        ft.setProperty('azimuth', v.Azimuth);

        // WHEN ALL SCHOOL IMAGES ARE READY, UNCOMMENT THIS LINE
        ft.setProperty('imgURL', v.imgURL);
    }
}

/* This sets a click handler on each circle on the map. */
function setHandlers() {
    map.data.addListener('click', markerHandler);

    function markerHandler(event) {
        var ft = event.feature;
        /* See focusSchool() below to see what this does. */
        focusSchool(ft);
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
    var limit = 10
    var offset = 0;
    // for the top 10 in the array:
    for (var i = 1; i <= limit; i++) {
        // throw elements onto the table
        var elem = document.getElementById('top-10-' + (i - offset));
        var ft = featureArray[i - 1];
        ftName = ft.getProperty("name");
        ftPerf = ft.getProperty("perf");
        if (ftPerf > 100) {
            ftPerf = 100;
            limit ++;
            offset ++;
            continue;
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
        document.getElementById('school-img').src = ft.getProperty("imgURL");
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
            x = Math.floor(x);
            if (x === 0) {
                return '#666666';
            }
            if (x > 100) {
                return '#ff0000'
            }
            return colors[x];
        }

    this.getCircleOpacity = function getCircleOpacity(x) {
        x = Math.floor(x);
        if (x < 1 || x > 100) {
            return 0.2;
        }
        return 0.8;
    }
}
