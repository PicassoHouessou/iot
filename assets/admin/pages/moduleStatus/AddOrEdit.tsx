import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import { useSkinMode } from '@Admin/hooks';
import {
    useAddModuleMutation,
    useModuleStatusQuery,
    useUpdateModuleStatusMutation,
} from '@Admin/services/modulesApi';
import { ModuleStatus } from '@Admin/models';
import { generateIRI, getErrorMessage } from '@Admin/utils';
import { AdminPages, ApiRoutesWithoutPrefix } from '@Admin/constants';
import { toast } from 'react-toastify';

const initialState = {
    id: '',
    name: '',
    color: '',
    description: '',
};

export default function AddOrEdit() {
    const [, setSkin] = useSkinMode();
    const [formValue, setFormValue] = useState<ModuleStatus>(initialState);
    const [selectedModuleType, setSelectedModuleType] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const [addData] = useAddModuleMutation();
    const [updateData] = useUpdateModuleStatusMutation();
    const navigate = useNavigate();
    const idParam = useParams().id as unknown as number;
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { data } = useModuleStatusQuery(idParam!, {
        skip: idParam ? false : true,
    });

    useEffect(() => {
        if (data) {
            // Set the current user to be the one who create or edit the post
            setFormValue({
                ...data,
            });
            setEditMode(true);
        } else {
            setEditMode(false);
        }
    }, [data]);

    const handleInputChange = (e: any, action?: any) => {
        const handleRegularFieldChange = (name: string, value: string) => {
            setFormValue({
                ...formValue,
                [name]: value,
            });
            setErrors((prevState) => ({ ...prevState, [name]: '' }));
        };

        if (typeof action === 'undefined') {
            const { name, value } = e.target;

            handleRegularFieldChange(name, value);
        } else {
            switch (action.name) {
                case 'type':
                    setSelectedModuleType(e);
                    break;
                default:
                    const { value } = e;
                    setFormValue({
                        ...formValue,
                        [action.name]: value,
                    });
                    break;
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { id, ...rest } = formValue;
        const data = {
            ...rest,
            type: generateIRI(
                ApiRoutesWithoutPrefix.MODULE_TYPES,
                selectedModuleType.id,
            ) as string,
        };

        try {
            if (!editMode) {
                await addData(data).unwrap();
                setErrors({});
                navigate(-1);
                toast.success('Status enregistré');
            } else {
                setErrors({});
                await updateData({
                    ...data,
                    id,
                }).unwrap();
                navigate(-1);
                toast.success('Status enregistré');
            }
        } catch (err) {
            const { detail, errors } = getErrorMessage(err);
            if (errors) {
                setErrors(errors);
            }
            toast.error(detail);
        }
    };
    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item">
                                <Link to="/modules">Modules</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Ajout
                            </li>
                        </ol>
                        <h4 className="main-title mb-0">Ajouter un status de module</h4>
                    </div>
                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        <Link to={AdminPages.MODULE_STATUSES}>
                            <Button
                                variant=""
                                className="btn-white d-flex align-items-center gap-2"
                            >
                                <i className="ri-arrow-go-back-line fs-18 lh-1"></i>
                                Retour
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="main main-docs">
                    <Container>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <Form.Label htmlFor="name">Nom</Form.Label>
                                        <Form.Control
                                            id="name"
                                            name="name"
                                            value={formValue.name}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors?.name}
                                        </Form.Control.Feedback>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Label htmlFor="color">Couleur</Form.Label>
                                        <Form.Control
                                            id="name"
                                            name="name"
                                            value={formValue.color}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.color}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors?.color}
                                        </Form.Control.Feedback>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Label htmlFor="description">
                                            Description
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            id="description"
                                            name="description"
                                            rows={3}
                                            value={formValue.description}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.description}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors?.description}
                                        </Form.Control.Feedback>
                                    </div>
                                    <div>
                                        <Button variant="primary" type="submit">
                                            Enregistrer
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>

                        <br />
                        <br />
                        <br />
                    </Container>
                </div>

                <Footer />
            </div>
        </React.Fragment>
    );
}
