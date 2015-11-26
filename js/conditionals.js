$(document).ready(function(){conds = [
    {
        target : $("#sleep-durs"),
        text : "You have slept less than the recommended average of 8 hrs per night!",
        sat : function (stats) {
            return stats.durs.r.mins < 60 * 8;
        }
    },
    {
        target : $("#nrem-sleep"),
        text : "Due to insufficient amount of NREM sleep, learning new things today will be more difficult.",
        sat : function (stats) {
            return stats.durs.r.nrem < constants.mins_in_eight_hrs * constants.nrem_percent;
        }
    },
]});