import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import pageSvg from '../assets/svg/forgot_password.svg';
import { AdminPages, APP_NAME } from '@Admin/constants';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from '@Admin/utils';
import { useForgetPasswordMutation } from '@Admin/services/usersApi';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    document.body.classList.remove('sidebar-show');
    const [message, setMessage] = useState({ success: '', error: '' });
    const [formValue, setFormValue] = useState<string>('');
    const [postForgetPassword] = useForgetPasswordMutation();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await postForgetPassword(formValue).unwrap();
            navigate(-1);
        } catch (err) {
            const { detail } = getErrorMessage(err);
            setMessage((prevState) => ({
                ...prevState,
                error: detail!,
            }));
        }
    };
    return (
        <div className="page-auth">
            <div className="header">
                <Container>
                    <Link to={AdminPages.DASHBOARD} className="header-logo">
                        {APP_NAME}
                    </Link>
                    <Nav className="nav-icon">
                        <Nav.Link href="">
                            <i className="ri-twitter-fill"></i>
                        </Nav.Link>
                        <Nav.Link href="">
                            <i className="ri-github-fill"></i>
                        </Nav.Link>
                        <Nav.Link href="">
                            <i className="ri-dribbble-line"></i>
                        </Nav.Link>
                    </Nav>
                </Container>
            </div>

            <div className="content">
                <Container>
                    <Card className="card-auth">
                        <Card.Body className="text-center">
                            <div className="mb-5">
                                <object
                                    type="image/svg+xml"
                                    data={pageSvg}
                                    className="w-50"
                                    aria-label="svg image"
                                ></object>
                            </div>
                            {message && message.error && (
                                <Alert variant="danger">{message.error}</Alert>
                            )}
                            {message && message.success && (
                                <Alert variant="success">{message.success}</Alert>
                            )}
                            <Card.Title>
                                {t('Réinitialiser votre mot de passe')}
                            </Card.Title>
                            <Card.Text className="mb-5">
                                {t(
                                    'Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
                                )}
                            </Card.Text>

                            <Form onSubmit={handleSubmit}>
                                {' '}
                                <Row className="g-2">
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder={t('Saisir votre adresse e-mail')}
                                            value={formValue}
                                            onChange={(e) => setFormValue(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm="4">
                                        <Button variant="primary" type="submit">
                                            {t('Réinitialiser')}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
}
