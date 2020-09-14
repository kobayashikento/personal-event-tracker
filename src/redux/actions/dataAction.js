export const SET_ROUTINE = 'SET_ROUTINE'
export const SET_ROUTINE_INDEX = 'SET_ROUTINE_INDEX'
export const SET_WORKOUT = 'SET_WORKOUT'
export const SET_ALL_ROUTINE = 'SET_ALL_ROUTINE'

export function setRoutine(object) {
    return { type: SET_ROUTINE, payload: object }
}

export function setRoutineIndex(index) {
    return { type: SET_ROUTINE_INDEX, payload: index }
}

export function setWorkout(object) {
    return { type: SET_WORKOUT, payload: object }
}

export function setAllRoutine(object) {
    return { type: SET_ALL_ROUTINE, payload: object}
}