import React, { useEffect, useState } from "react";
import ResponseCard from "../../components/cards/ResponseCard";
import { UserApi } from "../../api/UserApi";
import { message } from "antd";
import { useQA } from "../../context/QuestionAnswerContext";

const Responses = () => {
    const [responses, setResponses] = useState([]);
    const { isAnswerAdded } = useQA();

    useEffect(() => {
        getMyResponses();
    }, [isAnswerAdded]);

    const getMyResponses = () => {
        UserApi.getMyResponses()
            .then((response) => {
                setResponses(response.data.data);
                message.success("Donnee charge");
            })
            .catch((error) => {
                message.error("Une erreur est surevenu");
            });
    };

    return (
        <section className="feed-page">
            {responses.map((item) => (
                <ResponseCard response={item} key={item.id} />
            ))}
        </section>
    );
};

export default Responses;
