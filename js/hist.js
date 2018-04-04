var zplot = $.plot($("#Z"), [{data:[], label:"", color:"#202020"}], {
  lines: {
    show: true, fill: true, lineWidth: 1.0, fillColor: "#B4B400"
  },
  grid: {
    hoverable: true, autoHighlight: false
  },
  axisLabels: {
    show: true
  },
  xaxis: {
    tickDecimals: 0, ticks:[60, 70, 80, 90, 100, 110, 120, 130, 140]
  },
  xaxes: [{
    axisLabel: 'Invariant mass (GeV)'
  }],
  yaxes: [{
    position: 'right',
    axisLabel: 'Events / 5 GeV'
  }]
});

var hplot = $.plot($("#H"), [{data:[], label: "", color:"#202020"}], {
  lines: {
    show: true, fill: true, lineWidth: 1.0, fillColor: "#B4B400"
  },
  grid: {
    hoverable: true, autoHighlight: false
  },
  xaxis: {
    tickDecimals: 0, ticks:[60, 70, 80, 90, 100, 110, 120, 130, 140]
  },
  xaxes: [{
    axisLabel: 'Invariant mass (GeV)'
  }],
  yaxes: [{
    position: 'right',
    axisLabel: 'Events / 5 GeV'
  }]
});

ispy.csv_data = [];

d3.csv("./data/ZH.csv", function(data) {

  ispy.csv_data = data;

});

ispy.Zmasses = [];
ispy.Hmasses = [];

ispy.push_mass = function() {

  var eventN = ispy.event_list[ispy.event_index].split("_")[2];

  var eventD = ispy.csv_data.filter(function(e) {
    return e.Event == eventN;
  });

  if ( eventD[0].Type == 'Zmumu' || eventD[0].Type == 'Zee' ) {
      ispy.Zmasses.push(eventD[0].M);
      ispy.make_hist(ispy.Zmasses, 'Z');
  }

  if ( eventD[0].Type == 'H4l' ) {
      ispy.Hmasses.push(eventD[0].M);
      ispy.make_hist(ispy.Hmasses, 'H');
  }

};

ispy.pull_mass = function() {

  var eventN = ispy.event_list[ispy.event_index+1].split("_")[2];

  var eventD = ispy.csv_data.filter(function(e) {
    return e.Event == eventN;
  });

  if ( eventD[0].Type == 'Zmumu' || eventD[0].Type == 'Zee' ) {
      ispy.Zmasses.pop();
      ispy.make_hist(ispy.Zmasses, 'Z');
  }

  if ( eventD[0].Type == 'H4l' ) {
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

    zplot.setData([{data:output, label:"", color:"#202020"}]);
    zplot.setupGrid();
    zplot.draw();
  }

  if ( type == 'H' ) {

    hplot.setData([{data:output, label:"", color:"#202020"}]);
    hplot.setupGrid();
    hplot.draw();

  }

};
