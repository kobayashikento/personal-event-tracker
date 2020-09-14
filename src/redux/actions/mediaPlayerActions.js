export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const PREV = 'PREV'
export const NEXT = 'NEXT'
export const LOOP = 'LOOP'
export const PLAYED = 'PLAYED'
export const SEEKING = 'SEEKING'
export const SET_DATA = 'SET_DATA'
export const SEEK_TO = 'SEEK_TO'
export const SET_IMAGE = 'SET_IMAGE'

export function play() {
    return { type: PLAY, payload: true }
}

export function pause() {
    return { type: PAUSE, playload: false }
}

export function next(index) {
    return { type: NEXT, payload: index }
}

export function prev(index) {
    return { type: PREV, payload: index }
}

export function loop() {
    return { type: LOOP, }
}

export function played(value) {
    return { type: PLAYED, payload: value }
}

export function seeking(boolean) {
    return { type: SEEKING, payload: boolean }
}

export function setData(url) {
    return { type: SET_DATA, payload: url }
}

export function seekTo(value) {
    return { type: SEEK_TO, payload: value }
}

export function setImage(src) {
    return { type: SET_IMAGE, payload: src }
}