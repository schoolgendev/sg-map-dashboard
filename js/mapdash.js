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
    /*schools = [
        {
            node: 127,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Westlake Girls High School"
        },

        {
            node: 128,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Northcote College"
        },

        {
            node: 129,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Greenhithe Primary School"
        },

        {
            node: 130,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Tirimoana Primary School"
        },

        {
            node: 132,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Silverdale Primary School"
        },

        {
            node: 134,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Henderson Valley Primary School"
        },

        {
            node: 135,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Glendowie College"
        },

        {
            node: 136,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Fairfield College"
        },

        {
            node: 138,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Vardon Primary School"
        },

        {
            node: 139,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Forest Lake Primary School, Hamilton"
        },

        {
            node: 141,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Paul's Collegiate"
        },

        {
            node: 142,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Peter Chanel Catholic School"
        },

        {
            node: 143,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Hamilton Girls High School"
        },

        {
            node: 144,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Maeroa Intermediate"
        },

        {
            node: 145,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Raglan Area School"
        },

        {
            node: 147,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Te Kowhai School"
        },

        {
            node: 148,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Mercury Bay Area School"
        },

        {
            node: 155,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Raphael House, Rudolf Steiner School"
        },

        {
            node: 156,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Eastern Hutt School"
        },

        {
            node: 157,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Wadestown School"
        },

        {
            node: 158,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Paraparaumu College"
        },

        {
            node: 159,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Muritai School"
        },

        {
            node: 160,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Napier Intermediate School"
        },

        {
            node: 161,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Douglas Park School"
        },

        {
            node: 162,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Clifton Terrace Model School"
        },

        {
            node: 163,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Paremata School"
        },

        {
            node: 164,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Plateau School"
        },

        {
            node: 168,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Pukehou School"
        },

        {
            node: 170,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Hastings Intermediate School"
        },

        {
            node: 201,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Aokautere School"
        },

        {
            node: 202,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Awahou School"
        },

        {
            node: 203,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Hokowhitu School"
        },

        {
            node: 204,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Kimbolton School"
        },

        {
            node: 205,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Mount Biggs School"
        },

        {
            node: 206,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Newbury School"
        },

        {
            node: 207,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Anthony's Primary - Primary Array"
        },

        {
            node: 208,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Johns Hill School"
        },

        {
            node: 1639,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Lake Tekapo School"
        },

        {
            node: 1640,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Middleton Grange School"
        },

        {
            node: 1643,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Banks Avenue School"
        },

        {
            node: 1644,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Sumner School"
        },

        {
            node: 1650,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Mangakahia Area School"
        },

        {
            node: 1653,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "James Street School"
        },

        {
            node: 1654,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Stanley Bay School"
        },

        {
            node: 1655,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Anthony's Primary - Secondary Array "
        },

        {
            node: 1656,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Te Kura O Waikaremoana"
        },

        {
            node: 1657,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Takapuna Normal Intermediate A"
        },

        {
            node: 1658,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "May Road School"
        },

        {
            node: 1660,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Temuka Primary School"
        },

        {
            node: 1661,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Te Aro School"
        },

        {
            node: 1662,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Clifton Terrace Model School"
        },

        {
            node: 1663,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Amesbury School"
        },

        {
            node: 1665,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Bayswater Primary School"
        },

        {
            node: 1666,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Northland School"
        },

        {
            node: 1667,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Newlands Intermediate School"
        },

        {
            node: 1669,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Hampton Hill School"
        },

        {
            node: 1670,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Thorndon Primary School"
        },

        {
            node: 1671,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Paparangi School"
        },

        {
            node: 1672,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Ridgway School"
        },

        {
            node: 1673,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Geraldine Primary School"
        },

        {
            node: 1677,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Vauxhall School"
        },

        {
            node: 1678,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Owhiro Bay School"
        },

        {
            node: 1679,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Churton Park"
        },

        {
            node: 1680,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Brooklyn Primary School"
        },

        {
            node: 1681,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Houghton Valley School"
        },

        {
            node: 1682,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Birkdale Intermediate School- 4kW"
        },

        {
            node: 1683,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Remuera Intermediate School"
        },

        {
            node: 1684,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Wesley Intermediate School"
        },

        {
            node: 1685,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Belmont Primary School"
        },

        {
            node: 1687,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Winchester Rural School"
        },

        {
            node: 1688,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Joseph's School - Temuka"
        },

        {
            node: 1689,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Woodbury School"
        },

        {
            node: 1690,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Russell School"
        },

        {
            node: 1691,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Anthony’s School, Seatoun"
        },

        {
            node: 1692,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Arowhenua Maori School"
        },

        {
            node: 1693,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Milford School"
        },

        {
            node: 1694,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Takapuna Normal Intermediate B"
        },

        {
            node: 1695,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Benedicts"
        },

        {
            node: 1697,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Matangi School"
        },

        {
            node: 1698,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Rawhiti Primary"
        },

        {
            node: 1699,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "West Rolleston Primary"
        },

        {
            node: 1700,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Te Rakaumanga, Huntly"
        },

        {
            node: 1701,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Lincoln Primary"
        },

        {
            node: 1703,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "St Leo Primary"
        },

        {
            node: 1704,
            imgURL: "img/placeholder-01.jpg",
            URL: "",
            name: "Otonga Primary"
        }];*/
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
