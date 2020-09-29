export const SET_ROUTINE = 'SET_ROUTINE'
export const SET_ROUTINE_INDEX = 'SET_ROUTINE_INDEX'
export const SET_WORKOUT = 'SET_WORKOUT'
export const SET_ALL_ROUTINE = 'SET_ALL_ROUTINE'
export const SET_ENTRIES = 'SET_ENTRIES'
export const SET_SCHEDULE = 'SET_SCHEDULE'
export const SET_WORKOUT_ERROR = 'SET_WORKOUT_ERROR'

export function setRoutine(object) {
    return { type: SET_ROUTINE, payload: object }
}

export function setRoutineIndex(index) {
    return { type: SET_ROUTINE_INDEX, payload: index }
}

export function setWorkout(object) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        console.log(firestore)
        firestore.collection('workout').add({
            movement: object.movement,
            name: object.name,
            musclegroup: object.musclegroup
        }).then(() => {
            dispatch({ type: SET_WORKOUT, payload: object });
        }).catch((err) => {
            dispatch({ type: SET_WORKOUT_ERROR, payload: err });
        })
    }
}

export function setAllRoutine(object) {
    return { type: SET_ALL_ROUTINE, payload: object }
}

export function setEntries(object) {
    return { type: SET_ENTRIES, payload: object }
}

export function setSchedule(object) {
    return { type: SET_SCHEDULE, payload: object }
}