$(function() {
  console.log('hello');
    var width = 600,
    height = 500;
     
    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
     
    var color = d3.scale.category20();
     
    // 地理座標から画面表示への投影法の設定。
    var mercator = d3.geo.mercator()
        .center([136.0,35.6])
        .translate([width/2, height/2])
        .scale(800);
     
    // geojsonからpath要素を作るための設定。
    var geopath = d3.geo.path()
    .projection(mercator);
     
    // topojsonファイルの読み込み
    d3.json("/assets/japan_topojson.json", function(error, jp) {
        // console.log(jp);
        
        // topojsonからgeojsonへの変換。
        var geoJp = topojson.feature(jp, jp.objects.ne_10m_admin_1_states_provinces);
        console.log(geoJp);
        
        svg.selectAll("path")
            .data(geoJp.features) // geojsonのすべての県の座標データを読み込む。
          .enter().append("path")
            .attr("class", function(d) { return d.id; })
            .attr("d", geopath) // geojsonからpath要素に変換する。
            .attr("fill", function(d){ return color(d.geometry.coordinates); }); // idがないので、各県の座標リストに基づいて色を変える。
    });
});
