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
       "submitted_once" : false,
        times : {
            "us" : timeToMSM(11, 0, "PM"),
            "ut" : timeToMSM(7, 0, "AM"),
            "rs" : timeToMSM(11, 0, "PM"),
            "rt" : timeToMSM(7, 0, "AM")
        }
   };
   
   var chart_container_ref = $("#ref_chart");
   
   var charts_containers = [
        "chart_sleep_duration",
        "chart_circadian_rhythm",
        "chart_nrem_sleep",
        "chart_rem_sleep"
   ];
   
   var bullets = [];
   
  var charts_data = {
      "chart_sleep_duration" : {"ranges":[12],"measures":[8, 8],"markers":[8]},
      "chart_circadian_rhythm" : {"ranges":[100],"measures":[80, 0],"markers":[90]},
      "chart_nrem_sleep" : {"ranges":[426.667],"measures":[384, 384],"markers":[384]},
      "chart_rem_sleep" : {"ranges":[106.667],"measures":[96, 96],"markers":[96]}
  };
      
   var t_us = $('#t_us'),
         t_ut = $('#t_ut'),
         t_rs = $('#t_rs'),
         t_rt = $('#t_rt');
   
   //MSM is minutes since midnight
   function timeToMSM(hour, min, mer) {
       if (hour == 12 && mer == "AM") 
           return min;
       if (mer == "PM") 
           hour += 12
       return hour * 60 + min
   }
      
   t_us.timepicker({
       defaultTime: "11:00 PM"
   }).on('changeTime.timepicker', function(e) {
       state.times.us = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_ut.timepicker({
       defaultTime: "7:00 AM"
   }).on('changeTime.timepicker', function(e) {
       state.times.ut = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_rs.timepicker({
       defaultTime: "11:00 PM"
   }).on('changeTime.timepicker', function(e) {
       state.times.rs = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_rt.timepicker({
       defaultTime: "7:00 AM"
   }).on('changeTime.timepicker', function(e) {
       state.times.rt = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });

   var width, height;
   function updateChartDims() {
       width = chart_container_ref.width() - constants.margins.left - constants.margins.right;
       height = 50 - constants.margins.top - constants.margins.bottom;
   };
   
   function initCharts() {
      updateChartDims();
       charts_containers.forEach(function(chart_container){
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
      
   function updateChartData(stats) {
       //Sleep Duration
       charts_data.chart_sleep_duration.measures[0] = stats.durs.r.hrs;
       charts_data.chart_sleep_duration.measures[1] = stats.durs.u.hrs;
       charts_data.chart_sleep_duration.ranges[0] = Math.max(stats.durs.u.hrs, stats.durs.r.hrs, constants.bounds.sleep_duration);
       
       //Circadian Rhythm Health
       var overlap = stats.overlap.percent * 100;
       charts_data.chart_circadian_rhythm.measures[0] = overlap;
       charts_data.chart_circadian_rhythm.measures[1] = overlap;
       
       //Estimate NREM Sleep
       var nrem_duration = stats.durs.r.mins * constants.nrem_percent;
      charts_data.chart_nrem_sleep.measures[0] = nrem_duration;
      charts_data.chart_nrem_sleep.measures[1] = nrem_duration;
      charts_data.chart_nrem_sleep.ranges[0] = Math.max(nrem_duration, constants.bounds.nrem_duration);
      
      //Estimate REM Sleep
      var rem_duration = stats.durs.r.mins * constants.rem_percent;
      charts_data.chart_rem_sleep.measures[0] = rem_duration;
      charts_data.chart_rem_sleep.measures[1] = rem_duration;
      charts_data.chart_rem_sleep.ranges[0] = Math.max(rem_duration, constants.bounds.rem_duration);

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
        SO.updateStats(state.times);
              
       //plot stats
        updateChartData(SO.stats);
        bullets.forEach(function(bullet){
            bullet.svg.call(bullet.chart.duration(1000));     
       });

       
       //display warnings
   });
   
  initCharts();
})

