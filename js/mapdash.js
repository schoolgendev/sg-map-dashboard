// Google map object
var map;
// Colours for the map markers x 100
var colors;
// Marker for center of nz
var centerNZ;
// Page controller object
var pc;

// called on completing google maps API. The launch point for any other function.
function main() {
    colors = [
'#6dfdcf','#6cfbc8','#6cf9c1','#6bf7ba','#6af5b3','#68f3ac','#67f1a5','#66ee9e','#64ec97','#62ea90','#60e889','#5ee682','#5ce47b','#5ae273','#58e06c','#55de65','#52dc5d','#4fda55','#4cd84d','#49d645','#45d43c','#41d232','#3dd027','#38ce19','#33cc00', '#42ce00','#4fd100','#5ad300','#65d500','#6ed700','#77da00','#80dc00','#88de00','#91e000','#99e200','#a1e500','#a8e700','#b0e900','#b7eb00','#bfed00','#c6ef00','#cdf100','#d4f300','#dcf500','#e3f700','#eaf900','#f1fb00','#f8fd00','#ffff00', '#fffb00','#fff700','#fff300','#ffee00','#ffea00','#ffe600','#ffe200','#ffde00','#ffda00','#ffd500','#ffd100','#ffcd00','#ffc900','#ffc500','#ffc000','#ffbc00','#ffb800','#ffb300','#ffaf00','#ffab00','#ffa600','#ffa200','#ff9d00','#ff9900', '#ff9600','#ff9200','#ff8f00','#ff8b00','#ff8800','#ff8400','#ff8000','#ff7d00','#ff7900','#ff7500','#ff7100','#ff6d00','#ff6900','#ff6500','#ff6100','#ff5c00','#ff5700','#ff5300','#ff4d00','#ff4800','#ff4200','#ff3c00','#ff3500','#ff2d00','#ff2400','#ff1700','#ff0000'
    ];
    centerNZ = {
        lat: -41.0,
        lng: 172.8333
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: centerNZ
    });

    // TODO: set up a matrix div

    pc = new PageController();

    // make JSON request for:
    // - data for the matrix
    // - data for the efficiency map
    pc.initMap();
    pc.initMatrix();


}

function PageController() {
    /* Makes data request and initializes data layer for the map */
    this.initMap = function initMap() {
            // make call for efficiency data
            d3.json('http://api.schoolgen.co.nz/schools/', effFeedCallback)
                // throw it on the map div
        }
        /* Makes data request for the efficiency matrix */
    this.initMatrix = function initMatrix() {
        // make call for matrix data
        // throw data onto the matrix
    }
}

function effFeedCallback(results) {
    results.forEach(dataToMapHandler);
    setHandlers();
    setMapStyle();

    function dataToMapHandler(v, i, a) {
        map.data.add(newFeature(v));
    }

    function newFeature(v) {
        var mapFeature = new google.maps.Data.Feature({
            geometry: {
                lat: v.Lat,
                lng: v.Lng,
            },
            id: v.ID,
            properties: {
                perf: v.Perf,
                name: v.Name
            }
        });
        return mapFeature;
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
    }

    /* Handler for data on the map */
    function markerHandler(event) {
        var ft = event.feature;
        document.getElementById('schoolInfo').innerText =
            ft.getId() + " - " + ft.getProperty('name') + ": " + ft.getProperty('perf') + '%';
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
        strokeWeight: .5
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
