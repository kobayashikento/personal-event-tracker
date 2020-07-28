const fs = require('fs');

function probPlayPiano() {
    //80% chance of playing the piano 
    if ((Math.floor(Math.random() * 10)) > 3) {
        return true;
    } else { return false; }
}

// takes in the count of days 0-6(7days) since day 3 and 6 are reset days and returns the 
// acitivty number
function blue() {
    if (daysCounter === 3 || daysCounter === 6) {
        if (probPlayPiano()) {
            return 1;
        } else { return 0 }
    } else {
        if (probPlayPiano()) {
            return 3;
        } else { return 2 }
    }
}

function green() {
    if (daysCounter === 6) {
        daysCounter = 0;
        return blue();
    } else { return blue() }
}


//0 = no activity 
//1 = piano 
//2 = gym
//3 = piano and gym
var daysCounter = 0;
function generateCalendar() {
    var data = [];
    var now = new Date();
    var d = new Date('2020-01-01')
    for (d ; d <= now; d.setDate(d.getDate() + 1)) {
        const dateTimeFormat = new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          const [
            { value: month },
            ,
            { value: day },
            ,
            { value: year },
          ] = dateTimeFormat.formatToParts(d);
        data.push({
            "day":`${year}-${month}-${day}`,
            "value": green()
        })
        daysCounter++;
    }
    return data;
}

const jsonString = JSON.stringify(generateCalendar())
fs.writeFileSync('../data/dashEvents.json', jsonString)



