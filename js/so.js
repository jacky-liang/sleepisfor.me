var SO = {
    stats : {
        durs : {
           u : {
               hrs : 0,
               mins : 0
           },
           r : {
               hrs : 0,
               mins : 0
           }
        },
        overlap : {
            mins : 0,
            hrs : 0,
            percent : 0,
            head : {
                mins : 0,
                hrs : 0
            },
            tail : {
                mins : 0,
                hrs : 0
            }
        }
    },
    getDuration : function(from, to) {
       if (from > to)
           return constants.mins_in_day - from + to
       return to - from
    },
    updateStats : function(times) {
        SO.stats.durs.u.mins = SO.getDuration(times.us, times.ut);
        SO.stats.durs.u.hrs = SO.stats.durs.u.mins / constants.mins_in_hr;
        SO.stats.durs.r.mins = SO.getDuration(times.rs, times.rt);
        SO.stats.durs.r.hrs = SO.stats.durs.r.mins / constants.mins_in_hr;       

        var ut = times.ut,
              rt = times.rt,
              us = times.us,
              rs = times.rs;
              
        if (ut < us) ut += constants.mins_in_day;
        if (rt < rs) rt += constants.mins_in_day;
        
        SO.stats.overlap.mins = Math.min(ut, rt) - Math.max(us, rs);
        
        console.log(ut, rt, us, rs);

        if (SO.stats.overlap.mins < 0) {
            SO.stats.overlap.mins = 0;
            SO.stats.overlap.head.mins = 0;
            SO.stats.overlap.tail.mins = 0;  
        } else {
            SO.stats.overlap.head.mins = rs - us;
            SO.stats.overlap.tail.mins = rt - ut;                
        }
        
        SO.stats.overlap.percent = SO.stats.overlap.mins / ( (SO.stats.durs.u.mins + SO.stats.durs.r.mins) / 2 );
        
        SO.stats.overlap.hrs = SO.stats.overlap.mins / constants.mins_in_hr;
        SO.stats.overlap.head.hrs = SO.stats.overlap.head.mins / constants.mins_in_hr;
        SO.stats.overlap.tail.hrs = SO.stats.overlap.tail.mins / constants.mins_in_hr;
        
    }
}