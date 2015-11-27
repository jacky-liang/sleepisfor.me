$(document).ready(function(){
    
    var data_sleep_durs = $("#data-sleep-durs"),
          data_circadian_rhythm = $("#data-circadian-rhythm"),
          data_nrem = $("#data-nrem"),
          data_rem = $("#data-rem"),
          data_sleep_time = $("#data-sleep-time");
    
    function rounded(n) {
        return Math.round(n * 100) / 100;
    }
    
    labels = [
        {
            target : data_sleep_durs,
            model : function (stats) {
                return rounded(stats.durs.r.hrs);
            }
        },
        {
            target : data_circadian_rhythm,
            model : function (stats) {
                return rounded(stats.overlap.percent * 100);
            }
        },
        {
            target : data_nrem,
            model : function (stats) {
                return rounded(stats.durs.r.nrem);
            }
        },
        {
            target : data_rem,
            model : function (stats) {
                return rounded(stats.durs.r.rem);
            }
        },
        {
            target : data_sleep_time,
            model : function (stats) {
                var wake_time = (stats.times.ut + constants.mins_sleep_delay) % constants.mins_in_day;
                                
                var mer = "AM";
                if (wake_time >= constants.mins_in_day / 2) {
                    mer = "PM";
                }
                
                var hr = Math.floor(wake_time / constants.mins_in_hr);
                if (hr > 12) hr -= 12;
                
                var mins = wake_time % constants.mins_in_hr;
                if (mins < 10) mins = "0" + mins;
                
                return hr + ":" + mins + " " + mer;
            }
        }
    ];
    
});