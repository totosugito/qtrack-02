import MuiDrawer from '@mui/material/Drawer';
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Button, Icon, Loader} from "semantic-ui-react";
import {styled} from "@mui/material/styles";
import classNames from "classnames";

import styles from "./index.module.scss";
import DrawerWeb from "./Views/drawer-web";
import AuthHeader from "./AuthHeader";
import ModalTypes from "../../constants/ModalTypes";
import UserSettingsModal from "./AuthHeader/UserSettingsModal";
import selectors from "../../redux/selectors";

const drawerWidth = 240
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const BaseAuth = (props) => {
  const [t] = useTranslation();
  const isInitializing = useSelector((state) => selectors.selectIsInitializing(state))
  const isSocketDisconnected = useSelector((state) => selectors.selectIsSocketDisconnected(state))
  const currentModal = useSelector((state) => selectors.selectCurrentModal(state))

  const [open, setOpen] = React.useState(false);
  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      {props.hasBg && props.background}
      <div style={{display: 'flex'}}>
        <div className={classNames(styles.wrapper, props.hasBg ? styles.appBarHasBg : styles.appBarHasNoBg)}>
          {!isInitializing && <AuthHeader openDrawer={open}/>}
        </div>

        <Drawer
          variant="permanent"
          open={open}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>

          <DrawerWeb open={open} header={
            <Button icon onClick={handleDrawer} className={styles.buttonDrawer}>
              {open ? <Icon name='angle left'/> : <Icon name='angle right'/>}
            </Button>
          }/>
        </Drawer>

        <div className={styles.divContainer}>
          {isInitializing ? (<Loader active size="massive"/>) : (props.children)}
        </div>
      </div>

      {currentModal === ModalTypes.USER_SETTINGS && <UserSettingsModal/>}

      {isSocketDisconnected && (
        <div className={styles.noSignalDiv}>
          <div className={styles.noSignalHeader}>{t('common.noConnectionToServer')}</div>
          <div className={styles.noSignalContent}>
            <Trans i18nKey="common.allChangesWillBeAutomaticallySavedAfterConnectionRestored">
              All changes will be automatically saved
              <br/>
              after connection restored
            </Trans>
          </div>
        </div>
      )}
    </>
  )
}
export default BaseAuth
