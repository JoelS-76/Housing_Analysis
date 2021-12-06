
console.log('my counties',counties)
console.log('my counties',priced_out)

var API_KEY = "pk.eyJ1IjoicGF0cmlja2g0NiIsImEiOiJja3Qwc3FmcGQwOGhyMnJwa3oxMnIzcWQ4In0.KFAi6TSV_E2fc3VQh8yFSA";
var map = L.map('map').setView([38.98, -105.78], 6.5);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


function chooseColor(counties,countylist) {
    if (countylist.includes(counties))return "green";
    else{ return "red"};
}
// console.log('data',data)
// var input = 70000
function user_select(){
    var input=document.getElementById("Income").value
    console.log(input)
    var countyFilter=priced_out.filter(x =>  x.suggest_income <= input )
    var countylist=countyFilter.map(x=>x.county)
    console.log(countylist)
    L.geoJson(counties, {
        style: function(feature) {
        return {
            color: "white",
            // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
            fillColor: chooseColor(feature.properties.county, countylist),
            fillOpacity: 1,
            weight: 1.5
            };
        },
onEachFeature: function(feature, layer) {
    console.log(feature)
    layer.bindPopup("<h4>"+feature.properties.county+"</h4>Recommended Gross Income: " + feature.properties.suggest_income);
          }
    }).addTo(map);
}

L.geoJson(counties).addTo(map);

