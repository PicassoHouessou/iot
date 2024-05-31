import React, {useState} from 'react';
import {Button, Card, Form,} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {AdminPages} from '@Admin/constants';
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {getErrorMessage} from "@Admin/utils";
import {useAddUserMutation} from "@Admin/services/usersApi";
import {UserRegistration} from "@Admin/models";


const initialState: UserRegistration = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export default function Signup() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [formValue, setFormValue] = useState<UserRegistration>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [addUser] = useAddUserMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
        setErrors((prevState) => ({...prevState, [name]: ''}));


    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            await addUser(formValue).unwrap();
            setErrors({});
            navigate(AdminPages.DASHBOARD);
            toast.success(t('Bienvenue, votre compte est créé '));

        } catch (err) {
            const {detail, errors} = getErrorMessage(err);
            if (errors) {
                setErrors(errors);
            }
            toast.error(detail);
        }
    };

    return (
        <div className="page-sign">
            <Card className="card-sign">
                <Card.Header>
                    <Link to={AdminPages.DASHBOARD} className="header-logo mb-4">
                        IoTAdmin
                    </Link>
                    <Card.Title>{t("S'inscrire")}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {/*
                    <Form
                        {...formItemLayout}
                        form={form}
                        layout="vertical"
                        name="register"
                        onFinish={onFinish}
                        initialValues={{firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}}
                        //style={{maxWidth: 600}}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="lastName"
                            label={t("Nom")}
                            rules={[{required: true, message: t('Veuillez entrer votre nom'), whitespace: true}]}
                        >
                            <Input className="form-control"/>
                        </Form.Item>

                        <Form.Item
                            name="firstName"
                            label={t("Prénoms")}
                            rules={[
                                {type: 'array', required: true, message: t('Veuillez entrer votre prénom')},
                            ]}
                        >
                            <Input className="form-control"/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={t("Email")}
                            rules={[
                                {
                                    type: 'email',
                                    message: t('Veuillez entrer une adresse email valide'),
                                },
                                {
                                    required: true,
                                    message: t('Veuillez entrer une adresse email'),
                                },
                            ]}
                        >
                            <Input className="form-control"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: t("Veuillez entrer mot de passe"),
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password className="form-control"/>
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={t("Confirmer mot de passe")}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: t("Veuillez confirmer votre mot de passe"),
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t('Le nouveau mot de passe ne correspond pas')));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="form-control"/>
                        </Form.Item>
                        <Button type="primary" className="btn-sign btn btn-primary" htmlType="submit">
                            {t("Créer un compte")}
                        </Button>
                    </Form>
                    */}
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label>{t("Email adresse")}</Form.Label>
                            <Form.Control
                                type="text" name="email"
                                placeholder={t("Entrer votre adresse email")}
                                onChange={handleInputChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.email}
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label>{("Nom")}</Form.Label>
                            <Form.Control type="text"
                                          name="lastName" placeholder={t("Entrez votre nom")}
                                          onChange={handleInputChange}
                                          isInvalid={!!errors.lastName}/>
                            <Form.Control.Feedback type="invalid">
                                {errors?.lastName}
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label>{("Prénoms")}</Form.Label>
                            <Form.Control type="text" name="firstName" placeholder={t("Entrez votre prénom")}
                                          onChange={handleInputChange}
                                          isInvalid={!!errors.firstName}/>
                            <Form.Control.Feedback type="invalid">
                                {errors?.firstName}
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label>{t("Mot de passe")}</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleInputChange}
                                          isInvalid={!!errors.password}/>
                            <Form.Control.Feedback type="invalid">
                                {errors?.password}
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label>{t("Même mot de passe")}</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={handleInputChange}
                                          isInvalid={!!errors.confirmPassword}/>
                            <Form.Control.Feedback type="invalid">
                                {errors?.confirmPassword}
                            </Form.Control.Feedback>
                        </div>

                        <Button variant="primary" className="btn-sign" type="submit">
                            {t("Créer un compte")}
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    {("Vous avez déja un compte")} <Link to={AdminPages.SIGN_IN}>{("Se connecter")}</Link>
                </Card.Footer>

            </Card>
        </div>
    );
}
