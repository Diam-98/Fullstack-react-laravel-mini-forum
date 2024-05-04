import axiosClient from './axiosClient'

export const UserApi = {
    login: (values) => {
        return axiosClient.post('/login', values)
    },

    register: (user) => {
        return axiosClient.post('/register', user)
    },

    currentUser: () => {
        return axiosClient.get('/user')
    },

    logout: () => {
        return axiosClient.post('/logout')
    },

    getMyQuestions: () => {
        return axiosClient.get('/get-my-questions')
    },

    getMyResponses: () => {
        return axiosClient.get('/get-my-responses')
    }
}