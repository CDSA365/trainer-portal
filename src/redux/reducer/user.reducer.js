import { SETUSER } from '../types/types'

const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETUSER:
            return { ...action.payload.data }
        default:
            return state
    }
}

export default userReducer
