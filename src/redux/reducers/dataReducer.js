import {
    SET_ROUTINE,
    SET_ROUTINE_INDEX,
    SET_WORKOUT,
    SET_ALL_ROUTINE,
    SET_ENTRIES,
    SET_SCHEDULE, ADD_WORKOUT, ADD_ROUTINE, UPDATE_ALL_ROUTINE, ADD_ROUTINE_WORKOUT, UPDATE_ROUTINE_WORKOUT, ADD_WORKOUT_ENRTY, UPDATE_ENTRIES
} from '../actions/dataAction.js';

export function dataReducer(state = {
    routine: {
        routineName: "",
        workouts: []
    },
    routineIndex: 0,
    workout: undefined,
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
        case ADD_WORKOUT:
            return {
                ...state,
                workout: state.workout.push(action.payload)
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
        case ADD_ROUTINE: {
            return {
                ...state,
                allRoutines: state.allRoutines.push(action.payload)
            }
        }
        case UPDATE_ALL_ROUTINE: {
            return {
                ...state,
                allRoutines: state.allRoutines[action.index].routineName = action.payload.name.trim()
            }
        }
        case ADD_ROUTINE_WORKOUT: {
            return {
                ...state, 
                allRoutines: state.allRoutines[action.index].workouts.push(action.payload)
            }
        }
        case UPDATE_ROUTINE_WORKOUT: {
            return {
                ...state, 
                allRoutines: state.allRoutines[action.index].workouts = action.payload
            }
        }
        case ADD_WORKOUT_ENRTY: {
            return { 
                ...state, 
                entries: state.entries.push(action.payload)
            }
        }
        case UPDATE_ENTRIES: {
            return {
                ...state,
                entries: state.entries[action.index] = action.payload
            }
        }
        default: return state;
    }
}