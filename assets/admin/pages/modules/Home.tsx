import React, {useEffect, useState} from "react";
import {Button, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import {useSkinMode} from "@Admin/hooks";
import type {GetProp, MenuProps, TableProps} from 'antd';
import {Dropdown, Table} from 'antd';
import {useDeleteModuleMutation, useModulesJsonLdQuery} from "@Admin/services/modulesApi";
import {Module} from "@Admin/models";
import {getErrorMessage} from "@Admin/utils";
import {AdminPages} from "@Admin/constants";
import {toast} from "react-toastify";
import {useFiltersQuery, useHandleTableChange} from "@Admin/hooks/useFilterQuery";

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;


interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export default function Home() {
    const [, setSkin] = useSkinMode();
    const [deleteItem] = useDeleteModuleMutation();
    const {
        pagination,
        resetAllQuery,
        canReset,
        sortData,
        setPagination,

        query, searchFormValue, handleSearch
        , setSearchFormValue
    } = useFiltersQuery();
    const {current: currentPage, itemsPerPage} = pagination;
    const {isLoading: loading, error, data: dataApis} = useModulesJsonLdQuery(query);
    const [data, setData] = useState<Module[]>();

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: currentPage,
            pageSize: itemsPerPage,
        },
    });
    const handleTableChange = useHandleTableChange({
        path: AdminPages.MODULES,
        sortData,
        setTableParams,
        setPagination,
        tableParams,
        setData
    });

    const handleDelete = async (id: any) => {
        if (window.confirm("Etes-vous sûr")) {
            try {
                await deleteItem(id).unwrap();
                //toast.success(t("cms Deleted Successfully"));
            } catch (err) {
                const {detail} = getErrorMessage(err);
                toast.error(detail);
            }
        }
    };
    const columns: ColumnsType<Module> = [
        {
            title: 'Nom',
            dataIndex: 'name',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '20%',
            sorter: true,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            sorter: true,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
                const items: MenuProps['items'] = [
                    {
                        label: <Link className="details" to={`${AdminPages.MODULES_SEE}/${record.id}`}><i
                            className="ri-information-line"
                        ></i> Voir Détails</Link>,
                        key: '0',
                    },
                    {
                        label: <Link className="details" to={`${AdminPages.MODULES_EDIT}/${record.id}`}><i
                            className="ri-edit-line"></i> Modifier</Link>,
                        key: '1',
                    },
                    {
                        label: <span className="details" onClick={() => handleDelete(record.id)}><i
                            className="ri-delete-bin-line"></i> Delete</span>,
                        key: '2',
                    },
                ];

                return <Dropdown className="" menu={{items}}>
                    <i className="ri-more-2-fill"></i>
                </Dropdown>
            },
        },
    ];

    useEffect(() => {
        if (dataApis) {
            setPagination((prevState) => ({
                ...prevState,
                total: Math.ceil(Number(dataApis["hydra:totalItems" as unknown as keyof typeof dataApis]))
            }));
            const data = dataApis["hydra:member" as unknown as keyof typeof dataApis];
            setData(data);
            if (Array.isArray(data) && data.length == 0 && canReset) {
                //setPagination(prevState => ({...prevState,total: }))
            }
        }
    }, [error, canReset, setPagination, dataApis, itemsPerPage]);


    useEffect(() => {
        if (pagination) {
            setTableParams(prevState => ({
                ...prevState,
                pagination: {
                    ...prevState.pagination,
                    current: pagination.current,
                    total: pagination.total,
                    pageSize: itemsPerPage,
                },
            }));
        }
    }, [setTableParams, pagination, itemsPerPage]);
    const clickOnClearButton = () => {
        resetAllQuery();
    };


    return (
        <React.Fragment>
            <Header onSkin={setSkin}/>
            <div className="main main-app p-3 p-lg-4">
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item"><Link to={AdminPages.DASHBOARD}>Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Modules</li>
                        </ol>
                        <h4 className="main-title mb-0">Les modules</h4>
                    </div>
                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        <Button variant="" className="btn-white d-flex align-items-center gap-2">
                            <i className="ri-bar-chart-2-line fs-18 lh-1"></i>Export<span
                            className="d-none d-sm-inline"> Rapport</span>
                        </Button>
                        <Button variant="" className="btn-white d-flex align-items-center gap-2">
                            <i className="ri-printer-line fs-18 lh-1"></i>Print
                        </Button>
                        <Link to="/modules/add">
                            <Button variant="primary" className="d-flex align-items-center gap-2">
                                <i className="ri-add-line fs-18 lh-1"></i>Ajouter
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="d-md-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex gap-2 mt-3 mt-md-0">
                        {canReset ? (
                            <Button variant="" className="btn-white d-flex align-items-center gap-2"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                        e.preventDefault();
                                        clickOnClearButton();
                                    }}>
                                <i className="ri-delete-bin-line fs-18 lh-1"></i>Effacer
                            </Button>


                        ) : null}
                        <input
                            type="search"
                            className="form-control form-control-lg"
                            placeholder={"Rechercher"}
                            value={searchFormValue}
                            onChange={(e) => setSearchFormValue(e.target.value)}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                handleSearch(e)
                            }
                        />
                    </div>
                </div>


                <Row className="g-3">
                    <Table className="table"
                           columns={columns}
                           rowKey={(record) => record.id}
                           dataSource={data}
                           pagination={tableParams.pagination}
                           loading={loading}
                           onChange={handleTableChange}
                    />
                </Row>

                <Footer/>
            </div>
        </React.Fragment>
    );
}


