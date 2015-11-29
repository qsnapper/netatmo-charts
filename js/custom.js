//Easy way to get an average of an array
Array.prototype.average = function () {
var sum = 0, j = 0; 
   for (var i = 0; i < this.length, isFinite(this[i]); i++) { 
          sum += parseFloat(this[i]); ++j; 
    } 
   return j ? sum / j : 0; 
};

var myFirebaseRef = new Firebase("https://netatmo.firebaseio.com/");

//load 'daily_revenue' dataset and create related chart
myFirebaseRef.child("weather").on("value", function(snapshot) {
    data = snapshot.val()
    //console.log(snapshot.val());
    //console.log(data.outdoor[0].value.map(Number));
    
//last week running for both  
    $(function () {
        $('#container_week_running').highcharts({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Temperature Comparson'
            },
            subtitle: {
                text: 'last week running'
            },
            xAxis: [{
                type: 'datetime',
                title: {
                    text: 'Date Time UTC'
                },
                plotLines: data.chart.plotlines  //plot solar noon times
                //plotBands: [{ // mark daylight times
                //    color: '#FCFFC5',
                //    from: Date.UTC(2015, 10, 28, 8, 0, 0),
                //    to: Date.UTC(2015, 10, 28, 17, 33, 0)
                //}]
            }],
            yAxis: { // Primary yAxis
                labels: {
                    format: '{value} ºC'
                },
                title: {
                    text: 'Outdoor Temperature'
                }
            },
            tooltip: {
                shared: true
            },
            series: [{
                name: 'ausias marc',
                type: 'spline',
                pointStart: data.outdoor[0].beg_time * 1000, 
                pointInterval:  1000 * data.outdoor[0].step_time,
                data: data.outdoor[0].value.map(Number),
                tooltip: {
                    valueSuffix: ' ºC'
                }
    
            }, {
                name: 'colinas verdes',
                type: 'spline',
                //lineWidth: 1,
                pointStart: data.outdoor[1].beg_time * 1000,
                pointInterval:  1000 * data.outdoor[1].step_time,
                data: data.outdoor[1].value.map(Number),
                tooltip: {
                    valueSuffix: ' ºC'
                }
            }],
              plotOptions: {
                column: {
                  borderWidth: 0
                  //color: '#b2c831',
                  //shadow: false
                },
                line: {
                  marker: { 
                    enabled: false 
                  },
                  lineWidth: 2
                },
                spline: {
                  marker: { 
                    enabled: false 
                  },
                  lineWidth: 2
                }
              }
        });
    });

//day lengths compared
    var barcelona_day_length = [];
    var barcelona_point_start = null;
    var lagos_day_length = [];
    var lagos_point_start = null;
    $.each(data.sun.Barcelona, function(key, value) {
        barcelona_day_length.push(Math.round(value.day_length/60));
        if (barcelona_point_start == null) { barcelona_point_start = new Date(key) }
    });
    $.each(data.sun.Lagos, function(key, value) {
        lagos_day_length.push(Math.round(value.day_length/60));
        if (lagos_point_start == null) { lagos_point_start = new Date(key) }
    });

    $(function () {
        $('#container_day_length').highcharts({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Day Length Comparson'
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                type: 'datetime',
                title: {
                    text: 'Date'
                }
            }],
            yAxis: { // Primary yAxis
                labels: {
                    format: '{value}'
                },
                title: {
                    text: 'Day length in minutes'
                }
            },
            tooltip: {
                shared: true
            },
            series: [{
                name: 'ausias marc',
                type: 'spline',
                pointStart: barcelona_point_start.getTime(), 
                pointInterval:  1000 * 60 * 60 * 24,
                data: barcelona_day_length,
                tooltip: {
                    valueSuffix: ' mins'
                }
    
            }, {
                name: 'colinas verdes',
                type: 'spline',
                //lineWidth: 1,
                pointStart: lagos_point_start.getTime(),
                pointInterval:  1000 * 60 * 60 * 24,
                data: lagos_day_length,
                tooltip: {
                    valueSuffix: ' mins'
                }
            }],
              plotOptions: {
                column: {
                  borderWidth: 0
                },
                line: {
                  marker: { 
                    enabled: false 
                  },
                  lineWidth: 2
                },
                spline: {
                  marker: { 
                    enabled: false 
                  },
                  lineWidth: 2
                }
              }
        });
    });
});
