import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {ReduxRouter} from './lib/redux-router';
import {
  Error404,
  UiLogin,
  UiProjectList,
  UiProjectOpen,
  UiProjectBoard,
  UiBoardGantt,
  UiBoardReport,
  UiProjectMap,
} from "./page";
import Paths from "./constants/Paths";
import 'semantic-ui-css/semantic.min.css'
function Root({store, history}) {
  return (
    <Provider store={store}>
      <ReduxRouter history={history}>
        <Routes>
          <Route path={Paths.LOGIN} element={<UiLogin/>}/>
          <Route path={Paths.ROOT} element={<UiProjectList/>}/>
          <Route path={Paths.PROJECT_MAP} element={<UiProjectMap/>}/>
          <Route path={Paths.PROJECTS_LIST} element={<UiProjectList/>}/>
          <Route path={Paths.PROJECTS} element={<UiProjectOpen/>}/>
          <Route path={Paths.BOARDS} element={<UiProjectBoard/>}/>
          <Route path={Paths.CARDS} element={<UiProjectBoard/>}/>
          <Route path={Paths.BOARD_GANTT} element={<UiBoardGantt/>}/>
          <Route path={Paths.BOARD_REPORT} element={<UiBoardReport/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </ReduxRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
