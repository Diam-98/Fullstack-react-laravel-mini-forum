import React, { useEffect, useState } from "react";
import FeedCard from "../../components/cards/FeedCard";
import { UserApi } from "../../api/UserApi";
import { message } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useQA } from "../../context/QuestionAnswerContext";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const { isQuestionAdded } = useQA();

    useEffect(() => {
        getMyQuestions();
    }, [isQuestionAdded]);

    const getMyQuestions = () => {
        UserApi.getMyQuestions()
            .then((response) => {
                setQuestions(response.data.data);
                message.success("Donnee charge");
            })
            .catch((error) => {
                message.error("Une erreur est surevenu");
            });
    };

    return (
        <section className="feed-page">
            {questions.map((item) => (
                <FeedCard item={item} key={item.id} />
            ))}
        </section>
    );
};

export default Questions;
