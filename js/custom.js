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
    
});
