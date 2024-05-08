import {AdminPages} from "@Admin/constants";

const dashboardMenu = [
    {
        "label": "Tableau de bord",
        "link": "/dashboard",
        "icon": "ri-pie-chart-2-line"
    },
    {
        "label": "Storage Management",
        "link": "/dashboard/storage",
        "icon": "ri-hard-drive-2-line"
    },


];

const applicationsMenu = [
    {
        "label": "Modules",
        "link": AdminPages.MODULES,
        "icon": "ri-pie-chart-2-line"
    },
    {
        "label": "Types",
        "link": AdminPages.MODULE_TYPES,
        "icon": "ri-pie-chart-2-line"
    },
    {
        "label": "Etats",
        "link": AdminPages.MODULE_STATUSES,
        "icon": "ri-pie-chart-2-line"
    },
    {
        "label": "Calendar",
        "link": "/apps/calendar",
        "icon": "ri-calendar-line"
    },

];

const pagesMenu = [
    {
        "label": "Calendar",
        "link": "/logs",
        "icon": "ri-calendar-line"
    },
    {
        "label": "User Pages",
        "icon": "ri-account-circle-line",
        "submenu": [
            {
                "label": "User Profile",
                "link": "/pages/profile"
            },

        ]
    },
    {
        "id": 27,
        "label": "Authentication",
        "icon": "ri-lock-2-line",
        "submenu": [
            {
                "label": "Sign In Basic",
                "link": "//signin"
            },
            {
                "label": "Sign In Cover",
                "link": "//signin2"
            },
            {
                "label": "Sign Up Basic",
                "link": "//signup"
            },
            {
                "label": "Sign Up Cover",
                "link": "//signup2"
            },
            {
                "label": "Verify Account",
                "link": "/verify"
            },
            {
                "label": "Forgot Password",
                "link": "/forgot"
            },
            {
                "label": "Lock Screen",
                "link": "/lock"
            }
        ]
    },
    {
        "label": "Error Pages",
        "icon": "ri-error-warning-line",
        "submenu": [
            {
                "label": "Page Not Found",
                "link": "/error-404"
            },
            {
                "label": "Internal Server Error",
                "link": "/error-500"
            },

        ]
    },

];


export {dashboardMenu, applicationsMenu, pagesMenu};