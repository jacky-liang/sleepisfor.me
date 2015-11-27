$(document).ready(function(){
    
    var sleep_durs = $("#sleep-durs"),
          nrem_sleep = $("#nrem-sleep"),
          rem_sleep = $("#rem-sleep"),
          circadian_rhythm =  $("#circadian-rhythm");
    
    conds = [
        {
            target : sleep_durs,
            text : "You have slept less than the recommended average of 8 hrs per night!",
            sat : function (stats) {
                return stats.durs.r.mins < constants.mins_in_eight_hrs;
            }
        },
        {
            target : nrem_sleep,
            text : "Due to insufficient amount of NREM sleep, learning new things and consolidating memories will be more difficult.",
            sat : function (stats) {
                return stats.durs.r.nrem < constants.mins_in_eight_hrs * constants.nrem_percent * 0.9;
            }
        },
        {
            target : rem_sleep,
            text : "Due to insufficient amount of REM sleep, integrating, associating, and abstracting previously learned information will be more difficult.",
            sat : function (stats) {
                return stats.durs.r.rem < constants.mins_in_eight_hrs * constants.rem_percent * 0.9;
            }
        },
        {
            target : circadian_rhythm,
            text : "You are experiencing circadian rhythm disruption, which increases risks for depression, cancer, and cardiovascular and metabolic diseases.",
            sat : function (stats) {
                return stats.overlap.percent < 0.9;
            }
        },
        {
            target : sleep_durs,
            text : "Did you know - 12 consecutive days of 6 hour sleeps is equivalent of pulling an all-nighter!",
            sat : function (stats) {
                return stats.durs.r.mins <= 6 * 60 && stats.durs.r.mins > 4 * 60 
                || stats.durs.u.mins <= 6 * 60 && stats.durs.u.mins > 4 * 60;
            }
        },
        {
            target : sleep_durs,
            text : "Did you know - 7 consecutive days of 4 hour sleeps is equivalent of pulling an all-nighter!",
            sat : function (stats) {
                return stats.durs.r.mins <= 4 * 60 || stats.durs.u.mins <= 4 * 60;
            }
        },
        {
            target : sleep_durs,
            text : "You have not slept for more than 4 hours! You now have about a 70% reduction in natural T killer cells and 50% in antibody buildup.",
            sat : function (stats) {
                return stats.durs.r.mins <= 4 * 60;
            }
        },
        {
            target : sleep_durs,
            text : "Due to insufficient sleep, you currently are experiencing reduced immue system effectiveness.",
            sat : function (stats) {
                return stats.durs.r.mins <= 7 * 60 && stats.durs.r.mins > 4 * 60 
                || stats.durs.u.mins <= 7 * 60 && stats.durs.u.mins > 4 * 60;
            }
        },
        {
            target : sleep_durs,
            text : "Less than 7 hours of sleep increases risks of diabetes, obesity, and over reactive emotional responses.",
            sat : function (stats) {
                return stats.durs.r.mins <= 7 * 60 || stats.durs.u.mins <= 7 * 60;
            }
        },       
        {
            target : sleep_durs,
            text : "Being awake for more than 22 hours reduces your reaction time and ability to focus dramatically, and the state of mind is equivalent to that which could've gotten a DUI.",
            sat : function (stats) {
                return stats.durs.r.mins <= 2 * 60 || stats.durs.u.mins <= 2 * 60;
            }
        },    
        {
            target : sleep_durs,
            text : "You slept for at least 8 hours! Hooray for being healthy!",
            sat : function (stats) {
                return stats.durs.r.mins >= constants.mins_in_eight_hrs;
            }
        },  
    ];
    
});