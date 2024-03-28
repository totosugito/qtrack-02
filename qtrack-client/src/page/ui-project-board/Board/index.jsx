import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {closePopup} from '../../../lib/use-popup';

import DroppableTypes from '../../../constants/DroppableTypes';
import ListAdd from './ListAdd';
import styles from './index.module.scss';
import selectors from "../../../redux/selectors";
import {BoardMembershipRoles} from "../../../constants/Enums";
import {bindActionCreators} from "redux";
import entryActions from "../../../redux/entry-actions";
import {connect} from "react-redux";
import List from "../List";
import CardModal from "../CardModal";
import {Icon} from "semantic-ui-react";

const parseDndId = (dndId) => dndId.split(':')[1];

const Board = React.memo(
    ({listIds, isCardModalOpened, canEdit, onListCreate, onListMove, onCardMove}) => {
        const [t] = useTranslation();
        const [isListAddOpened, setIsListAddOpened] = useState(false);

        const wrapper = useRef(null);
        const prevPosition = useRef(null);

        const handleAddListClick = useCallback(() => {
            setIsListAddOpened(true);
        }, []);

        const handleAddListClose = useCallback(() => {
            setIsListAddOpened(false);
        }, []);

        const handleDragStart = useCallback(() => {
            closePopup();
        }, []);

        const handleDragEnd = useCallback(
            ({draggableId, type, source, destination}) => {
                if (
                    !destination ||
                    (source.droppableId === destination.droppableId && source.index === destination.index)
                ) {
                    return;
                }

                const id = parseDndId(draggableId);

                switch (type) {
                    case DroppableTypes.LIST:
                        onListMove(id, destination.index);

                        break;
                    case DroppableTypes.CARD:
                        onCardMove(id, parseDndId(destination.droppableId), destination.index);

                        break;
                    default:
                }
            },
            [onListMove, onCardMove],
        );

        const handleMouseDown = useCallback(
            (event) => {
                // If button is defined and not equal to 0 (left click)
                if (event.button) {
                    return;
                }

                if (event.target !== wrapper.current && !event.target.dataset.dragScroller) {
                    return;
                }

                prevPosition.current = event.clientX;
            },
            [wrapper],
        );

        const handleWindowMouseMove = useCallback(
            (event) => {
                if (!prevPosition.current) {
                    return;
                }

                event.preventDefault();

                window.scrollBy({
                    left: prevPosition.current - event.clientX,
                });

                prevPosition.current = event.clientX;
            },
            [prevPosition],
        );

        const handleWindowMouseUp = useCallback(() => {
            prevPosition.current = null;
        }, [prevPosition]);

        useEffect(() => {
            document.body.style.overflowX = 'auto';

            return () => {
                document.body.style.overflowX = null;
            };
        }, []);

        useEffect(() => {
            if (isListAddOpened) {
                window.scroll(document.body.scrollWidth, 0);
            }
        }, [listIds, isListAddOpened]);

        useEffect(() => {
            window.addEventListener('mouseup', handleWindowMouseUp);
            window.addEventListener('mousemove', handleWindowMouseMove);

            return () => {
                window.removeEventListener('mouseup', handleWindowMouseUp);
                window.removeEventListener('mousemove', handleWindowMouseMove);
            };
        }, [handleWindowMouseUp, handleWindowMouseMove]);

        return (
            <>
                <div ref={wrapper} className={styles.wrapper} onMouseDown={handleMouseDown}>
                    <div>
                        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                            <Droppable droppableId="board" type={DroppableTypes.LIST} direction="horizontal">
                                {({innerRef, droppableProps, placeholder}) => (
                                    <div
                                        {...droppableProps}
                                        data-drag-scroller
                                        ref={innerRef}
                                        className={styles.lists}>
                                        {listIds.map((listId, index) => (
                                            <List key={listId} id={listId} index={index}/>
                                        ))}
                                        {placeholder}
                                        {canEdit && (
                                            <div data-drag-scroller className={styles.list}>
                                                {isListAddOpened ? (
                                                    <ListAdd onCreate={onListCreate} onClose={handleAddListClose}/>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className={styles.addListButton}
                                                        onClick={handleAddListClick}
                                                    >
                                                        <Icon name='plus' style={{marginRight: '5px'}}/>
                                                        <span className={styles.addListButtonText}>
                              {listIds.length > 0
                                  ? t('action.addAnotherList')
                                  : t('action.addList')}
                            </span>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                {isCardModalOpened && <CardModal/>}
            </>
        );
    },
);

Board.propTypes = {
    listIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    isCardModalOpened: PropTypes.bool.isRequired,
    canEdit: PropTypes.bool.isRequired,
    onListCreate: PropTypes.func.isRequired,
    onListMove: PropTypes.func.isRequired,
    onCardMove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const {cardId} = selectors.selectPath(state);
    const currentUserMembership = selectors.selectCurrentUserMembershipForCurrentBoard(state);
    const listIds = selectors.selectListIdsForCurrentBoard(state);

    const isCurrentUserEditor =
        !!currentUserMembership && currentUserMembership.role === BoardMembershipRoles.EDITOR;

    return {
        listIds,
        isCardModalOpened: !!cardId,
        canEdit: isCurrentUserEditor,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onListCreate: entryActions.createListInCurrentBoard,
            onListMove: entryActions.moveList,
            onCardMove: entryActions.moveCard,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(Board);
