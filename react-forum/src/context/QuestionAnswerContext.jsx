import { createContext, useContext, useState } from "react";

const QuestionAnswerContext = createContext([]);

export const QuestionAnswerProvider = ({ children }) => {
    const [isQuestionAdded, setIsQuestionAdded] = useState(null);
    const [isAnswerAdded, setIsAnswerAdded] = useState(null);

    return (
        <QuestionAnswerContext.Provider
            value={{
                isQuestionAdded,
                setIsQuestionAdded,
                isAnswerAdded,
                setIsAnswerAdded,
            }}
        >
            {children}
        </QuestionAnswerContext.Provider>
    );
};

export const useQA = () => useContext(QuestionAnswerContext); // avec QA Question Answer
