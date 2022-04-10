import { SETCLASSES } from '../types/types'

const INITIAL_STATE = []

const classReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETCLASSES:
            return [...action.payload.data]
        default:
            return state
    }
}

export default classReducer
