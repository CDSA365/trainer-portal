const { REACT_APP_API_BASE_URL } = process.env
const BASE_URL = REACT_APP_API_BASE_URL

export const config = {
    api: {
        verifyTrainer: BASE_URL + '/trainer/verify',
        updateTrainer: BASE_URL + '/trainer',
        login: BASE_URL + '/trainer/login',
        getTrainerClasses: BASE_URL + '/trainer/classes',
        updateClass: BASE_URL + '/classes',
        createTrainerTime: BASE_URL + '/trainer/log-time/create',
        endTrainerTime: BASE_URL + '/trainer/log-time/end',
        getAttendance: BASE_URL + '/trainer/attendance',
    },
}
