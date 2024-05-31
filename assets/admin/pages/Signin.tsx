import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials, setTokenCredentials } from '@Admin/features/authSlice';
import { getErrorMessage } from '@Admin/utils/getErrorMessage';
import { useLoginMutation } from '@Admin/services/usersApi';
import { useAppDispatch } from '@Admin/store/store';
import { AdminPages } from '@Admin/constants';
import { useTranslation } from 'react-i18next';

const form = {
    email: 'admin@otp.picassohouessou.com',
    password: 'admin',
};
export default function Signin() {
    const { t } = useTranslation();
    const [formValue, setFormValue] = useState(form);
    const { email, password } = formValue;
    //eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState<any>(null);
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const setFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrorMessage('');
        setFormValue((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage(null);
        try {
            const res = await login({
                email,
                password,
            }).unwrap();
            if (
                res?.user &&
                (res.user?.roles?.includes('ROLE_ADMIN') ||
                    res.user?.roles?.includes('ROLE_USER'))
            ) {
                dispatch(setCredentials({ user: res.user }));
                dispatch(
                    setTokenCredentials({
                        token: res?.token,
                        refresh_token: res?.refresh_token,
                    }),
                );
                navigate(AdminPages.DASHBOARD);
            } else {
                setErrorMessage("Vous n'êtes pas autorisé à accéder à cette page");
            }
        } catch (err) {
            const { detail } = getErrorMessage(err);
            setErrorMessage(detail);
        }
    };

    return (
        <div className="page-sign">
            <Card className="card-sign">
                <Card.Header>
                    <Link to={AdminPages.DASHBOARD} className="header-logo mb-4">
                        IoTAdmin
                    </Link>
                    <Card.Title>{t('Se Connecter')}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Card.Text>
                        {t(
                            'Bienvenue ! Veuillez vous connecter pour continuer. Vous pouvez utiliser',
                        )}
                    </Card.Text>
                    <ul>
                        <li>{'Email :'} admin@otp.picassohouessou.com</li>
                        <li>{t('Mot de passe :')} admin</li>
                    </ul>
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Form.Label>{t('Adresse email')}</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder={t('Entrer votre adresse email')}
                                value={email}
                                onChange={setFormChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Form.Label className="d-flex justify-content-between">
                                {t('Mot de passe')}{' '}
                                <Link to="">{t('Mot de passe oublié?')}</Link>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder={t('Entrer votre mot de passe')}
                                value={password}
                                onChange={setFormChange}
                            />
                        </div>
                        <Button type="submit" variant="primary" className="btn-sign">
                            {t('Se Connecter')}
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    {t('Pas de compte?')}{' '}
                    <Link to={AdminPages.SIGN_UP}>{'Créer un compte'}</Link>
                </Card.Footer>
            </Card>
        </div>
    );
}
