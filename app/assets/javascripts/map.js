$(function() {
  var width  = 900,
      height = 1000;

  var svg = d3.select("body")
    .append("svg")
    .attr({
      "width": width,
      "height": height
    });

  var circle = d3.select("body")
    .append("svg")
    .attr({
      "width": width,
      "height": height
    });

  circle.append("circle")
    .attr("cx",500)
    .attr("cy",-300)
    .attr("r",20)
    .attr("fill","green")
    .attr("stroke-width",3)
    .attr("stroke","orange");


  var color = d3.scale.category20();

  // 地理座標から画面表示への投影法の設定。
  var mercator = d3.geo.mercator()
    .center([136.0,35.6])
    .translate([width/2, height/2])
    .scale(1600);

  // geojsonからpath要素を作るための設定。
  var geopath = d3.geo.path()
    .projection(mercator);

  // topojsonファイルの読み込み

  var g = svg.append("g");

  d3.json("/assets/japan_topojson.json", function(error, jp) {
    // console.log(jp);



    // topojsonからgeojsonへの変換。
    var geoJp = topojson.feature(jp, jp.objects.ne_10m_admin_1_states_provinces);
    // console.log(geoJp.features);

    var positions = [];

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
          positions.push(centroid);
        }) // geojsonからpath要素に変換する。
        .attr("fill", "#FFFFFF")
        .attr("stroke", "#A9A9A9")
        // idがないので、各県の座標リストに基づいて色を変える。

    for (var i = 0; i < positions.length; i ++) {
      g.append("circle")
        .style("fill", "red")
        .attr("transform", function(d) {
          var centroid = positions[i];
          console.log(centroid);
          return "translate(" + centroid +")";
        })
        .attr({
          "cx": 0,
          "cy": 0,
          "r": 7
        });
    }

    for (var i = 0; i < positions.length; i ++) {
      g.append("circle")
        .style("fill", "blue")
        .attr("transform", function(d) {
          var centroid = [positions[i][0] + 7, positions[i][1] + 7];
          console.log(centroid);
          return "translate(" + centroid +")";
        })
        .attr({
          "cx": 0,
          "cy": 0,
          "r": 7
        });
    }

    console.log(positions);

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
