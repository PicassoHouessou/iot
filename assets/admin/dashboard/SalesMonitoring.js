import React, {useState} from "react";
import {Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ReactApexChart from "react-apexcharts";
import {dp1, dp2, dp3} from "../data/DashboardData";

export default function SalesMonitoring() {

    const seriesOne = [{
        name: 'Growth',
        data: dp2
    }, {
        name: 'Actual',
        data: dp1
    }, {
        name: 'Plan',
        data: dp3
    }];

    const optionOne = {
        chart: {
            type: 'area',
            parentHeightOffset: 0,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        colors: ['#5575dc', '#81adee', '#ccd1ed'],
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: 'rgba(72,94,144, 0.07)',
            padding: {
                top: -20
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 1.5
        },
        fill: {
            type: 'gradient',
            opacity: 0.8,
            gradient: {
                type: 'vertical',
                shade: 'light',
                opacityFrom: 0.35,
                opacityTo: 0.65,
                stops: [0, 100]
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            enabled: false
        },
        yaxis: {
            max: 200,
            tickAmount: 6,
            show: false
        },
        xaxis: {
            type: 'numeric',
            tickAmount: 13,
            labels: {
                style: {
                    colors: '#6e7985',
                    fontSize: '11px'
                }
            }
        }
    };

    const seriesTwo = [{
        data: [10, 12, 18, 25, 15, 30, 40, 10, 20, 12, 16, 60, 20, 15, 10, 60, 50, 40, 80, 100, 30, 40, 10, 20, 12, 16, 60, 20, 15, 60, 20, 15, 10, 60, 50, 40, 30, 40, 10, 20]
    }, {
        data: [-10, -12, -18, -25, -15, -30, -40, -10, -20, -12, -16, -60, -20, -15, -10, -60, -50, -40, -80, -40, -30, -40, -10, -20, -12, -16, -60, -20, -15, -60, -20, -15, -10, -60, -50, -40, -30, -40, -10, -20]
    }];

    const optionTwo = {
        chart: {
            height: 180,
            parentHeightOffset: 0,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        colors: ['#506fd9', '#85b6ff'],
        grid: {
            borderColor: 'rgba(72,94,144, 0.07)',
            padding: {
                top: -20
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        yaxis: {
            show: false
        },
        xaxis: {
            type: 'numeric',
            tickAmount: 10,
            decimalsInFloat: 0,
            labels: {
                style: {
                    colors: '#6e7985',
                    fontSize: '10px'
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: false
        },
        tooltip: {
            enabled: false
        }
    };

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: '#506fd9',
            barPercentage: 0.5
        }, {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: '#85b6ff',
            barPercentage: 0.5
        }]
    };

    const chartOption = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                grid: {
                    borderColor: '#000',
                    color: '#f3f5f9'
                },
                ticks: {
                    color: '#212830',
                    font: {
                        size: 10,
                        weight: '500'
                    }
                }
            },
            y: {
                grid: {
                    borderWidth: 0,
                    color: '#f3f5f9'
                },
                ticks: {
                    color: '#212830',
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    const regStyle = {
        selected: {
            fill: "#506fd9"
        },
        initial: {
            fill: "#d9dde7"
        }
    };

    const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
    const [skin, setSkin] = useState(currentSkin);

    if (skin === 'dark') {
        chartOption.scales['x'].grid.color = '#222b41';
        chartOption.scales['x'].ticks.color = 'rgba(255,255,255,.65)';
        chartOption.scales['x'].grid.borderColor = '#222b41';
        chartOption.scales['y'].grid.color = '#222b41';
        chartOption.scales['y'].ticks.color = 'rgba(255,255,255,.65)';
    } else {
        chartOption.scales['x'].grid.color = '#edeff6';
        chartOption.scales['x'].ticks.color = '#42484e';
        chartOption.scales['x'].grid.borderColor = '#edeff6';
        chartOption.scales['y'].grid.color = '#edeff6';
        chartOption.scales['y'].ticks.color = '#42484e';
    }

    return (
        <React.Fragment>
            <Header onSkin={setSkin}/>
            <div className="main main-app p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Sales Monitoring</li>
                        </ol>
                        <h4 className="main-title mb-0">Welcome to Dashboard</h4>
                    </div>

                    <Nav as="nav" className="nav-icon nav-icon-lg">
                        <OverlayTrigger overlay={<Tooltip>Share</Tooltip>}>
                            <Nav.Link href=""><i className="ri-share-line"></i></Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Print</Tooltip>}>
                            <Nav.Link href=""><i className="ri-printer-line"></i></Nav.Link>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Report</Tooltip>}>
                            <Nav.Link href=""><i className="ri-bar-chart-2-line"></i></Nav.Link>
                        </OverlayTrigger>
                    </Nav>
                </div>

                <Row className="g-3">
                    {[
                        {
                            "label": "Unique Purchases",
                            "icon": "ri-shopping-bag-3-line",
                            "value": "8,327",
                            "percent": "0.7",
                            "status": "down"
                        }, {
                            "label": "Order Value",
                            "icon": "ri-briefcase-4-line",
                            "value": "$12,105",
                            "percent": "2.1",
                            "status": "up"
                        }, {
                            "label": "Order Quantity",
                            "icon": "ri-inbox-line",
                            "value": "4,598",
                            "percent": "0.3",
                            "status": "down"
                        }, {
                            "label": "Conversion Rate",
                            "icon": "ri-bar-chart-box-line",
                            "value": "6.28%",
                            "percent": "1.2",
                            "status": "up"
                        }
                    ].map((card, index) => (
                        <Col xs="6" xl="3" key={index}>
                            <Card className="card-one">
                                <Card.Body>
                                    <Card.Title as="label" className="fs-sm fw-medium mb-1">{card.label}</Card.Title>
                                    <h3 className="card-value mb-1"><i className={card.icon}></i> {card.value}</h3>
                                    <small><span
                                        className={"d-inline-flex text-" + ((card.status === "up") ? "success" : "danger")}>{card.percent}% <i
                                        className={"ri-arrow-" + ((card.status === "up") ? "up" : "down") + "-line"}></i></span> than
                                        last week</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col xl="7">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Monthly Growth Revenue</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                    <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <ul className="legend mb-3">
                                    <li>Growth Actual</li>
                                    <li>Actual</li>
                                    <li>Plan</li>
                                </ul>
                                <ReactApexChart series={seriesOne} options={optionOne} type="area" height={300}
                                                className="apex-chart-one mb-4"/>
                                <div className="p-2">
                                    <Row className="g-3">
                                        <Col sm="6">
                                            <h3 className="card-value mb-2"><span>$</span>834,631.18</h3>
                                            <label className="card-title fw-semibold text-dark mb-2">Monthly Revenue
                                                Growth</label>
                                            <p className="mb-0 fs-xs text-secondary">Measure how fast you're growing
                                                monthly recurring revenue.</p>
                                        </Col>
                                        <Col sm="6">
                                            <h3 className="card-value mb-2"><span>$</span>19,204.15</h3>
                                            <label className="card-title fw-semibold text-dark mb-2">Monthly
                                                Revenue/Customer</label>
                                            <p className="mb-0 fs-xs text-secondary">The revenue generated per account
                                                on a monthly or yearly basis.</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="5">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Account Retention</Card.Title>
                                <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                    <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <ReactApexChart series={seriesTwo} options={optionTwo} type="bar" height={180}
                                                className="apex-chart-one mb-3"/>
                                <p className="mb-3 fs-xs">Number of customers who have active subscription with you.</p>

                                <Card className="p-3 d-flex flex-row mb-2">
                                    <div className="card-icon bg-primary"><i className="ri-bar-chart-grouped-line"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="card-value mb-1">53,100</h4>
                                        <label className="card-title fw-medium text-dark mb-1">Expansions</label>
                                        <p className="fs-xs text-secondary mb-0 lh-4">Customers who have upgraded the
                                            level of your products or service.</p>
                                    </div>
                                </Card>
                                <Card className="p-3 d-flex flex-row">
                                    <div className="card-icon bg-ui-02"><i className="ri-bar-chart-grouped-line"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="card-value mb-1">2,884</h4>
                                        <label className="card-title fw-medium text-dark mb-1">Cancellations</label>
                                        <p className="fs-xs text-secondary mb-0 lh-4">Customers who have ended their
                                            subscription with you.</p>
                                    </div>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl="7">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Most Recent Earnings</Card.Title>
                                <Nav as="nav" className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                                    <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-3 p-xl-4">
                                <Row className="g-3 mb-4">
                                    {[
                                        {
                                            "bg": "primary",
                                            "icon": "ri-medal-2-line",
                                            "value": "1,958,104",
                                            "label": "Gross Earnings"
                                        }, {
                                            "bg": "twitter",
                                            "icon": "ri-pie-chart-line",
                                            "value": "234,769.50",
                                            "label": "Tax Witheld"
                                        }, {
                                            "bg": "success",
                                            "icon": "ri-line-chart-fill",
                                            "value": "1,608,469.50",
                                            "label": "Net Earnings"
                                        }
                                    ].map((item, index) => (
                                        <Col key={index}>
                                            <div className="earning-item">
                                                <div className={"earning-icon bg-" + item.bg}>
                                                    <i className={item.icon}></i>
                                                </div>
                                                <h4><span>$</span>{item.value}</h4>
                                                <label>{item.label}</label>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>

                                <Table className="table-two mb-4" responsive>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Sales Count</th>
                                        <th>Gross Earnings</th>
                                        <th>Tax Withheld</th>
                                        <th>% Earnings</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {[
                                        {
                                            "date": "03/05/2023",
                                            "sales": "1,050",
                                            "earnings": "+ $32,580.00",
                                            "tax": "- $3,023.10",
                                            "percent": "4.5"
                                        }, {
                                            "date": "03/04/2023",
                                            "sales": "980",
                                            "earnings": "+ $30,065.10",
                                            "tax": "- $2,780.00",
                                            "percent": "3.8"
                                        }, {
                                            "date": "03/04/2023",
                                            "sales": "954",
                                            "earnings": "+ $28,994.00",
                                            "tax": "- $2,540.60",
                                            "percent": "3.3"
                                        }, {
                                            "date": "03/02/2023",
                                            "sales": "792",
                                            "earnings": "+ $25,300.90",
                                            "tax": "- $2,144.60",
                                            "percent": "2.9"
                                        }, {
                                            "date": "02/28/2023",
                                            "sales": "788",
                                            "earnings": "+ $24,887.08",
                                            "tax": "- $1,980.00",
                                            "percent": "2.6"
                                        }
                                    ].map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.sales}</td>
                                            <td className="text-success">{item.earnings}</td>
                                            <td className="text-danger">{item.tax}</td>
                                            <td>{item.percent}%</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>

                                <h6 className="fw-semibold mb-1">
                                    <Link to="#">Download your earnings in CSV format.</Link>
                                </h6>
                                <p className="fs-sm text-secondary mb-0">
                                    Open it in a spreadsheet and perform your own calculations, graphing etc. The CSV
                                    file contains additional details, such as the buyer location.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Footer/>
            </div>
        </React.Fragment>
    )
}