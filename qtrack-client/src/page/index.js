import Loadable from "../component/Loadable";
import {lazy} from "react";

const Error404 = Loadable(lazy(() => import('./error-404')))
const UiLogin = Loadable(lazy(() => import('./ui-login')))
const UiHome = Loadable(lazy(() => import('./ui-home')))
const UiProjectList = Loadable(lazy(() => import('./ui-project-list')))
const UiProjectOpen = Loadable(lazy(() => import('./ui-project-open')))
const UiProjectBoard = Loadable(lazy(() => import('./ui-project-board')))
const UiBoardGantt = Loadable(lazy(() => import('./ui-board-gantt')))
const UiBoardReport = Loadable(lazy(() => import('./ui-board-report')))
const UiHomeMap = Loadable(lazy(() => import('./ui-home-map')))
const UiProjectMap = Loadable(lazy(() => import('./ui-project-map')))
export {
  Error404, UiLogin, UiHome, UiProjectList, UiProjectOpen, UiProjectBoard, UiBoardGantt, UiBoardReport, UiHomeMap,
  UiProjectMap
}
