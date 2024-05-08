import { Link } from "react-router-dom";
import React from "react";

interface Props {
    numberOfPages: number;
    actualPage: number;
    itemsPerPage: number;
    className?: string;
    url: string;
}

const Pagination: React.FC<Props> = ({
    numberOfPages,
    actualPage,
    className,
    url,
}) => {
    const pagination = Array.from({ length: numberOfPages }, (v, k) => k + 1);
    const actualPageInt = parseInt(actualPage as unknown as string);
    const nextPage =
        actualPageInt < numberOfPages ? actualPageInt + 1 : actualPageInt;
    const prevPage = actualPageInt > 1 ? actualPageInt - 1 : actualPageInt;
    const firstPage = 1;
    let params = new URLSearchParams(window.location.search).toString();
    params = params ? "?" + params : "";
    return (
        <nav aria-label="Page navigation" className={" " + className}>
            <ul className="pagination justify-content-end">
                <li
                    className={`${actualPageInt === 1 ? "page-item disabled" : "page-item"}`}
                    onClick={(e) => e.preventDefault()}
                >
                    <Link
                        className="page-link"
                        to={`${url}${prevPage}${params}`}
                        aria-label="Previous"
                    >
                        Précédent
                    </Link>
                </li>
                {pagination.map((page, index) => {
                    if (numberOfPages > 5) {
                        if (
                            page === 1 ||
                            page === numberOfPages ||
                            page === numberOfPages - 1 ||
                            page === numberOfPages - 2 ||
                            page === actualPageInt ||
                            page === actualPageInt - 1 ||
                            page === actualPageInt + 1
                        ) {
                            return (
                                <li
                                    key={index}
                                    className={`page-item ${page === actualPageInt ? "active" : ""}`}
                                >
                                    <Link
                                        className="page-link"
                                        to={`${url}${page}${params}`}
                                    >
                                        {page}
                                    </Link>
                                </li>
                            );
                        } else if (page === firstPage + 1) {
                            return (
                                <li key={index} className={`page-item`}>
                                    <Link
                                        className="page-link"
                                        to={`${url}${page}${params}`}
                                    >
                                        ...
                                    </Link>
                                </li>
                            );
                        } else if (
                            page === numberOfPages - 3 &&
                            actualPageInt !== numberOfPages &&
                            actualPageInt !== numberOfPages - 1
                        ) {
                            return (
                                <li key={index} className={`page-item`}>
                                    <Link
                                        className="disabled"
                                        to={`${url}${page}${params}`}
                                    >
                                        ...
                                    </Link>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    }
                    return (
                        <li
                            key={index}
                            className={`page-item ${actualPageInt === page ? "active" : ""}`}
                            onClick={(e) => e.preventDefault()}
                        >
                            <Link
                                className="page-link"
                                to={`${url}${page}${params}`}
                            >
                                {page}
                            </Link>
                        </li>
                    );
                })}
                <li
                    className={`${actualPageInt === numberOfPages ? "page-item disabled" : "page-item"}`}
                    onClick={(e) => e.preventDefault()}
                >
                    <Link
                        className="page-link"
                        to={`${url}${nextPage}${params}`}
                        aria-disabled={`${actualPageInt === numberOfPages ? "true" : "false"}`}
                    >
                        Suivant
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
