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
   
   $("#submit").click(function(){
       //convert input times to calculable values 
       updateState();
       
       //plot stats
       
       
       //display warnings
   });
})