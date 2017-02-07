// Google map object
var map;
// Colours for the map markers x 100
var colors;
// pictures for different schools
var schoolImgs;
// Marker for center of nz
var centerNZ;
// Page controller object
var pc;

// called on completing google maps API. The launch point for any other function.
function main() {
    colors = [
'#6dfdcf', '#6cfbc8', '#6cf9c1', '#6bf7ba', '#6af5b3', '#68f3ac', '#67f1a5', '#66ee9e', '#64ec97', '#62ea90', '#60e889', '#5ee682', '#5ce47b', '#5ae273', '#58e06c', '#55de65', '#52dc5d', '#4fda55', '#4cd84d', '#49d645', '#45d43c', '#41d232', '#3dd027', '#38ce19', '#33cc00', '#42ce00', '#4fd100', '#5ad300', '#65d500', '#6ed700', '#77da00', '#80dc00', '#88de00', '#91e000', '#99e200', '#a1e500', '#a8e700', '#b0e900', '#b7eb00', '#bfed00', '#c6ef00', '#cdf100', '#d4f300', '#dcf500', '#e3f700', '#eaf900', '#f1fb00', '#f8fd00', '#ffff00', '#fffb00', '#fff700', '#fff300', '#ffee00', '#ffea00', '#ffe600', '#ffe200', '#ffde00', '#ffda00', '#ffd500', '#ffd100', '#ffcd00', '#ffc900', '#ffc500', '#ffc000', '#ffbc00', '#ffb800', '#ffb300', '#ffaf00', '#ffab00', '#ffa600', '#ffa200', '#ff9d00', '#ff9900', '#ff9600', '#ff9200', '#ff8f00', '#ff8b00', '#ff8800', '#ff8400', '#ff8000', '#ff7d00', '#ff7900', '#ff7500', '#ff7100', '#ff6d00', '#ff6900', '#ff6500', '#ff6100', '#ff5c00', '#ff5700', '#ff5300', '#ff4d00', '#ff4800', '#ff4200', '#ff3c00', '#ff3500', '#ff2d00', '#ff2400', '#ff1700', '#ff0000'
    ];
    schoolImgs = [
        {
            node: 127
        }
,
        {
            node: 128
        }
,
        {
            node: 129
        }
,
        {
            node: 130
        }
,
        {
            node: 132
        }
,
        {
            node: 134
        }
,
        {
            node: 135
        }
,
        {
            node: 136
        }
,
        {
            node: 138
        }
,
        {
            node: 139
        }
,
        {
            node: 141
        }
,
        {
            node: 142
        }
,
        {
            node: 143
        }
,
        {
            node: 144
        }
,
        {
            node: 145
        }
,
        {
            node: 147
        }
,
        {
            node: 148
        }
,
        {
            node: 155
        }
,
        {
            node: 156
        }
,
        {
            node: 157
        }
,
        {
            node: 158
        }
,
        {
            node: 159
        }
,
        {
            node: 160
        }
,
        {
            node: 161
        }
,
        {
            node: 162
        }
,
        {
            node: 163
        }
,
        {
            node: 164
        }
,
        {
            node: 168
        }
,
        {
            node: 170
        }
,
        {
            node: 201
        }
,
        {
            node: 202
        }
,
        {
            node: 203
        }
,
        {
            node: 204
        }
,
        {
            node: 205
        }
,
        {
            node: 206
        }
,
        {
            node: 207
        }
,
        {
            node: 208
        }
,
        {
            node: 1639
        }
,
        {
            node: 1640
        }
,
        {
            node: 1643
        }
,
        {
            node: 1644
        }
,
        {
            node: 1650
        }
,
        {
            node: 1653
        }
,
        {
            node: 1654
        }
,
        {
            node: 1655
        }
,
        {
            node: 1656
        }
,
        {
            node: 1657
        }
,
        {
            node: 1658
        }
,
        {
            node: 1660
        }
,
        {
            node: 1661
        }
,
        {
            node: 1662
        }
,
        {
            node: 1663
        }
,
        {
            node: 1665
        }
,
        {
            node: 1666
        }
,
        {
            node: 1667
        }
,
        {
            node: 1669
        }
,
        {
            node: 1670
        }
,
        {
            node: 1671
        }
,
        {
            node: 1672
        }
,
        {
            node: 1673
        }
,
        {
            node: 1677
        }
,
        {
            node: 1678
        }
,
        {
            node: 1679
        }
,
        {
            node: 1680
        }
,
        {
            node: 1681
        }
,
        {
            node: 1682
        }
,
        {
            node: 1683
        }
,
        {
            node: 1684
        }
,
        {
            node: 1685
        }
,
        {
            node: 1687
        }
,
        {
            node: 1688
        }
,
        {
            node: 1689
        }
,
        {
            node: 1690
        }
,
        {
            node: 1691
        }
,
        {
            node: 1692
        }
,
        {
            node: 1693
        }
,
        {
            node: 1694
        }
,
        {
            node: 1695
        }
,
        {
            node: 1697
        }
,
        {
            node: 1698
        }
,
        {
            node: 1699
        }
,
        {
            node: 1700
        }
,
        {
            node: 1701
        }
,
        {
            node: 1702
        }
,
        {
            node: 1703
        }
,
        {
            node: 1704
        }]
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
    configTop10();

    function dataToMapHandler(v, i, a) {
        if (v.Perf === 0) {
            console.warn("perf = 0 for " + v.Name);
            return;
        }
        map.data.add(newFeature(v));

        function newFeature(v) {
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
            replaceAllText(ft);
            // display the div
            document.getElementById('info-div').style.display = "flex";

            function replaceAllText(ft) {
                // get rid of placeholder
                document.getElementById('map-info-ph').style.display = "none";
                // node id
                document.getElementById('school-id').innerText =
                    ft.getId();
                // name of school
                document.getElementById('school-name').innerText =
                    ft.getProperty('name');
                // set the src for image
                setSchoolImg(ft.getId());
                // set array size
                if (ft.getProperty('array') === null) {
                    document.getElementById('array-size').style.display = "none";
                } else {
                    document.getElementById('array-size').style.display = "block"
                    document.getElementById('school-array').innerText =
                        ft.getProperty('array');
                }
                // performance of school
                var perf = ft.getProperty('perf');
                if (perf > 100) {
                    document.getElementById('school-eff').innerText =
                        "100+%";
                } else {
                    document.getElementById('school-eff').innerText =
                        perf + '%'
                }
            }

            function setSchoolImg(nodeId) {
                document.getElementById('school-img').src = "img/school-01.jpg";
            }
        }
    }
}

function configTop10() {
    console.log("config top 10")
    var featureArray = [];
    // put in array
    map.data.forEach(function getTop10(feature) {
        featureArray.push(feature);
    });
    // sort array
    featureArray.sort(function comparator(ft1, ft2) {
        return ft2.getProperty("perf") - ft1.getProperty("perf");
    });
    // print array
    for (var i = 1; i <= 10; i++) {
        var ft = featureArray[i - 1];
        ftName = ft.getProperty("name");
        ftPerf = ft.getProperty("perf");
        if (ftPerf > 100) {
            ftPerf = 100;
        }

        document.getElementById('top-10-' + i).innerText =
            ftName + ": " + ftPerf;

        console.log(i + ". " + ft.getProperty("name"));
        console.log("Perf = " + ft.getProperty("perf"));
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
