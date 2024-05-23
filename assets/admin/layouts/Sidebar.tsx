import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import userAvatar from '../assets/img/img1.jpg';
import { applicationsMenu, dashboardMenu, pagesMenu } from '../data/Menu';
import { AdminPages } from '@Admin/constants';

interface SidebarProps {
    onUpdateSize?: () => void;
}

export default class Sidebar extends Component<SidebarProps> {
    private _scrollBarRef: PerfectScrollbar | null;

    constructor(props: SidebarProps) {
        super(props);
        this._scrollBarRef = null;
    }

    toggleFooterMenu = (e: React.MouseEvent<HTMLLinkElement>) => {
        e.preventDefault();
        const parent = (e.target as HTMLLinkElement).closest('.sidebar');
        if (parent) {
            parent.classList.toggle('footer-menu-show');
        }
    };

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <Link to={AdminPages.DASHBOARD} className="sidebar-logo">
                        IoTAdmin
                    </Link>
                </div>
                <PerfectScrollbar
                    className="sidebar-body"
                    ref={(ref) => (this._scrollBarRef = ref)}
                >
                    <SidebarMenu
                        onUpdateSize={() => this._scrollBarRef!.updateScroll()}
                    />
                </PerfectScrollbar>
                <div className="sidebar-footer">
                    <div className="sidebar-footer-top">
                        <div className="sidebar-footer-thumb">
                            <img src={userAvatar} alt="" />
                        </div>
                        <div className="sidebar-footer-body">
                            <h6>
                                <Link to="../pages/profile.html">Shaira Diaz</Link>
                            </h6>
                            <p>Premium Member</p>
                        </div>
                        <Link
                            onClick={() => this.toggleFooterMenu}
                            to=""
                            className="dropdown-link"
                        >
                            <i className="ri-arrow-down-s-line"></i>
                        </Link>
                    </div>
                    <div className="sidebar-footer-menu">
                        <nav className="nav">
                            <Link to="">
                                <i className="ri-edit-2-line"></i> Edit Profile
                            </Link>
                            <Link to="">
                                <i className="ri-profile-line"></i> View Profile
                            </Link>
                        </nav>
                        <hr />
                        <nav className="nav">
                            <Link to="">
                                <i className="ri-question-line"></i> Help Center
                            </Link>
                            <Link to="">
                                <i className="ri-lock-line"></i> Privacy Settings
                            </Link>
                            <Link to="">
                                <i className="ri-user-settings-line"></i> Account Settings
                            </Link>
                            <Link to="">
                                <i className="ri-logout-box-r-line"></i> Log Out
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

interface SidebarMenuProps {
    onUpdateSize: () => void;
}

class SidebarMenu extends Component<SidebarMenuProps> {
    populateMenu = (m: any[]) => {
        const menu = m.map((m, key) => {
            let sm;
            if (m.submenu) {
                sm = m.submenu.map((sm: any, key: any) => {
                    return (
                        <NavLink to={sm.link} className="nav-sub-link" key={key}>
                            {sm.label}
                        </NavLink>
                    );
                });
            }

            return (
                <li key={key} className="nav-item">
                    {!sm ? (
                        <NavLink to={m.link} className="nav-link">
                            <i className={m.icon}></i>
                            <span>{m.label}</span>
                        </NavLink>
                    ) : (
                        <div onClick={this.toggleSubMenu} className="nav-link has-sub">
                            <i className={m.icon}></i>
                            <span>{m.label}</span>
                        </div>
                    )}
                    {m.submenu && <nav className="nav nav-sub">{sm}</nav>}
                </li>
            );
        });

        return <ul className="nav nav-sidebar">{menu}</ul>;
    };

    // Toggle menu group
    toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const parent = (e.target as HTMLDivElement).closest('.nav-group');
        if (parent) {
            parent.classList.toggle('show');
            this.props.onUpdateSize();
        }
    };

    // Toggle submenu while closing siblings' submenu
    toggleSubMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const parent = (e.target as HTMLDivElement).closest('.nav-item');
        if (parent) {
            let node = parent.parentNode?.firstChild;
            while (node) {
                if (node !== parent && node.nodeType === Node.ELEMENT_NODE) {
                    (node as HTMLElement).classList.remove('show');
                }
                //@ts-ignore
                node = typeof node?.nextElementSibling || node?.nextSibling;
            }
            parent.classList.toggle('show');
            this.props.onUpdateSize();
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>
                        Dashboard
                    </div>
                    {this.populateMenu(dashboardMenu)}
                </div>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>
                        Modules
                    </div>
                    {this.populateMenu(applicationsMenu)}
                </div>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>
                        Pages
                    </div>
                    {this.populateMenu(pagesMenu)}
                </div>
            </React.Fragment>
        );
    }
}

window.addEventListener('click', function (e) {
    // Close sidebar footer menu when clicked outside of it
    const tar = e.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    if (!tar.closest('.sidebar-footer') && sidebar) {
        sidebar.classList.remove('footer-menu-show');
    }

    // Hide sidebar offset when clicked outside of sidebar
    if (!tar.closest('.sidebar') && !tar.closest('.menu-link')) {
        document.querySelector('body')?.classList.remove('sidebar-show');
    }
});

window.addEventListener('load', function () {
    const skinMode = localStorage.getItem('sidebar-skin');
    const HTMLTag = document.querySelector('html');

    if (skinMode && HTMLTag) {
        HTMLTag.setAttribute('data-sidebar', skinMode);
    }
});
