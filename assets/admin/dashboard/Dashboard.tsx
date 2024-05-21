import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Card, Col, Nav, ProgressBar, Row, Spinner, Table,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import ReactApexChart from 'react-apexcharts';
import {useSkinMode} from '@Admin/hooks';
import {useStatisticsQuery} from '@Admin/services/statisticApi';
import TotalStatistic from '@Admin/components/TotalStatistic';
import {StatisticEnum} from '@Admin/constants';
import {ApexOptions} from 'apexcharts';
import {useModuleHistoriesJsonLdQuery} from '@Admin/services/modulesApi';
import dayjs from 'dayjs';
import {List, Tag} from 'antd';
import {ModuleHistory} from '@Admin/models';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Dashboard() {
    const {data: statisticsData} = useStatisticsQuery();
    const loadMoreRef = useRef(null);
    const [query, setQuery] = useState<any>({itemsPerPage: 10});
    const {data: histories, isLoading} = useModuleHistoriesJsonLdQuery(query);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const [list, setList] = useState<ModuleHistory[]>([]);

    const seriesQuantityModuleType = useMemo(() => {
        let result: number[] = [];
        if (Array.isArray(statisticsData)) {
            const margin = statisticsData[0]?.charts?.['margin'];
            if (Array.isArray(margin)) {
                result = margin.map((item: any) => {
                    return item.value ?? 0;
                });
            }
        }
        return [
            {
                name: 'Quantité',
                data: result,
            },
        ];
    }, [statisticsData]);

    const optionQuantityModuleType: ApexOptions = useMemo(() => {
        let labels = [];
        if (Array.isArray(statisticsData)) {
            const margin = statisticsData[0]?.charts?.['margin'];
            if (Array.isArray(margin)) {
                labels = margin.map((item: any) => {
                    return item.type;
                });
            }
        }
        return {
            labels: labels,
            chart: {
                parentHeightOffset: 0,
                stacked: true,
                toolbar: {show: true},
            },
            colors: ['#506fd9', '#85b6ff'],
            grid: {
                borderColor: 'rgba(72,94,144, 0.07)',
                padding: {
                    top: -20,
                    left: 0,
                    bottom: -5,
                },
            },

            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '60%',
                    //@ts-ignore
                    endingShape: 'rounded',
                },
            },
            /*
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            */
            yaxis: {
                labels: {
                    style: {
                        colors: '#6e7985',
                        fontSize: '10px',
                    },
                },
            },
            xaxis: {
                type: 'category',
                labels: {
                    style: {
                        colors: '#6e7985',
                        fontSize: '10px',
                        fontWeight: 'bold',
                    },
                },
                axisBorder: {show: false},
            },
            dataLabels: {enabled: false},
            fill: {opacity: 1},
            legend: {show: true},
            tooltip: {
                enabled: true,
            },
        };
    }, [statisticsData]);

    const seriesMargin = useMemo(() => {
        if (Array.isArray(statisticsData)) {
            const margin = statisticsData[0]?.charts?.['margin'];
            if (Array.isArray(margin)) {
                const result = margin
                    .filter((item) => item.percentage > 0)
                    .map((item: any) => {
                        return item.percentage;
                    });
                return result;
            }
        }
        return null;
    }, [statisticsData]);

    const optionMargin = useMemo(() => {
        let labels = [];
        if (Array.isArray(statisticsData)) {
            const margin = statisticsData[0]?.charts?.['margin'];
            if (Array.isArray(margin)) {
                labels = margin
                    .filter((item) => item.percentage > 0)
                    .map((item: any) => {
                        return item.type;
                    });
            }
        }
        return {
            labels: labels,
            legend: {show: true},
        };
    }, [statisticsData]);

    // const formattedData = histories?.map((item) => {
    //     const createdAt = dayjs(item.createdAt);
    //     return {
    //         date: {
    //             day: createdAt.format('ddd'),
    //             num: createdAt.format('DD'),
    //         },
    //         events: [
    //             {
    //                 time: createdAt.format('hh:mm A'),
    //                 title: item.module.name,
    //                 text: `Statut: ${item.status.name}, Valeur: ${item.value}`,
    //             },
    //         ],
    //     };
    // });
    const [, setSkin] = useSkinMode();

    const statistic = useMemo(() => {
        return Array.isArray(statisticsData) ? statisticsData[0] : null;
    }, [statisticsData]);


    useEffect(() => {
        if (histories) {

            if (
                histories['hydra:view' as unknown as keyof typeof histories] &&
                histories['hydra:view' as unknown as keyof typeof histories]['hydra:next']
            ) {
                const data = histories['hydra:member' as unknown as keyof typeof histories];
                setList((prevState) => [...prevState, ...data]);

                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
                setCanLoadMore(true);
            } else {
                setCanLoadMore(false);
            }
        }
    }, [histories, setList, setCanLoadMore]);
    const onLoadMore = useCallback(() => {
        if (!canLoadMore) {
            return;
        }
        setQuery((prevState: any) => ({
            ...prevState,
            page: prevState.page ? prevState.page + 1 : 2,
        }));
        setCanLoadMore(false);
    }, [canLoadMore, setQuery]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    onLoadMore();
                }
            },
            {threshold: 1.0},
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
    }, [isLoading, loadMoreRef, onLoadMore]);

    const renderItem = (item: ModuleHistory, index: number) => {
        const addRef = list?.length > 1 && index === list?.length - 3 ? true : false;
        const createdAt = dayjs(item.createdAt);
        return (
            <>
                <li key={index} className={''} ref={addRef ? loadMoreRef : null}>
                    <div className="event-date">
                        <small>{createdAt.format('ddd')}</small>
                        <h5>{createdAt.format('DD')}</h5>
                    </div>
                    <div className="events-body">
                        <div key={item.id} className="ev-item">
                            <small className="text-capitalize">
                                {createdAt.fromNow()}
                            </small>
                            <h6>{item?.module?.name}</h6>
                            <p className="mb-2">
                                <strong>
                                    Valeur mesurée:{' '}
                                    {`${item.value} ${item?.module?.type?.unitOfMeasure}`}
                                </strong>
                                <br/>
                            </p>
                            <Tag color={item?.status?.color}>{item?.status?.name}</Tag>
                        </div>
                    </div>
                </li>
            </>
        );
    };

    return (
        <React.Fragment>
            <Header onSkin={setSkin}/>
            <div className="main main-app p-3 p-lg-4">
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item">
                                <Link to="#">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Finance Monitoring
                            </li>
                        </ol>
                        <h4 className="main-title mb-0">Welcome to Dashboard</h4>
                    </div>
                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        <Button
                            variant=""
                            className="btn-white d-flex align-items-center gap-2"
                        >
                            <i className="ri-share-line fs-18 lh-1"></i>Share
                        </Button>
                        <Button
                            variant=""
                            className="btn-white d-flex align-items-center gap-2"
                        >
                            <i className="ri-printer-line fs-18 lh-1"></i>Print
                        </Button>
                        <Button
                            variant="primary"
                            className="d-flex align-items-center gap-2"
                        >
                            <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Generate
                            <span className="d-none d-sm-inline"> Report</span>
                        </Button>
                    </div>
                </div>

                <Row className="g-3">
                    <Col xl="12">
                        <Row className="g-3">
                            {statistic && (
                                <>
                                    <TotalStatistic
                                        data={statistic.module}
                                        type={StatisticEnum.MODULE}
                                    />
                                    <TotalStatistic
                                        data={statistic.moduleStatus}
                                        type={StatisticEnum.MODULE_STATUS}
                                    />
                                    <TotalStatistic
                                        data={statistic.moduleType}
                                        type={StatisticEnum.MODULE_TYPE}
                                    />
                                    <TotalStatistic
                                        data={statistic.moduleHistory}
                                        type={StatisticEnum.MODULE_HISTORY}
                                    />
                                </>
                            )}
                        </Row>
                    </Col>
                    <Col xl="7">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Nombre modules</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href="">
                                        <i className="ri-refresh-line"></i>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <i className="ri-more-2-fill"></i>
                                    </Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="">
                                <ReactApexChart
                                    series={seriesQuantityModuleType}
                                    options={optionQuantityModuleType}
                                    type="bar"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="5">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Modules par type</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href="">
                                        <i className="ri-refresh-line"></i>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <i className="ri-more-2-fill"></i>
                                    </Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="">
                                {seriesMargin && optionMargin && (
                                    <ReactApexChart
                                        series={seriesMargin}
                                        options={optionMargin}
                                        height="auto"
                                        type="polarArea"
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="7">
                        <Card className="card-one">
                            <Card.Header className="border-0 pb-2">
                                <Card.Title as="h6">Marge type de module (%)</Card.Title>
                            </Card.Header>
                            <Card.Body className="pt-0">
                                {seriesMargin && optionMargin && (
                                    <>
                                        <p className="fs-sm text-secondary mb-4">
                                            Vous avez la marge de chaque type de module.
                                        </p>

                                        <ProgressBar className="progress-finance mb-4">
                                            {seriesMargin.map((item, key) => (
                                                <ProgressBar
                                                    key={key}
                                                    now={item}
                                                    label={`${item}%`}
                                                />
                                            ))}
                                        </ProgressBar>
                                        <Row className="g-3">
                                            {optionMargin.labels.map((item, key) => (
                                                <Col key={key}>
                                                    <label className="card-label fs-sm fw-medium mb-1">
                                                        {item}
                                                    </label>
                                                    <h2 className="card-value mb-0">
                                                        {seriesMargin[key]}%
                                                    </h2>
                                                </Col>
                                            ))}
                                        </Row>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="5">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Modules par type</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href="">
                                        <i className="ri-refresh-line"></i>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <i className="ri-more-2-fill"></i>
                                    </Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="">
                                {seriesMargin && optionMargin && (
                                    <ReactApexChart
                                        series={seriesMargin}
                                        options={optionMargin}
                                        height="auto"
                                        type="donut"
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="g-3 mt-3 justify-content-center">
                    <Col xl="6">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Analytics Performance</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href="">
                                        <i className="ri-refresh-line"></i>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <i className="ri-more-2-fill"></i>
                                    </Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-3">
                                <h2 className="performance-value mb-0">
                                    9.8{' '}
                                    <small className="text-success d-flex align-items-center">
                                        <i className="ri-arrow-up-line"></i> 2.8%
                                    </small>
                                </h2>

                                <label className="card-title fs-sm fw-medium">
                                    Performance Score
                                </label>

                                <ProgressBar className="progress-one ht-8 mt-2 mb-4">
                                    <ProgressBar now={50}/>
                                    <ProgressBar now={25} variant="success"/>
                                    <ProgressBar now={5} variant="orange"/>
                                    <ProgressBar now={5} variant="pink"/>
                                    <ProgressBar now={10} variant="info"/>
                                    <ProgressBar now={5} variant="indigo"/>
                                </ProgressBar>

                                <Table className="table-three">
                                    <tbody>
                                    {[
                                        {
                                            dot: 'primary',
                                            label: 'Excellent',
                                            count: '3,007',
                                            percent: '50',
                                        },
                                        {
                                            dot: 'success',
                                            label: 'Very Good',
                                            count: '1,674',
                                            percent: '25',
                                        },
                                        {
                                            dot: 'orange',
                                            label: 'Good',
                                            count: '125',
                                            percent: '6',
                                        },
                                        {
                                            dot: 'pink',
                                            label: 'Fair',
                                            count: '98',
                                            percent: '5',
                                        },
                                        {
                                            dot: 'info',
                                            label: 'Poor',
                                            count: '512',
                                            percent: '10',
                                        },
                                        {
                                            dot: 'indigo',
                                            label: 'Very Poor',
                                            count: '81',
                                            percent: '4',
                                        },
                                    ].map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div
                                                    className={
                                                        'badge-dot bg-' + item.dot
                                                    }
                                                ></div>
                                            </td>
                                            <td>{item.label}</td>
                                            <td>{item.count}</td>
                                            <td>{item.percent}%</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl="6">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Dernières activités</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href="">
                                        <i className="ri-refresh-line"></i>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <i className="ri-more-2-fill"></i>
                                    </Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body
                                className="p-3 mt-3 mb-3 overflow-auto "
                                style={{maxHeight: '350px'}}
                            >
                                <ul className="events-list mt-2 mb-2">
                                    <List
                                        className="mb-5"
                                        loading={isLoading}
                                        itemLayout="horizontal"
                                        //loadMore={<div ref={loadMoreRef}></div>}
                                        dataSource={list}
                                        renderItem={(item, index) =>
                                            renderItem(item, index)
                                        }
                                        footer={
                                            isLoading && (
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </Spinner>
                                            )
                                        }
                                    />
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Footer/>
            </div>
        </React.Fragment>
    );
}
