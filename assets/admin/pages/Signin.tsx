import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials, setTokenCredentials } from '@Admin/features/authSlice';
import { getErrorMessage } from '@Admin/utils/getErrorMessage';
import { useLoginMutation } from '@Admin/services/usersApi';
import { useAppDispatch } from '@Admin/store/store';
import { AdminPages } from '@Admin/constants';

const form = {
    email: 'admin@otp.picassohouessou.com',
    password: 'admin',
};
export default function Signin() {
    const [formValue, setFormValue] = useState(form);
    const { email, password } = formValue;
    //eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState<any>(null);
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const setFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
            const errorMessage = getErrorMessage(err);

            setErrorMessage(errorMessage);
        }
    };

    return (
        <div className="page-sign">
            <Card className="card-sign">
                <Card.Header>
                    <Link to="/" className="header-logo mb-4">
                        IoTAdmin
                    </Link>
                    <Card.Title>Sign In</Card.Title>
                    <Card.Text>
                        Welcome back! Please signin to continue. You can use
                        <ul>
                            <li>Email: admin@otp.picassohouessou.com</li>
                            <li>Password : admin</li>
                        </ul>
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Form.Label>Adresse email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={setFormChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Form.Label className="d-flex justify-content-between">
                                Mot de passe <Link to="">Mot de passe oublié?</Link>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={setFormChange}
                            />
                        </div>
                        <Button type="submit" variant="primary" className="btn-sign">
                            Sign In
                        </Button>

                        <div className="divider">
                            <span>or sign in with</span>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Don't have an account? <Link to="/signup">Create an Account</Link>
                </Card.Footer>
            </Card>
        </div>
    );
}
