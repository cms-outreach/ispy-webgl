var draw_histogram = function(data, id, xmin, xmax, nbins) {

  console.log(data);

  var margin = {top: 5, right: 10, bottom: 30, left: 10};
  var svg = d3.select("svg"+id);

  var width = 350 - margin.left - margin.right;
  var height = 250 - margin.top - margin.bottom;

  var x = d3.scaleLinear().domain([xmin, xmax]).range([0, width]);
  var h = d3.histogram().domain(x.domain()).thresholds(x.ticks(nbins))(data);
  var y = d3.scaleLinear().range([height, 0]);

  var area = d3.area()
  .curve(d3.curveStepAfter)
  .x(function(d, i) { return x(i)+xmax+10; })
  .y0(y(0))
  .y1(y);

  var line = d3.line()
  .curve(d3.curveStepAfter)
  .x(function(d, i) { return x(i)+xmax+10; })
  .y(y);

  var hist = svg.append("g")
  .attr("class", "histogram")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bins = [];

  console.log(h);

  for ( var i = 0; i < h.length; i++ ) {
    bins[i] = h[i].length;
  }

  y.domain([0, d3.max(bins)]);

  var hist_area = hist.selectAll(id + " > .histogram-area")
  .data([bins])
  .enter().append("path")
  .attr("class", "histogram-area");

  hist_area.attr("d", area);

  var hist_line = hist.selectAll(id + " > .histogram-line")
  .data([bins])
  .enter().append("path")
  .attr("class", "histogram-line");

  hist_line.attr("d", line);

  hist.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

}

var build_histogram = function(data) {

  var xmin = 50;
  var xmax = 150;
  var nbins = 50;

  var x = d3.scaleLinear().domain([xmin, xmax]);
  var h = d3.histogram().domain(x.domain()).thresholds(x.ticks(nbins))(data.map(function(d) {return d['M'];}));

  var output = [];

  for ( var i = 0; i < h.length; i++ ) {
      output.push([h[i].x0, 0]);
      output.push([h[i].x0, h[i].length]);
      output.push([h[i].x1, h[i].length]);
      output.push([h[i].x1, 0]);
  }

  return output;

};

/*
d3.csv("./data/test.csv", function(data) {
  //draw_histogram(data.map(function(d) {return d['M'];}), "#Z", 50, 150, 100);

  var options = {
    lines: {show: true, fill: true, lineWidth: 1.0, fillColor: "#B4B400"},
    grid: {hoverable: true, autoHighlight: false},
    xaxis: {tickDecimals: 0, ticks:[60, 70, 80, 90, 100, 110, 120, 130, 140]},
    yaxis: {}
  };

  //var plot = $.plot($("#Z"), [{data:build_histogram(data), label:"Z", color:"#202020"}], options);
  //plot.setupGrid();
  //plot.draw();

});
*/

var zplot = $.plot($("#Z"), [{data:[], label:"Z", color:"#202020"}], {
  lines: {show: true, fill: true, lineWidth: 1.0, fillColor: "#B4B400"},
  grid: {hoverable: true, autoHighlight: false},
  xaxis: {tickDecimals: 0, ticks:[60, 70, 80, 90, 100, 110, 120, 130, 140]},
  yaxis: {}
});

var hplot = $.plot($("#H"), [{data:[], label: "H", color:"#202020"}], {
  lines: {show: true, fill: true, lineWidth: 1.0, fillColor: "#B4B400"},
  grid: {hoverable: true, autoHighlight: false},
  xaxis: {tickDecimals: 0, ticks:[60, 70, 80, 90, 100, 110, 120, 130, 140]},
  yaxis: {}
});

ispy.csv_data = [];
ispy.H_data = [];

d3.csv("./data/test.csv", function(data) {

  ispy.csv_data = data;
  //ispy.make_hist(data.map(function(d) {return d['M'];}));

});

ispy.Zmasses = [];
ispy.Hmasses = [];

ispy.get_mass = function(pp) {

  var eventN = ispy.event_list[ispy.event_index].split("_")[2];

  var eventD = ispy.csv_data.filter(function(e) {
    return e.Event == eventN;
  });

  console.log(eventN, eventD[0].Event, eventD[0].M);

  if ( eventD[0].Type == 'Zmumu' ) {

    if ( pp == 1 )
      ispy.Zmasses.push(eventD[0].M);
    if ( pp == -1 )
      ispy.Zmasses.pop();

    ispy.make_hist(ispy.Zmasses, 'Z');

  }

  if ( eventD[0].Type == 'H4l' ) {

    if ( pp == 1 )
      ispy.Hmasses.push(eventD[0].M);
    if ( pp == -1 )
      ispy.Hmasses.pop();

    ispy.make_hist(ispy.Hmasses, 'H');

  }

};

ispy.make_hist = function(data, type) {

  var xmin = 50;
  var xmax = 150;
  var nbins = 50;

  var x = d3.scaleLinear().domain([xmin, xmax]);
  var h = d3.histogram().domain(x.domain()).thresholds(x.ticks(nbins))(data);

  var output = [];

  for ( var i = 0; i < h.length; i++ ) {
      output.push([h[i].x0, 0]);
      output.push([h[i].x0, h[i].length]);
      output.push([h[i].x1, h[i].length]);
      output.push([h[i].x1, 0]);
    }

  if ( type == 'Z' ) {

    zplot.setData([{data:output, label:"Z", color:"#202020"}]);
    zplot.setupGrid();
    zplot.draw();
  }

  if ( type == 'H' ) {

  hplot.setData([{data:output, label:"H", color:"#202020"}]);
  hplot.setupGrid();
  hplot.draw();

}

};

/*
d3.csv("./data/4mu_2011.csv", function(data) {
  //draw_histogram(data.map(function(d) {return d['M'];}), "#H", 50, 150, 100);

  var options = {
    lines: {show: true, fill: true, lineWidth: 1.0, fillColor: "#b4b400"},
    grid: {hoverable: true, autoHighlight: false},
    xaxis: {tickDecimals: 0, ticks:[60, 70, 80, 90, 100, 110, 120, 130, 140]},
    yaxis: {}
  };

  //console.log(output);

  var plot = $.plot($("#H"), [{data:build_histogram(data), label:"H", color: "#202020"}], options);
  plot.setupGrid();
  plot.draw();

});
*/
