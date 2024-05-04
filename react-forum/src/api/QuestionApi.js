import axiosClient from './axiosClient'

export const QuestionApi = {
    
    addQuestion: (question) => {
        return axiosClient.post('/question', question)
    },

    getAllQuestion: () => {
        return axiosClient.get('/question')
    },

    addResponse: (response, id) => {
        return axiosClient.post(`/question/${id}/response`, response)
    }

}