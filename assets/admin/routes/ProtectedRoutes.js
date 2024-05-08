import React from "react";

import Dashboard from "../dashboard/Dashboard";
import StorageManagement from "../dashboard/StorageManagement";
import AppCalendar from "../apps/AppCalendar";

// UI Elements
import LayoutColumns from "../docs/LayoutColumns";
import LayoutGrid from "../docs/LayoutGrid";
import LayoutGutters from "../docs/LayoutGutters";
import ApexCharts from "../docs/ApexCharts";
import ChartJs from "../docs/ChartJs";
import IconRemix from "../docs/IconRemix";
import IconFeather from "../docs/IconFeather";
import Modules from "../pages/modules/Index";
import Profile from "../pages/profiles/Index";
import Logs from "@Admin/pages/Logs";
import ModuleStatuses from "@Admin/pages/moduleStatus";
import ModuleTypes from "@Admin/pages/moduleTypes";
import {AdminPages} from "@Admin/constants";

const protectedRoutes = [
    {path: "dashboard", element: <Dashboard/>},
    {path: `${AdminPages.MODULE_STATUSES}/*`, element: <ModuleStatuses/>},
    {path: `${AdminPages.MODULE_TYPES}/*`, element: <ModuleTypes/>},
    {path: `${AdminPages.MODULES}/*`, element: <Modules/>},
    {path: `${AdminPages.LOGS}/*`, element: <Logs/>},
    {path: `${AdminPages.PROFILES}/*`, element: <Profile/>},
    {path: "dashboard/storage", element: <StorageManagement/>},
    {path: "apps/calendar", element: <AppCalendar/>},
    {path: "docs/layout/grid", element: <LayoutGrid/>},
    {path: "docs/layout/columns", element: <LayoutColumns/>},
    {path: "docs/layout/gutters", element: <LayoutGutters/>},

    {path: "docs/chart/apex", element: <ApexCharts/>},
    {path: "docs/chart/chartjs", element: <ChartJs/>},
    {path: "docs/icon/remix", element: <IconRemix/>},
    {path: "docs/icon/feather", element: <IconFeather/>},

]

export default protectedRoutes;