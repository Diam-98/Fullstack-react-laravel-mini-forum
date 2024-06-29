import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UserApi } from "../../api/UserApi";
import { useAuth } from "../../context/AuthContext";

const AuthModals = ({ open, setOpen }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [switchForm, setSwitchForm] = useState(1);
    const { setUser, setToken } = useAuth();

    const loginForm = () => {
        setSwitchForm(1);
    };

    const registerForm = () => {
        setSwitchForm(2);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const onFinish = (values) => {
        setConfirmLoading(true);
        console.log(values);
        if (switchForm == 1) {
            UserApi.login(values)
                .then((response) => {
                    setUser(response.data.data.user);
                    setToken(response.data.data.token);
                    setConfirmLoading(false);
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error);

                    if (error.response.status == 400) {
                        message.error("Login ou mot de passe inccorect");
                    }

                    setConfirmLoading(false);
                });
        } else {
            const image = values.image[0]
                ? values.image[0].originFileObj
                : null;

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("image", image);

            UserApi.register(formData)
                .then((response) => {
                    setUser(response.data.data.user);
                    setToken(response.data.data.token);
                    setConfirmLoading(false);
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error);
                    setConfirmLoading(false);
                });
        }
    };

    const onFinishFailed = () => {
        message.error("Remplisser d'abord le formulaire");
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Modal
            title="Authentification"
            centered
            width={1000}
            open={open}
            onOk={() => form.submit()}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {switchForm == 1 && (
                    <>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Entrez votre email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mot de passe"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Entrez votre mot de passe",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <p>
                            Pas de compte ?
                            <Button type="link" onClick={registerForm}>
                                Creer
                            </Button>
                        </p>
                    </>
                )}

                {switchForm == 2 && (
                    <>
                        <Form.Item
                            label="Prenom et Nom"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Entrez votre prenom et nom",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Image de Profile"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: false }]}
                        >
                            <Upload listType="picture">
                                <Button icon={<UploadOutlined />}>
                                    Telecharger une Image
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Entrez votre email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mot de passe"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Entrez votre mot de passe",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <p>
                            Vous avez deja un compte ?
                            <Button type="link" onClick={loginForm}>
                                Se connecter
                            </Button>
                        </p>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default AuthModals;
