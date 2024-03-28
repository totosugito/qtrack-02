import pick from 'lodash/pick';
import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Button} from 'semantic-ui-react';
import {closePopup, usePopup} from '../../lib/use-popup';

import Paths from '../../constants/Paths';
import DroppableTypes from '../../constants/DroppableTypes';
import AddStep from './AddStep';
import EditStep from './EditStep';

import styles from './index.module.scss';
import selectors from "../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../redux/entry-actions";
import {connect} from "react-redux";
import ProjectSettingsModal from "../ProjectSettingsModal";
import ModalTypes from "../../constants/ModalTypes";

const BoardToolbar = React.memo(({
                                   project,
                                   items,
                                   currentId,
                                   canEdit,
                                   onCreate,
                                   onUpdate,
                                   onMove,
                                   onDelete,
                                   isSettingsModalOpened
                                 }) => {
  const tabsWrapper = useRef(null);

  const handleWheel = useCallback(({deltaY}) => {
    tabsWrapper.current.scrollBy({
      left: deltaY,
    });
  }, []);

  const handleDragStart = useCallback(() => {
    closePopup();
  }, []);

  const handleDragEnd = useCallback(
    ({draggableId, source, destination}) => {
      if (!destination || source.index === destination.index) {
        return;
      }

      onMove(draggableId, destination.index);
    },
    [onMove],
  );

  const handleUpdate = useCallback(
    (id, data) => {
      onUpdate(id, data);
    },
    [onUpdate],
  );

  const handleDelete = useCallback(
    (id) => {
      onDelete(id);
    },
    [onDelete],
  );

  const AddPopup = usePopup(AddStep);
  const EditPopup = usePopup(EditStep);

  const itemsNode = items.map((item, index) => (
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
      isDragDisabled={!item.isPersisted || !canEdit}
    >
      {({innerRef, draggableProps, dragHandleProps}) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div {...draggableProps} ref={innerRef} className={styles.tabWrapper}>
          <div className={classNames(styles.tab, item.id === currentId && styles.tabActive)}>
            {item.isPersisted ? (
              <>
                <Link
                  {...dragHandleProps} // eslint-disable-line react/jsx-props-no-spreading
                  to={Paths.BOARDS.replace(':id', item.id)}
                  title={item.name}
                  className={styles.link}
                >
                  {item.name}
                </Link>
                {canEdit && (
                  <EditPopup
                    defaultData={pick(item, 'name')}
                    onUpdate={(data) => handleUpdate(item.id, data)}
                    onDelete={() => handleDelete(item.id)}
                  >
                    <Button className={classNames(styles.editButton, styles.target)} icon='pencil'>
                      {/*<EditIcon fontSize='small'/>*/}
                    </Button>
                  </EditPopup>
                )}
              </>
            ) : (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <span {...dragHandleProps} className={styles.link}>
                {item.name}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  ));

  const hasBg = () => {
    return (project && project.background)
  }

  return (
    <div className={hasBg() ? styles.toolbarHasBg : styles.toolbarHasNoBg}>
      <div className={styles.wrapper} onWheel={handleWheel}>
        <div ref={tabsWrapper} className={styles.tabsWrapper}>
          <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Droppable droppableId="boards" type={DroppableTypes.BOARD} direction="horizontal">
              {({innerRef, droppableProps, placeholder}) => (
                <div {...droppableProps} ref={innerRef} className={styles.tabs}>
                  {itemsNode}
                  {placeholder}
                  {canEdit && (
                    <AddPopup onCreate={onCreate}>
                      <Button className={styles.addButton} icon='plus'/>
                    </AddPopup>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {isSettingsModalOpened && <ProjectSettingsModal/>}
    </div>
  );
});

BoardToolbar.propTypes = {
  project: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  currentId: PropTypes.string,
  canEdit: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isSettingsModalOpened: PropTypes.bool.isRequired,
};

BoardToolbar.defaultProps = {
  currentId: undefined,
};

const mapStateToProps = (state) => {
  const {boardId} = selectors.selectPath(state);
  const boards = selectors.selectBoardsForCurrentProject(state);
  const isCurrentUserManager = selectors.selectIsCurrentUserManagerForCurrentProject(state);
  const currentModal = selectors.selectCurrentModal(state);
  const currentProject = selectors.selectCurrentProject(state);

  return {
    project: currentProject,
    items: boards,
    currentId: boardId,
    canEdit: isCurrentUserManager,
    isSettingsModalOpened: currentModal === ModalTypes.PROJECT_SETTINGS,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onCreate: entryActions.createBoardInCurrentProject,
      onUpdate: entryActions.updateBoard,
      onMove: entryActions.moveBoard,
      onDelete: entryActions.deleteBoard,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BoardToolbar);

