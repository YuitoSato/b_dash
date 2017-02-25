$(function() {
  var width  = 900,
      height = 1000;

  var svg = d3.select("body")
    .append("svg")
    .attr({
      "width": width,
      "height": height
    });

  var color = d3.scale.category20();

  // 地理座標から画面表示への投影法の設定。
  var mercator = d3.geo.mercator()
    .center([136.0,35.6])
    .translate([width/2, height/2])
    .scale(1600);

  // geojsonからpath要素を作るための設定。
  var geopath = d3.geo.path()
    .projection(mercator);

  console.log(geopath);

  // topojsonファイルの読み込み
  d3.json("/assets/japan_topojson.json", function(error, jp) {
    // console.log(jp);

    // topojsonからgeojsonへの変換。
    var geoJp = topojson.feature(jp, jp.objects.ne_10m_admin_1_states_provinces);
    console.log(geoJp);

    svg.selectAll("path")
      .data(geoJp.features) // geojsonのすべての県の座標データを読み込む。
      .enter().append("path")
      .attr("class", function(d) {
        console.log(d);
        return d.id;
      })
      .attr("d", geopath) // geojsonからpath要素に変換する。
      .attr("fill", "#FFFFFF")
      .attr("stroke", "#A9A9A9");

      // idがないので、各県の座標リストに基づいて色を変える。
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
