$(document).ready(function(){
   $('#particle-bg').particleground({
       density: 7000,
       particleRadius: 5,
       maxSpeedX: 0.5,
       maxSpeedY: 0.5,
       dotColor: '#b0d6f0',
       lineColor: '#004471'
   }); 
   
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
       "t_us" : timeToMSM(11, 0, "PM"),
       "t_ut" : timeToMSM(7, 0, "AM"),
       "t_rs" : timeToMSM(11, 0, "PM"),
       "t_rt" : timeToMSM(7, 0, "AM")
   }
   
   t_us.timepicker({
       defaultTime: "11:00 PM"
   }).on('changeTime.timepicker', function(e) {
       times.t_us = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_ut.timepicker({
       defaultTime: "7:00 AM"
   }).on('changeTime.timepicker', function(e) {
       times.t_ut = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_rs.timepicker({
       defaultTime: "11:00 PM"
   }).on('changeTime.timepicker', function(e) {
       times.t_rs = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   t_rt.timepicker({
       defaultTime: "7:00 AM"
   }).on('changeTime.timepicker', function(e) {
       times.t_rt = timeToMSM(e.time.hours, e.time.minutes, e.time.meridian);
   });
   
   $("#submit").click(function(){
       console.log(times);
   });
})