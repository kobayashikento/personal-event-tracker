export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const PREV = 'PREV'
export const NEXT = 'NEXT'
export const LOOP = 'LOOP'
export const PLAYED = 'PLAYED'

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

export function played(number) {
    return { type: PLAYED, payload: number }
}