import pick from 'lodash/pick';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {Divider, Menu} from 'semantic-ui-react';
import { Popup } from '../../lib';

import { useSteps } from '../../lib/hooks-ui';
import BoardMembershipsStep from '../../page/ui-project-board/BoardMembershipsStep';
import LabelsStep from '../LabelsStep';
import StopwatchEditStep from '../StopwatchEditStep';
import CardMoveStep from '../CardMoveStep';
import DeleteStep from '../DeleteStep';

import styles from './ActionsStep.module.scss';
import DateTimeRangeStep from "../DateTimeRangeStep";
import GanttCardLabelStep from "../GanttCardLabelStep";

const StepTypes = {
  USERS: 'USERS',
  LABELS: 'LABELS',
  EDIT_DUE_DATE: 'EDIT_DUE_DATE',
  EDIT_STOPWATCH: 'EDIT_STOPWATCH',
  MOVE: 'MOVE',
  DELETE: 'DELETE',
  GANTT: 'GANTT',
};

const ActionsStep = React.memo(
  ({
    card,
    projectsToLists,
    boardMemberships,
    currentUserIds,
    labels,
    currentLabelIds,
    onNameEdit,
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
    onClose,
  }) => {
    const [t] = useTranslation();
    const [step, openStep, handleBack] = useSteps();

    const handleEditNameClick = useCallback(() => {
      onNameEdit();
      onClose();
    }, [onNameEdit, onClose]);

    const handleUsersClick = useCallback(() => {
      openStep(StepTypes.USERS);
    }, [openStep]);

    const handleLabelsClick = useCallback(() => {
      openStep(StepTypes.LABELS);
    }, [openStep]);

    const handleEditDueDateClick = useCallback(() => {
      openStep(StepTypes.EDIT_DUE_DATE);
    }, [openStep]);

    const handleEditStopwatchClick = useCallback(() => {
      openStep(StepTypes.EDIT_STOPWATCH);
    }, [openStep]);

    const handleEditGanttClick = useCallback(() => {
      openStep(StepTypes.GANTT);
    }, [openStep]);

    const handleMoveClick = useCallback(() => {
      openStep(StepTypes.MOVE);
    }, [openStep]);

    const handleDeleteClick = useCallback(() => {
      openStep(StepTypes.DELETE);
    }, [openStep]);

    const handleDueDateUpdate = useCallback(
      (startDate, dueDate) => {
        onUpdate({
          startDate,
          dueDate,
        });
      },
      [onUpdate],
    );

    const handleGanttUpdate = useCallback(
      (gantt) => {
        onUpdate({
          gantt
        })
      },
      [onUpdate],
    )

    const handleStopwatchUpdate = useCallback(
      (stopwatch) => {
        onUpdate({
          stopwatch,
        });
      },
      [onUpdate],
    );

    if (step) {
      switch (step.type) {
        case StepTypes.USERS:
          return (
            <BoardMembershipsStep
              items={boardMemberships}
              currentUserIds={currentUserIds}
              onUserSelect={onUserAdd}
              onUserDeselect={onUserRemove}
              onBack={handleBack}
            />
          );
        case StepTypes.LABELS:
          return (
            <LabelsStep
              items={labels}
              currentIds={currentLabelIds}
              onSelect={onLabelAdd}
              onDeselect={onLabelRemove}
              onCreate={onLabelCreate}
              onUpdate={onLabelUpdate}
              onMove={onLabelMove}
              onDelete={onLabelDelete}
              onBack={handleBack}
            />
          );
        case StepTypes.EDIT_DUE_DATE:
          return (
            <DateTimeRangeStep startDate={card.startDate} dueDate={card.dueDate} onUpdate={handleDueDateUpdate} onClose={onClose}/>
          );
        case StepTypes.EDIT_STOPWATCH:
          return (
            <StopwatchEditStep
              defaultValue={card.stopwatch}
              onUpdate={handleStopwatchUpdate}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        case StepTypes.GANTT:
          return (
            <GanttCardLabelStep defaultValue={card.gantt} onUpdate={handleGanttUpdate} onClose={onClose}/>
          );
        case StepTypes.MOVE:
          return (
            <CardMoveStep
              projectsToLists={projectsToLists}
              defaultPath={pick(card, ['projectId', 'boardId', 'listId'])}
              onMove={onMove}
              onTransfer={onTransfer}
              onBoardFetch={onBoardFetch}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        case StepTypes.DELETE:
          return (
            <DeleteStep
              title="common.deleteCard"
              content="common.areYouSureYouWantToDeleteThisCard"
              buttonContent="action.deleteCard"
              onConfirm={onDelete}
              onBack={handleBack}
            />
          );
        default:
      }
    }

    return (
      <>
        <Popup.Header>
          {t('common.cardActions', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          <Menu secondary vertical className={styles.menu}>
            <Menu.Item className={styles.menuItem} onClick={handleEditNameClick}>
              {t('action.editTitle', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleUsersClick}>
              {t('common.members', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleLabelsClick}>
              {t('common.labels', {
                context: 'title',
              })}
            </Menu.Item>
            <Divider fitted/>
            <Menu.Item className={styles.menuItem} onClick={handleEditDueDateClick}>
              {t('action.editDateRange', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleEditStopwatchClick}>
              {t('action.editStopwatch', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleEditGanttClick}>
              {t('action.ganttEdit')}
            </Menu.Item>
            <Divider fitted/>
            <Menu.Item className={styles.menuItem} onClick={handleMoveClick}>
              {t('action.moveCard', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleDeleteClick}>
              {t('action.deleteCard', {
                context: 'title',
              })}
            </Menu.Item>
          </Menu>
        </Popup.Content>
      </>
    );
  },
);

ActionsStep.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  card: PropTypes.object.isRequired,
  projectsToLists: PropTypes.array.isRequired,
  boardMemberships: PropTypes.array.isRequired,
  currentUserIds: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  currentLabelIds: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onNameEdit: PropTypes.func.isRequired,
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
  onClose: PropTypes.func.isRequired,
};

export default ActionsStep;
