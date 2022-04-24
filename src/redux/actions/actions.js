import { SETCLASSES, SETUSER } from '../types/types'

export const setUser = (data) => (dispatch) =>
    Promise.resolve().then(() => {
        return dispatch({
            type: SETUSER,
            payload: {
                data,
            },
        })
    })
export const setClass = (data) => (dispatch) =>
    Promise.resolve().then(() => {
        return dispatch({
            type: SETCLASSES,
            payload: {
                data,
            },
        })
    })
