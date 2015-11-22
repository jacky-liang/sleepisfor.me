$(document).ready(function(){
   $('#particle-bg').particleground({
       density: 7000,
       particleRadius: 5,
       maxSpeedX: 0.5,
       maxSpeedY: 0.5,
       dotColor: '#b0d6f0',
       lineColor: '#004471'
   }); 
   
   var constants = {
       "mins_in_day" : 24 * 60,
       "mins_in_cycle" : 90
   }
   
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
   
   var data = [
  {"title":"Sleep Duration","subtitle":"Hours","ranges":[12],"measures":[8,8],"markers":[8]},
  {"title":"Circadian Rhythm Match","subtitle":"%","ranges":[100],"measures":[80],"markers":[90]},
  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
    ];
   
   var margin = {top: 5, right: 40, bottom: 20, left: 120},
        width = 960 - margin.left - margin.right,
        height = 50 - margin.top - margin.bottom;

    var chart = d3.bullet()
        .width(width)
        .height(height);

    var svg = d3.select("#charts").selectAll("svg")
        .data(data)
        .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");

    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });   
   
   $("#submit").click(function(){
       //convert input times to calculable values 
       updateState();
       
       //plot stats
       svg.call(chart.duration(1000)); 
       
       //display warnings
   });
})

