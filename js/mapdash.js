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
'#ff5922', '#ff5b22', '#ff5d22', '#ff6023', '#ff6123', '#ff6323', '#ff6623', '#ff6724', '#ff6924', '#ff6b24', '#ff6d24', '#ff6f24', '#ff7125', '#ff7125', '#ff7425', '#ff7625', '#ff7726', '#ff7826', '#ff7a26', '#ff7d26', '#ff7e26', '#ff7f27', '#ff8127', '#ff8227', '#ff8527', '#ff8527', '#ff8728', '#ff8828', '#ff8a28', '#ff8c28', '#ff8d29', '#ff8e29', '#ff9129', '#ff9129', '#ff932a', '#ff942a', '#ff962a', '#ff972a', '#ff9a2b', '#ff9a2b', '#ff9d2b', '#ff9e2b', '#ff9f2c', '#ffa02c', '#ffa12c', '#ffa42c', '#ffa52d', '#ffa72d', '#ffa72d', '#ffa92d', '#ffab2e', '#ffab2e', '#ffad2e', '#ffaf2e', '#ffb02f', '#ffb12f', '#ffb32f', '#ffb32f', '#ffb530', '#ffb730', '#ffb830', '#ffba30', '#ffba31', '#ffbc31', '#ffbd31', '#ffbf31', '#ffc032', '#ffc132', '#ffc332', '#ffc332', '#ffc533', '#ffc733', '#ffc833', '#ffc933', '#ffcb34', '#ffcb34', '#ffcd34', '#ffce35', '#ffd035', '#ffd035', '#ffd235', '#ffd436', '#ffd536', '#ffd536', '#ffd636', '#ffd837', '#ffda37', '#ffdb37', '#ffdc38', '#ffde38', '#ffde38', '#ffe038', '#ffe139', '#ffe339', '#ffe339', '#ffe43a', '#ffe63a', '#ffe83a', '#ffe83a', '#ffe93b', '#ffeb3b'
    ];
    centerNZ = {
        lat: -41.5,
        lng: 172.8333
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
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
            //if (feature.getProperty('perf') > 100) {
            console.log(feature.getProperty('name') + ": " + performance + '%')
            console.log(colors[Math.trunc(performance)])
                // }

            return {
                icon: getCircle(performance)
            };
        });
    }
    function setHandlers(){
        map.data.addListener('click', function( event ) {
            console.log("clicked: " + event.feature.getProperty('name'));
        })
    }
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
            return 0.0;
        }
        return 0.8;
    }
}
