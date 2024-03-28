import selectors from "../../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../../redux/entry-actions";
import {connect} from "react-redux";
import React, {useCallback} from "react";
import {usePopup} from "../../../lib/use-popup";
import NotificationsStep from "./NotificationsStep/NotificationsStep";
import UserStep from "./UserStep/UserStep";
import styles from "./index.module.scss";
import {Button, Icon, Menu} from "semantic-ui-react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Paths from "../../../constants/Paths";
import {Link} from 'react-router-dom';

const POPUP_PROPS = {
  position: 'bottom right',
};

const Header = React.memo(
  ({
     project,
     user,
     notifications,
     isLogOuting,
     canEditProject,
     canEditUsers,
     onProjectSettingsClick,
     onUsersClick,
     onNotificationDelete,
     onUserSettingsClick,
     onLogout,
     openDrawer
   }) => {
    const NotificationsPopup = usePopup(NotificationsStep, POPUP_PROPS);
    const UserPopup = usePopup(UserStep, POPUP_PROPS);

    const handleProjectSettingsClick = useCallback(() => {
      if (canEditProject) {
        onProjectSettingsClick();
      }
    }, [canEditProject, onProjectSettingsClick]);

    return (
      <div className={styles.wrapper} style={{marginLeft: project ? (openDrawer ? '0px' : '65px') : '0px'}}>
        <Menu inverted size="large" className={styles.menu}>
          {project &&
            <Menu.Menu position="left">
              <Menu.Item
                as={Link}
                to={Paths.PROJECTS_LIST}
                className={classNames(styles.item, styles.itemHoverable)}>
                <Icon name='arrow left'/>
              </Menu.Item>
              <Menu.Item className={classNames(styles.item, styles.title)}>
                {project.name}
                {canEditProject && (
                  <Button
                    className={classNames(styles.editButton, styles.target)}
                    onClick={handleProjectSettingsClick}
                  >
                    <Icon fitted name='pencil'/>
                  </Button>
                )}
              </Menu.Item>
            </Menu.Menu>
          }
          <Menu.Menu position="right">
            <NotificationsPopup items={notifications} onDelete={onNotificationDelete}>
              <Menu.Item className={classNames(styles.item, styles.itemHoverable)}>
                <Icon name='bell'/>
                {notifications.length > 0 && (
                  <span className={styles.notification}>{notifications.length}</span>
                )}
              </Menu.Item>
            </NotificationsPopup>
            <UserPopup
              isLogOuting={isLogOuting}
              onSettingsClick={onUserSettingsClick}
              onLogout={onLogout}
            >
              <Menu.Item className={classNames(styles.item, styles.itemHoverable)}>
                {user.name}
              </Menu.Item>
            </UserPopup>
          </Menu.Menu>
        </Menu>
      </div>
    );
  },
);

Header.propTypes = {
  project: PropTypes.object,
  user: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  isLogOuting: PropTypes.bool.isRequired,
  canEditProject: PropTypes.bool.isRequired,
  canEditUsers: PropTypes.bool.isRequired,
  onProjectSettingsClick: PropTypes.func.isRequired,
  onUsersClick: PropTypes.func.isRequired,
  onNotificationDelete: PropTypes.func.isRequired,
  onUserSettingsClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

Header.defaultProps = {
  project: undefined,
}

const mapStateToProps = (state) => {
  const currentProject = selectors.selectCurrentProject(state);
  const isLogOuting = selectors.selectIsLogOuting(state);
  const currentUser = selectors.selectCurrentUser(state);
  const notifications = selectors.selectNotificationsForCurrentUser(state);
  const isCurrentUserManager = selectors.selectIsCurrentUserManagerForCurrentProject(state);

  return {
    notifications,
    isLogOuting,
    project: currentProject,
    user: currentUser,
    canEditUsers: currentUser.isAdmin,
    canEditProject: isCurrentUserManager,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onProjectSettingsClick: entryActions.openProjectSettingsModal,
      onUsersClick: entryActions.openUsersModal,
      onNotificationDelete: entryActions.deleteNotification,
      onUserSettingsClick: entryActions.openUserSettingsModal,
      onLogout: entryActions.logout,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
