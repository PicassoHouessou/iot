import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import { useSkinMode } from "@Admin/hooks";
import { AdminPages } from "@Admin/constants";
import img1 from "@Admin/assets/img/img1.jpg";
import {
    useModuleQuery,
    useModulesJsonLdQuery,
} from "@Admin/services/modulesApi";

import { List } from "antd";

interface DataType {
    gender?: string;
    name: {
        title?: string;
        first?: string;
        last?: string;
    };
    email?: string;
    picture: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
}

export default function View() {
    const { id } = useParams();
    const loadMoreRef = useRef(null);
    const { data: module } = useModuleQuery(id!, { skip: id ? false : true });
    const [query, setQuery] = useState<any>({ itemsPerPage: 2 });
    const { data: histories, isLoading } = useModulesJsonLdQuery(query, {
        skip: id ? false : true,
    });
    const [, setSkin] = useSkinMode();

    const [canLoadMore, setCanLoadMore] = useState(false);
    // const [loading, setLoading] = useState(false);

    const [data, setData] = useState<DataType[]>([]);
    const [list, setList] = useState<DataType[]>([]);

    useEffect(() => {
        if (data && data.length > 0) {
            //const newData = list.concat(data);
            setList((prevState) => [...prevState, ...data]);
            setData([]);
            //const data = histories["hydra:member" as unknown as keyof typeof histories];
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event("resize"));
        }
    }, [data]);

    useEffect(() => {
        if (histories) {
            const newData =
                histories["hydra:member" as unknown as keyof typeof histories];
            setData(newData);
            if (
                histories["hydra:view" as unknown as keyof typeof histories] &&
                histories["hydra:view" as unknown as keyof typeof histories][
                    "hydra:next"
                ]
            ) {
                setCanLoadMore(true);
            } else {
                setCanLoadMore(false);
            }
            /*

            if (histories?.["hydra:view?.hydra:next" as unknown as keyof typeof histories]) {
                setCanLoadMore(true)
            } else {
                setCanLoadMore(false)
            }

             */

            //setList(prevState => ([...prevState, data]));
        }
    }, [histories, data, setCanLoadMore]);
    const onLoadMore = useCallback(() => {
        if (canLoadMore) {
            setQuery((prevState: any) => ({
                ...prevState,
                page: prevState.page ? prevState.page + 1 : 2,
            }));
        }
        //setCanLoadMore(false)
    }, [canLoadMore, setQuery]);

    useEffect(() => {
        //console.log(isLoading);
        if (isLoading) {
            return;
        }
        /*
        if (!canLoadMore) {
            return;
        }
        */
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    onLoadMore();
                    //
                }
            },
            { threshold: 1.0 },
        );

        const currentRef = loadMoreRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isLoading, onLoadMore]);
    /*
        const loadMore =
            canLoadMore ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={onLoadMore}>loading more</Button>
                </div>
            ) : null;
        */

    const renderItem = (item: any, index: number) => {
        // console.log(list?.length);
        // console.log(index);
        if (list?.length > 1 && index === list?.length - 1) {
            //alert("dddd");
        }
        return (
            <>
                <li className="activity-date">Aug 30, 2023</li>
                <li
                    className="activity-item search"
                    ref={
                        list?.length > 1 && index === list?.length - 1
                            ? loadMoreRef
                            : null
                    }
                >
                    <p className="d-sm-flex align-items-center mb-0">
                        <Link
                            to=""
                            className="avatar avatar-xs me-2 d-none d-sm-inline"
                        >
                            <img src={img1} alt="" />
                        </Link>
                        <span className="fs-sm">
                            <strong>You</strong> searched using a keyword{" "}
                            <strong>&quot;restaurant&quot;</strong>
                        </span>
                        <span className="fs-xs text-secondary ms-auto">
                            10:00am
                        </span>
                    </p>
                </li>
            </>
        );
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item">
                                <Link to={AdminPages.MODULES}>Modules</Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Détails
                            </li>
                        </ol>
                        <h4 className="main-title mb-0">{module?.name}</h4>
                    </div>
                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        <Link to={AdminPages.MODULES}>
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

                <div className="main p-4 p-lg-5">
                    <Row className="g-5">
                        <Col xl="9">
                            <h2 className="main-title mb-3">
                                Type: {module?.type?.name}
                            </h2>
                            <p className="text-secondary mb-5">
                                {module?.description}
                            </p>

                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="section-title mb-0">
                                    Post And Comments
                                </h5>
                                <Form.Check
                                    type="switch"
                                    label="Show all activity"
                                    className="fs-sm"
                                />
                            </div>

                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="section-title mb-0">
                                    Search History
                                </h5>
                                <Link to="">Clear Searches</Link>
                            </div>

                            <List
                                className="activity-group mb-5"
                                //loading={isLoading}
                                itemLayout="horizontal"
                                loadMore={isLoading}
                                dataSource={list}
                                renderItem={(item, index) =>
                                    renderItem(item, index)
                                }
                                footer={
                                    isLoading && (
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </Spinner>
                                    )
                                }
                            />
                            <ul className="activity-group mb-5">
                                <li className="activity-date">Aug 30, 2023</li>
                                <li className="activity-item search">
                                    <p className="d-sm-flex align-items-center mb-0">
                                        <Link
                                            to=""
                                            className="avatar avatar-xs me-2 d-none d-sm-inline"
                                        >
                                            <img src={img1} alt="" />
                                        </Link>
                                        <span className="fs-sm">
                                            <strong>You</strong> searched using
                                            a keyword{" "}
                                            <strong>
                                                &quot;restaurant&quot;
                                            </strong>
                                        </span>
                                        <span className="fs-xs text-secondary ms-auto">
                                            10:00am
                                        </span>
                                    </p>
                                </li>
                                <li className="activity-date">Aug 28, 2023</li>
                                <li className="activity-item search">
                                    <p className="d-sm-flex align-items-center mb-0">
                                        <Link
                                            to=""
                                            className="avatar avatar-xs me-2 d-none d-sm-inline"
                                        >
                                            <img src={img1} alt="" />
                                        </Link>
                                        <span className="fs-sm">
                                            <strong>You</strong> searched using
                                            a keyword{" "}
                                            <strong>
                                                &quots;oftware engineer&quot;
                                            </strong>
                                        </span>
                                        <span className="fs-xs text-secondary ms-auto">
                                            02:23pm
                                        </span>
                                    </p>
                                </li>
                                <li className="activity-item search">
                                    <p className="d-sm-flex align-items-center mb-0">
                                        <Link
                                            to=""
                                            className="avatar avatar-xs me-2 d-none d-sm-inline"
                                        >
                                            <img src={img1} alt="" />
                                        </Link>
                                        <span className="fs-sm">
                                            <strong>You</strong> searched using
                                            a keyword{" "}
                                            <strong>
                                                &quot;ui developer&quot;
                                            </strong>
                                        </span>
                                        <span className="fs-xs text-secondary ms-auto">
                                            02:15pm
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Footer />
                </div>

                <Footer />
            </div>
        </React.Fragment>
    );
}
