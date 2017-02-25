$(function() {
  var width  = 900,
      height = 1000;

  var svg = d3.select("body")
    .append("svg")
    .attr({
      "width": width,
      "height": height
    });

  // 地理座標から画面表示への投影法の設定。
  var mercator = d3.geo.mercator()
    .center([136.0,35.6])
    .translate([width/2, height/2])
    .scale(1600);

  // geojsonからpath要素を作るための設定。
  var geopath = d3.geo.path()
    .projection(mercator);

  var g = svg.append("g");

  // topojsonファイルの読み込み
  d3.json("/assets/japan_topojson.json", function(error, jp) {

    // topojsonからgeojsonへの変換。
    var geoJp = topojson.feature(jp, jp.objects.ne_10m_admin_1_states_provinces);

    var centroids = [];

    g.append("g")
      .selectAll("path")
        .data(geoJp.features) // geojsonのすべての県の座標データを読み込む。
        .enter().append("path")
        .attr("class", function(d) {
          return d.id;
        })
        .attr("d", geopath)
        .attr("centroid", function(d) {
          var centroid = geopath.centroid(d);
          centroids.push(centroid);
        }) // geojsonからpath要素に変換する。
        .attr("fill", "#FFFFFF")
        .attr("stroke", "#A9A9A9")

    for (var i = 0; i < centroids.length; i ++) {
      g.append("circle")
        .style("fill", "red")
        .attr("transform", function(d) {
          var centroid = centroids[i];
          return "translate(" + centroid +")";
        })
        .attr({
          "cx": 0,
          "cy": 0,
          "r": 7
        });
    }

    for (var i = 0; i < centroids.length; i ++) {
      g.append("circle")
        .style("fill", "blue")
        .attr("transform", function(d) {
          var centroid = [centroids[i][0] + 7, centroids[i][1] + 7];
          return "translate(" + centroid +")";
        })
        .attr({
          "cx": 0,
          "cy": 0,
          "r": 7
        });
    }
  });

  function ajax(){
    return $.ajax('/api/data.json', {
      method: 'GET',
      dataType: 'json',
    });
  }
  ajax().done(function(result) {
    console.log(result);
  }).fail(function(result) {
    console.log('error');
  });
});
