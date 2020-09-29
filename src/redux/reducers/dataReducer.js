import {
    SET_ROUTINE,
    SET_ROUTINE_INDEX,
    SET_WORKOUT,
    SET_ALL_ROUTINE,
    SET_ENTRIES,
    SET_SCHEDULE
} from '../actions/dataAction.js';

export function dataReducer(state = {
    routine: {
        routineName: "",
        workouts: []
    },
    routineIndex: 0,
    workout: [{
        "movement": "push",
        "musclegroup": "chest",
        "name": "bench press",
        "tableData": {
            "id": 0
        }
    }],
    allRoutines: [],
    entries: undefined,
    schedule: undefined
}, action) {
    switch (action.type) {
        case SET_ROUTINE:
            return {
                ...state,
                routine: action.payload
            }
        case SET_ROUTINE_INDEX:
            return {
                ...state,
                routineIndex: action.payload
            }
        case SET_WORKOUT:
            return {
                ...state,
                workout: action.payload
            }
        case SET_ALL_ROUTINE: {
            return {
                ...state,
                allRoutines: action.payload
            }
        }
        case SET_ENTRIES: {
            return {
                ...state,
                entries: action.payload
            }
        }
        case SET_SCHEDULE: {
            return {
                ...state,
                schedule: action.payload
            }
        }
        default: return state;
    }
}