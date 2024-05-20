import React, { useEffect, useState } from 'react';
import Header from '../layouts/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Col, Form, Modal, Nav, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ModuleHistory } from '@Admin/models';

import { calendarEvents } from '../data/CalendarEvents';
import { useSkinMode } from '@Admin/hooks';
import {
    useModuleHistoriesJsonLdQuery,
    useModuleStatusesQuery,
} from '@Admin/services/modulesApi';
import { Flex, Tag } from 'antd';

export default function AppCalendar() {
    const { data } = useModuleHistoriesJsonLdQuery();
    const { data: moduleStatuses } = useModuleStatusesQuery();
    const [histories, setHistories] = useState<Array<ModuleHistory>>([]);
    useEffect(() => {
        if (data) {
            setHistories(data['hydra:member' as unknown as keyof typeof data]);
        }
    }, [data]);
    useEffect(() => {
        document.body.classList.add('app-calendar');
        return () => {
            document.body.classList.remove('app-calendar');
        };
    }, []);

    const [startDate, setStartDate] = useState(new Date());

    // toggle sidebar calendar
    const [isSidebarShow, setSidebarShow] = useState(false);

    // Modal
    const [modalShow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    const [, setSkin] = useSkinMode();
    return (
        <React.Fragment>
            <Header onSkin={setSkin} />
            <div className={'main main-calendar' + (isSidebarShow ? ' show' : '')}>
                <div className="calendar-sidebar">
                    <PerfectScrollbar className="sidebar-body">
                        <div className="d-grid mb-3">
                            <Button variant="primary" onClick={handleModalShow}>
                                Create New Event
                            </Button>
                        </div>

                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            inline
                        />

                        <div className="mb-5"></div>

                        <h5 className="section-title section-title-sm mb-4">Statuts</h5>
                        <Nav className="d-flex flex-column mb-4">
                            <Flex gap="4px 0" vertical>
                                {moduleStatuses?.map((status) => (
                                    <Tag key={status.id} color={status.color}>
                                        {status.name}
                                    </Tag>
                                ))}
                            </Flex>
                        </Nav>
                    </PerfectScrollbar>
                </div>
                <div className="calendar-body">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'custom1 prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        eventSources={[
                            calendarEvents,
                            histories?.map((item) => ({
                                id: item.id,
                                title: item?.module?.name,
                                date: item.createdAt,
                                borderColor: item?.status?.color,
                            })),
                        ]}
                        customButtons={{
                            custom1: {
                                icon: 'chevron-left',
                                click: function () {
                                    setSidebarShow(!isSidebarShow);
                                },
                            },
                        }}
                    />

                    <Modal
                        className="modal-event"
                        show={modalShow}
                        onHide={handleModalClose}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <Form.Label>Event Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title of event"
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Check
                                    type="radio"
                                    name="etype"
                                    inline
                                    label="Event"
                                    checked
                                />
                                <Form.Check
                                    type="radio"
                                    name="etype"
                                    inline
                                    label="Reminder"
                                />
                            </div>
                            <Row className="g-3 mb-3">
                                <Col xs="7" md="8">
                                    <Form.Label>Start Date:</Form.Label>
                                    <Form.Control type="text" placeholder="Choose date" />
                                </Col>
                                <Col>
                                    <Form.Label>Start Time:</Form.Label>
                                    <Form.Select>
                                        <option value="">Choose time</option>
                                        <option value="12:00AM">12:00AM</option>
                                        <option value="12:15AM">12:15AM</option>
                                        <option value="12:30AM">12:30AM</option>
                                        <option value="12:45AM">12:45AM</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="g-3 mb-3">
                                <Col xs="7" md="8">
                                    <Form.Label>End Date:</Form.Label>
                                    <Form.Control type="text" placeholder="Choose date" />
                                </Col>
                                <Col>
                                    <Form.Label>End Time:</Form.Label>
                                    <Form.Select>
                                        <option value="">Choose time</option>
                                        <option value="12:00AM">12:00AM</option>
                                        <option value="12:15AM">12:15AM</option>
                                        <option value="12:30AM">12:30AM</option>
                                        <option value="12:45AM">12:45AM</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <div>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Write some description (optional)"
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant=""
                                className="btn-white"
                                onClick={handleModalClose}
                            >
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleModalClose}>
                                Add Event
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </React.Fragment>
    );
}
