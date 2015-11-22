$(document).ready(function(){
   $('#particle-bg').particleground({
       density: 7000,
       particleRadius: 5,
       maxSpeedX: 0.5,
       maxSpeedY: 0.5,
       dotColor: '#b0d6f0',
       lineColor: '#004471'
   }); 
   
   $('#t_us').timepicker();
   $('#t_ut').timepicker();
   $('#t_rs').timepicker();
   $('#t_rt').timepicker();
})