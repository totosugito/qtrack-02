import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Draggable} from 'react-beautiful-dnd';
import {usePopup} from '../../lib/use-popup';

import {startStopwatch, stopStopwatch} from '../../lib/utils/stopwatch';
import Paths from '../../constants/Paths';
import Tasks from './Tasks';
import NameEdit from './NameEdit';
import ActionsStep from './ActionsStep';
import User from '../User';
import Label from '../Label';
import Stopwatch from '../Stopwatch';

import styles from './index.module.scss';
import selectors from "../../redux/selectors";
import {BoardMembershipRoles} from "../../constants/Enums";
import {bindActionCreators} from "redux";
import entryActions from "../../redux/entry-actions";
import {connect} from "react-redux";
import DateTimeRange from "../DateTimeRange";
import GanttCardLabel from "../GanttCardLabel";

const Card = React.memo(
  ({
     gantt,
     id,
     index,
     name,
     startDate,
     dueDate,
     stopwatch,
     coverUrl,
     boardId,
     listId,
     projectId,
     isPersisted,
     notificationsTotal,
     users,
     labels,
     tasks,
     allProjectsToLists,
     allBoardMemberships,
     allLabels,
     canEdit,
     onUpdate,
     onMove,
     onTransfer,
     onDelete,
     onUserAdd,
     onUserRemove,
     onBoardFetch,
     onLabelAdd,
     onLabelRemove,
     onLabelCreate,
     onLabelUpdate,
     onLabelMove,
     onLabelDelete,
   }) => {
    const nameEdit = useRef(null);

    const handleClick = useCallback(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, []);

    const handleToggleStopwatchClick = useCallback(
      (event) => {
        event.preventDefault();

        onUpdate({
          stopwatch: stopwatch.startedAt ? stopStopwatch(stopwatch) : startStopwatch(stopwatch),
        });
      },
      [stopwatch, onUpdate],
    );

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleNameEdit = useCallback(() => {
      nameEdit.current.open();
    }, []);

    const ActionsPopup = usePopup(ActionsStep);

    const contentNode = (
      <>
        {coverUrl && <img src={coverUrl} alt="" className={styles.cover}/>}
        <div className={styles.details}>
          {labels.length > 0 && (
            <span className={styles.labels}>
              {labels.map((label) => (
                <span
                  key={label.id}
                  className={classNames(styles.attachment, styles.attachmentLeft)}
                >
                  <Label name={label.name} color={label.color} size="tiny"/>
                </span>
              ))}
            </span>
          )}
          {gantt &&
            <GanttCardLabel gantt={gantt} size="tiny"/>
          }
          <div className={styles.name}>{name}</div>
          {tasks.length > 0 && <Tasks items={tasks}/>}
          {(dueDate || stopwatch || notificationsTotal > 0) && (
            <span className={styles.attachments}>
              {notificationsTotal > 0 && (
                <span
                  className={classNames(
                    styles.attachment,
                    styles.attachmentLeft,
                    styles.notification,
                  )}
                >
                  {notificationsTotal}
                </span>
              )}
              {(startDate && dueDate) && (
                <span className={classNames(styles.attachment, styles.attachmentLeft)}>
                  <DateTimeRange startDate={startDate} dueDate={dueDate} size="tiny"/>
                </span>
              )}
              {stopwatch && (
                <span className={classNames(styles.attachment, styles.attachmentLeft)}>
                  <Stopwatch
                    as="span"
                    startedAt={stopwatch.startedAt}
                    total={stopwatch.total}
                    size="tiny"
                    onClick={canEdit ? handleToggleStopwatchClick : undefined}
                  />
                </span>
              )}
            </span>
          )}
          {users.length > 0 && (
            <span className={classNames(styles.attachments, styles.attachmentsRight)}>
              {users.map((user) => (
                <span
                  key={user.id}
                  className={classNames(styles.attachment, styles.attachmentRight)}
                >
                  <User name={user.name} avatarUrl={user.avatarUrl} size="small"/>
                </span>
              ))}
            </span>
          )}
        </div>
      </>
    );

    return (
      <Draggable draggableId={`card:${id}`} index={index} isDragDisabled={!isPersisted || !canEdit}>
        {({innerRef, draggableProps, dragHandleProps}) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <div {...draggableProps} {...dragHandleProps} ref={innerRef} className={styles.wrapper}>
            <NameEdit ref={nameEdit} defaultValue={name} onUpdate={handleNameUpdate}>
              <div className={styles.card}>
                {isPersisted ? (
                  <>
                    <Link
                      to={Paths.CARDS.replace(':id', id)}
                      className={styles.content}
                      onClick={handleClick}
                    >
                      {contentNode}
                    </Link>
                    {canEdit && (
                      <ActionsPopup
                        card={{
                          startDate,
                          dueDate,
                          stopwatch,
                          boardId,
                          listId,
                          projectId,
                          gantt
                        }}
                        projectsToLists={allProjectsToLists}
                        boardMemberships={allBoardMemberships}
                        currentUserIds={users.map((user) => user.id)}
                        labels={allLabels}
                        currentLabelIds={labels.map((label) => label.id)}
                        onNameEdit={handleNameEdit}
                        onUpdate={onUpdate}
                        onMove={onMove}
                        onTransfer={onTransfer}
                        onDelete={onDelete}
                        onUserAdd={onUserAdd}
                        onUserRemove={onUserRemove}
                        onBoardFetch={onBoardFetch}
                        onLabelAdd={onLabelAdd}
                        onLabelRemove={onLabelRemove}
                        onLabelCreate={onLabelCreate}
                        onLabelUpdate={onLabelUpdate}
                        onLabelMove={onLabelMove}
                        onLabelDelete={onLabelDelete}
                      >
                        <Button className={classNames(styles.actionsButton, styles.target)} icon='pencil'/>
                      </ActionsPopup>
                    )}
                  </>
                ) : (
                  <span className={styles.content}>{contentNode}</span>
                )}
              </div>
            </NameEdit>
          </div>
        )}
      </Draggable>
    );
  },
);

Card.propTypes = {
  gantt: PropTypes.object,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date),
  dueDate: PropTypes.instanceOf(Date),
  stopwatch: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  coverUrl: PropTypes.string,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  notificationsTotal: PropTypes.number.isRequired,
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  allProjectsToLists: PropTypes.array.isRequired,
  allBoardMemberships: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  canEdit: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onBoardFetch: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelMove: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
};

Card.defaultProps = {
  gantt: undefined,
  startDate: undefined,
  dueDate: undefined,
  stopwatch: undefined,
  coverUrl: undefined,
};

const makeMapStateToProps = () => {
  const selectCardById = selectors.makeSelectCardById();
  const selectUsersByCardId = selectors.makeSelectUsersByCardId();
  const selectLabelsByCardId = selectors.makeSelectLabelsByCardId();
  const selectTasksByCardId = selectors.makeSelectTasksByCardId();
  const selectNotificationsTotalByCardId = selectors.makeSelectNotificationsTotalByCardId();

  return (state, {id, index}) => {
    const {projectId} = selectors.selectPath(state);
    const allProjectsToLists = selectors.selectProjectsToListsForCurrentUser(state);
    const allBoardMemberships = selectors.selectMembershipsForCurrentBoard(state);
    const allLabels = selectors.selectLabelsForCurrentBoard(state);
    const currentUserMembership = selectors.selectCurrentUserMembershipForCurrentBoard(state);

    const {name, startDate, dueDate, stopwatch, coverUrl, boardId, listId, isPersisted, gantt} = selectCardById(
      state,
      id,
    );

    const users = selectUsersByCardId(state, id);
    const labels = selectLabelsByCardId(state, id);
    const tasks = selectTasksByCardId(state, id);
    const notificationsTotal = selectNotificationsTotalByCardId(state, id);

    const isCurrentUserEditor =
      !!currentUserMembership && currentUserMembership.role === BoardMembershipRoles.EDITOR;

    return {
      gantt,
      id,
      index,
      name,
      startDate,
      dueDate,
      stopwatch,
      coverUrl,
      boardId,
      listId,
      projectId,
      isPersisted,
      notificationsTotal,
      users,
      labels,
      tasks,
      allProjectsToLists,
      allBoardMemberships,
      allLabels,
      canEdit: isCurrentUserEditor,
    };
  };
};

const mapDispatchToProps = (dispatch, {id}) =>
  bindActionCreators(
    {
      onUpdate: (data) => entryActions.updateCard(id, data),
      onMove: (listId, index) => entryActions.moveCard(id, listId, index),
      onTransfer: (boardId, listId) => entryActions.transferCard(id, boardId, listId),
      onDelete: () => entryActions.deleteCard(id),
      onUserAdd: (userId) => entryActions.addUserToCard(userId, id),
      onUserRemove: (userId) => entryActions.removeUserFromCard(userId, id),
      onBoardFetch: entryActions.fetchBoard,
      onLabelAdd: (labelId) => entryActions.addLabelToCard(labelId, id),
      onLabelRemove: (labelId) => entryActions.removeLabelFromCard(labelId, id),
      onLabelCreate: (data) => entryActions.createLabelInCurrentBoard(data),
      onLabelUpdate: (labelId, data) => entryActions.updateLabel(labelId, data),
      onLabelMove: (labelId, index) => entryActions.moveLabel(labelId, index),
      onLabelDelete: (labelId) => entryActions.deleteLabel(labelId),
    },
    dispatch,
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(Card);
