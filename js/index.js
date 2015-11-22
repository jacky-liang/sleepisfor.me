$(document).ready(function(){
   $('#particle-bg').particleground({
       density: 7000,
       particleRadius: 5,
       maxSpeedX: 0.5,
       maxSpeedY: 0.5,
       dotColor: '#b0d6f0',
       lineColor: '#004471'
   }); 
   
   var state = {
       "submitted_once" : false
   };
   
   var constants = {
       "mins_in_day" : 24 * 60,
       "mins_in_cycle" : 90,
       "margins" : {
            top: 5, 
            right: 10, 
            bottom: 20, 
            left: 10
        }
   };
   
   var chart_container_ref = $("#chart_sleep_duration");
   
   var charts_containers = [
        "chart_sleep_duration",
        "chart_circadian_rhythm"
   ];
   
   var bullets = [];
   
  var charts_data = {
      "chart_sleep_duration" : {"ranges":[12],"measures":[8, 8],"markers":[8]},
      "chart_circadian_rhythm" : {"ranges":[100],"measures":[80, 80],"markers":[90]}
  };
      
   var t_us = $('#t_us'),
         t_ut = $('#t_ut'),
         t_rs = $('#t_rs'),
         t_rt = $('#t_rt');
   
   //MSM is minutes since midnight
   function timeToMSM(hour, min, mer) {
       if (mer == "PM") 
           hour += 12
       return hour * 60 + min
   }
   
   times = {
       "us" : timeToMSM(11, 0, "PM"),
       "ut" : timeToMSM(7, 0, "AM"),
       "rs" : timeToMSM(11, 0, "PM"),
       "rt" : timeToMSM(7, 0, "AM")
   }
   
   t_us.timepicker({
       defaultTime: "11:00 PM"
   }).on('changeTime.timepicker', function(e) {
       times.us = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_ut.timepicker({
       defaultTime: "7:00 AM"
   }).on('changeTime.timepicker', function(e) {
       times.ut = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_rs.timepicker({
       defaultTime: "11:00 PM"
   }).on('changeTime.timepicker', function(e) {
       times.rs = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_rt.timepicker({
       defaultTime: "7:00 AM"
   }).on('changeTime.timepicker', function(e) {
       times.rt = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
      
   function getDuration(from, to) {
       if (from > to)
           return constants.mins_in_day - from + to
       return to - from
   }
   
   var durs = {
       u: 0,
       r: 0
   }
   
   function updateState() {
       durs.u = getDuration(times.us, times.ut);
       durs.r = getDuration(times.rs, times.rt);
   }
         
   var width, height;
   function updateChartDims() {
       width = chart_container_ref.width() - constants.margins.left - constants.margins.right;
       height = 50 - constants.margins.top - constants.margins.bottom;
   };
   updateChartDims();
   
   function initCharts() {
       charts_containers.forEach(function(chart_container){
           console.log(chart_container);
            var chart = d3.bullet();
            var svg = d3.select("#" + chart_container).selectAll("svg")
                                .data([charts_data[chart_container]])
                                .enter().append("svg")
                                .attr("class", "bullet")
                                .attr("width", width + constants.margins.left + constants.margins.right)
                                .attr("height", height + constants.margins.top + constants.margins.bottom)
                                .append("g")
                                .attr("transform", "translate(10,0)");
            chart.width(width).height(height);
            bullets.push({
                "chart" : chart,
                "svg" : svg
            })
       });
   };
      
   function updateChartData() {
       
   };
   
   d3.select(window).on('resize', function(){
       updateChartDims();
       d3.selectAll("svg").attr("width", width + constants.margins.left + constants.margins.right);
       bullets.forEach(function(bullet){
            bullet.chart.width(width).height(height);
            if (state.submitted_once)
                bullet.svg.call(bullet.chart);        
       });
   });
   
   $("#submit").click(function(){
       state.submitted_once = true;
       //convert input times to calculable values 
        updateState();
              
       //plot stats
        updateChartData();
        bullets.forEach(function(bullet){
            bullet.svg.call(bullet.chart.duration(1000));     
       });

       
       //display warnings
   });
   
  initCharts();
})

