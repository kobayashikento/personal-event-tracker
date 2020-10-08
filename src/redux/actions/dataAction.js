import { EmojiObjectsOutlined } from "@material-ui/icons"

export const SET_ROUTINE = 'SET_ROUTINE'
export const SET_ROUTINE_INDEX = 'SET_ROUTINE_INDEX'
export const SET_WORKOUT = 'SET_WORKOUT'
export const SET_ALL_ROUTINE = 'SET_ALL_ROUTINE'
export const SET_ENTRIES = 'SET_ENTRIES'
export const SET_SCHEDULE = 'SET_SCHEDULE'
export const ADD_WORKOUT = 'ADD_WORKOUT'
export const ADD_ROUTINE = 'ADD_ROUTINE'
export const ADD_ROUTINE_WORKOUT = 'ADD_ROUTINE_WORKOUT'
export const UPDATE_ALL_ROUTINE = 'UPDATE_ALL_ROUTINE'
export const UPDATE_ROUTINE_WORKOUT = 'UPDATE_ROUTINE_WORKOUT'
export const DELETE_ROUTINE_WORKOUT = 'DELETE_ROUTINE_WORKOUT'
export const ADD_WORKOUT_ENRTY = 'ADD_WORKOUT_ENRTY'
export const UPDATE_ENTRIES = 'UPDATE_ENTRIES'
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

export function addRoutine(object) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workoutRoutine').add({
            routineName: object.name.trim(),
            workouts: []
        }).then(() => {
            dispatch({ type: ADD_ROUTINE, payload: object });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function deleteRoutine(object, id) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workoutRoutine').doc(id).delete().then(() => {
            dispatch({ type: SET_ALL_ROUTINE, payload: object });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function updateRoutine(obj, index, docId) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workoutRoutine').doc(docId).update({
            routineName: obj.name.trim()
        }).then(() => {
            dispatch({ type: UPDATE_ALL_ROUTINE, payload: obj, index: index });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function addRoutineWorkout(docId, workout, index) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workoutRoutine').doc(docId).update({
            workouts: firestore.FieldValue.arrayUnion(workout)
        }).then(() => {
            dispatch({ type: ADD_ROUTINE_WORKOUT, payload: workout, index: index });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function deleteRoutineWorkout(docId, index, rowId) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const sfDocRef = firestore.collection("workoutRoutine").doc(docId);
        return firestore.runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                var dataDelete = sfDoc.data();
                dataDelete.workouts.splice(index, 1);
                transaction.update(sfDocRef, { workouts: dataDelete.workouts });
            });
        }).then((dataDelete) => {
            dispatch({ type: UPDATE_ROUTINE_WORKOUT, index: rowId, payload: dataDelete });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        });
    }
}

export function bulkRoutineUpdate(docId, obj, rowId) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const sfDocRef = firestore.collection("workoutRoutine").doc(docId);
        return firestore.runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                transaction.update(sfDocRef, { workouts: obj });
            });
        }).then(() => {
            dispatch({ type: UPDATE_ROUTINE_WORKOUT, index: rowId, payload: obj });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        });
    }
}

export function setEntries(object) {
    return { type: SET_ENTRIES, payload: object }
}

export function addEntries(obj) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        console.log(obj)
        firestore.collection('gymEntries').add({
            workout: obj.id,
            weight: obj.weight,
            reps: obj.reps,
            date: obj.date
        }).then(() => {
            dispatch({ type: ADD_WORKOUT_ENRTY, payload: obj });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function updateEntries(docId, obj, index) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('gymEntries').doc(docId).update({
            workout: obj.workout,
            weight: obj.weight,
            reps: obj.reps,
            date: obj.date.getTime()
        }).then(() => {
            dispatch({ type: UPDATE_ENTRIES, payload: obj, index: index });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function deleteEntries(object, id) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('gymEntries').doc(id).delete().then(() => {
            dispatch({ type: SET_ENTRIES, payload: object });
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}

export function setSchedule(object) {
    return { type: SET_SCHEDULE, payload: object }
}

export function updateSchedule(object, docId){
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('workoutSchedule').doc(docId).update({
            schedule: object
        }).then(() => {
        }).catch((err) => {
            dispatch({ type: ERROR, payload: err });
        })
    }
}