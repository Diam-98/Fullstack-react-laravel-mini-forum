import {QuestionOutlined, FileOutlined, EditOutlined} from '@ant-design/icons'

export const menuItem = [
    {
        id: 1,
        title: 'Toutes les questions',
        icon: <QuestionOutlined/>,
        path: '/'
    },
    {
        id: 2,
        title: 'Mes questions',
        icon: <FileOutlined/>,
        path: '/question'
    },
    {
        id: 3,
        title: 'Mes reponses',
        icon: <EditOutlined/>,
        path: '/reponse'
    }
]

export const questions = [
    {
        id: 1,
        title: "Question numero 1",
        description: "la description"
    },
    {
        id: 2,
        title: "Question numero 2",
        description: "la description"
    },
    {
        id: 3,
        title: "Question numero 3",
        description: "la description"
    }
]