import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import pageSvg from "../assets/svg/pair_programming.svg";
import AuthLayout from "@Admin/pages/AuthLayout";

export default function InternalServerError() {

    document.body.classList.remove("sidebar-show");

    return (
        <div className="page-error">
            <AuthLayout/>

            <div className="content">
                <Container>
                    <Row className="gx-5">
                        <Col lg="5" className="d-flex flex-column align-items-center">
                            <h1 className="error-number">500</h1>
                            <h2 className="error-title">Internal Server Error</h2>
                            <p className="error-text">Oopps. The server encountered an internal server error and was
                                unable to complete your request. Please try again later.</p>
                            <Button variant="primary" className="btn-error">Back to Dashboard</Button>
                        </Col>
                        <Col xs="8" lg="6" className="mb-5 mb-lg-0">
                            <object type="image/svg+xml" data={pageSvg} className="w-100"
                                    aria-label="svg image"></object>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}