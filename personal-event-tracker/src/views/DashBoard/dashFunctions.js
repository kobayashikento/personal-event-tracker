// generate random events for the calendar 
import data from '../../assets/data/dashEvents.json';

// sorts the json file and returns an array that is used to populate the progress calendar 
// where the indexs are 0=all activities, 1=piano, 2=gym, 3=none
// return all the activties and their values 
function getAllActivity() {
    var allAct = [];
    var pianoAct = [];
    var gymAct = [];
    var noAct = [];
    data.forEach(event => {
        // 4 cases
        // case 1: array of all events
        allAct.push({
            day: event.day,
            value: getNumActivity(event)
        })
        //case 2: array of only a single activity
        switch (getNumActivity(event)) {
            case 3: pianoAct.push({
                day: event.day,
                value: 1
            })
                gymAct.push({
                    day: event.day,
                    value: 1
                })
                break;
            case 2: pianoAct.push({
                day: event.day,
                value: 1
            })
                break;
            case 1: gymAct.push({
                day: event.day,
                value: 1
            })
                break;
            case 0: noAct.push({
                day: event.day,
                value: 1
            })
                break;
            default:
        }
    })
    return [allAct, pianoAct, gymAct, noAct];
}

// 3=all, 2=piano, 1=gym, 0=none
function getNumActivity(event) {
    if (event.activity.length === 2) {
        return 3;
    } else if (event.activity.length === 1) {
        if (event.activity[0].name === "Gym") {
            return 1
        } else {
            return 2;
        }
    } else {
        return 0;
    }
}

// get avg per month
function getEventsDetail() {
    // format 
    // data = [{
    //      name: name of event 
    //      events: [{
    //                  monthName: 
    //                   days: [{
    //                          date: date object for the corresponding month 
    //                          }]
    //              }]
    // }]
    var eventDetailsArr = [{
        name: "",
        events: []
    }];
    data.forEach(d => {
        if (d.activity.name === "") {
            if (!monthExists(d.date.getMonth())) {
                eventDetailsArr.events.push(
                    {
                        monthName: d.date.getMonth(),
                        days: [{
                            date: d.date
                        }]
                    }
                )
            } else {
                var index = eventDetailsArr.events.indexOf(d.date.getMonth())
                eventDetailsArr.events[index].days.push({
                    date: d.date
                })
            }
        }
    })
    return eventDetailsArr;
}

function monthExists(data, month) {
    var exists = false;
    data.events.forEach(event => {
        if (event.monthName === month) {
            return true;
        }
    })
    return exists;
}

export default {
    getAllActivity,
    getEventsDetail
}