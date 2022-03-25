const { REACT_APP_API_BASE_URL } = process.env
const BASE_URL = REACT_APP_API_BASE_URL

export const config = {
    api: {
        verifyTrainer: BASE_URL + '/trainer/verify',
        updateTrainer: BASE_URL + '/trainer',
        login: BASE_URL + '/trainer/login',
    },
}
