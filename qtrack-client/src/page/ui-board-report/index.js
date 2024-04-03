import selectors from "../../redux/selectors";
import {connect} from "react-redux";
import {useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import BaseProject from "../base-project";
import classNames from "classnames";
import styles from "../ui-project-open/index.module.scss";
import {Icon, Loader} from "semantic-ui-react";
import React from "react";
import ReportViewer from "./ReportViewer";
import stylesView from "../../view/index.module.scss";
import {Link} from "react-router-dom";
import Paths from "../../constants/Paths";

function UiBoardReport({project, board}) {
  const theme = useTheme();
  const [t] = useTranslation();

  if (board === null) {
    return (
      <>
        <BaseProject>
          <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
            <div className={styles.message} style={{color: theme.palette.text.secondary}}>
              <Icon name='unlink' size='huge'/>
              <h1>
                {t('common.boardNotFound_title', {
                  context: 'title',
                })}
              </h1>
            </div>
          </div>
        </BaseProject>
      </>
    )
  }

  if (board.isFetching) {
    return (
      <BaseProject>
        <div className={classNames(styles.wrapper, styles.wrapperLoader, styles.wrapperProject)}>
          <Loader active size="big"/>
        </div>
      </BaseProject>
    );
  }

  const hasBg = () => {
    return (project && project.background)
  }

  return (
    <>
      <BaseProject>
        <>
          <div
            className={classNames(stylesView.toolbarBoardContainer, hasBg() ? stylesView.appBarToolbarHasBg : stylesView.appBarToolbarNoBg)}>
            <div className={stylesView.toolbarItemContainer}>
              <div className={stylesView.toolbarItemSmall}>
                <div className={classNames(stylesView.toolbarButton)}>
                  <Link className={classNames(stylesView.toolbarLink)} to={Paths.BOARDS.replace(':id', board.id)}>
                    <Icon name='arrow left'/>
                    <span className={classNames(stylesView.toolbarButtonTitle)}>
                      {t('common.backToBoard')}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <ReportViewer/>
        </>
      </BaseProject>

    </>
  )
}

const mapStateToProps = (state) => {
  const project = selectors.selectCurrentProject(state);
  const board = selectors.selectCurrentBoard(state);
  return {
    project,
    board: board,
  }
}

export default connect(mapStateToProps)(UiBoardReport);
