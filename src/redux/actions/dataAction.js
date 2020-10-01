export const SET_ROUTINE = 'SET_ROUTINE'
export const SET_ROUTINE_INDEX = 'SET_ROUTINE_INDEX'
export const SET_WORKOUT = 'SET_WORKOUT'
export const SET_ALL_ROUTINE = 'SET_ALL_ROUTINE'
export const SET_ENTRIES = 'SET_ENTRIES'
export const SET_SCHEDULE = 'SET_SCHEDULE'
export const ADD_WORKOUT = 'ADD_WORKOUT'
export const ERROR = 'ERROR'

export function setRoutine(object) {
    return { type: SET_ROUTINE, payload: object }
}

export function setRoutineIndex(index) {
    return { type: SET_ROUTINE_INDEX, payload: index }
}

export function addWorkout(object) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workout').add({
            movement: object.movement,
            name: object.name,
            musclegroup: object.musclegroup
        }).then(() => {
            dispatch({ type: ADD_WORKOUT, payload: object });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function deleteWorkout(object, id) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        console.loeg(id)
        firestore.collection('workout').doc(id).delete().then(() => {
            dispatch({ type: SET_WORKOUT, payload: object });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function setWorkout(object) {
    return { type: SET_WORKOUT, payload: object }
}

export function updateWorkout(object, newObj) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workout').doc(newObj.id).update({
            movement: newObj.movement,
            name: newObj.name,
            musclegroup: newObj.musclegroup
        }).then(() => {
            dispatch({ type: SET_WORKOUT, payload: object });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
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