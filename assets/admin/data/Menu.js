const dashboardMenu = [
    {
        "label": "Finance Monitoring",
        "link": "/dashboard/finance",
        "icon": "ri-pie-chart-2-line"
    },

    {
        "label": "Sales Monitoring",
        "link": "/dashboard/sales",
        "icon": "ri-shopping-bag-3-line"
    },
    
    {
        "label": "Storage Management",
        "link": "/dashboard/storage",
        "icon": "ri-hard-drive-2-line"
    }

];

const applicationsMenu = [
    {
        "label": "Calendar",
        "link": "/apps/calendar",
        "icon": "ri-calendar-line"
    },

];

const pagesMenu = [
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
                "link": "/pages/signin"
            },
            {
                "label": "Sign In Cover",
                "link": "/pages/signin2"
            },
            {
                "label": "Sign Up Basic",
                "link": "/pages/signup"
            },
            {
                "label": "Sign Up Cover",
                "link": "/pages/signup2"
            },
            {
                "label": "Verify Account",
                "link": "/pages/verify"
            },
            {
                "label": "Forgot Password",
                "link": "/pages/forgot"
            },
            {
                "label": "Lock Screen",
                "link": "/pages/lock"
            }
        ]
    },
    {
        "label": "Error Pages",
        "icon": "ri-error-warning-line",
        "submenu": [
            {
                "label": "Page Not Found",
                "link": "/pages/error-404"
            },
            {
                "label": "Internal Server Error",
                "link": "/pages/error-500"
            },

        ]
    },
    {
        "label": "Other Pages",
        "icon": "ri-file-text-line",
        "submenu": [
            {
                "label": "Pricing",
                "link": "/pages/pricing"
            },
            {
                "label": "FAQ",
                "link": "/pages/faq"
            }
        ]
    }
];


export {dashboardMenu, applicationsMenu, pagesMenu};