import {createSelector} from 'redux-orm';

import orm from '../orm';
import {isLocalId} from '../../lib/utils/local-id';
import {selectPath} from "./router";

export const makeSelectListById = () =>
    createSelector(
        orm,
        (_, id) => id,
        ({List}, id) => {
            const listModel = List.withId(id);

            if (!listModel) {
                return listModel;
            }

            return {
                ...listModel.ref,
                isPersisted: !isLocalId(id),
            };
        },
    );

export const selectListById = makeSelectListById();

export const makeSelectCardIdsByListId = () =>
    createSelector(
        orm,
        (_, id) => id,
        ({List}, id) => {
            const listModel = List.withId(id);

            if (!listModel) {
                return listModel;
            }

            return listModel.getFilteredOrderedCardsModelArray().map((cardModel) => cardModel.id);
        },
    )

export const makeSelectCardForGanttByListId = () =>
    createSelector(
        orm,
        (_, id) => id,
        ({List}, id) => {
            const listModel = List.withId(id);

            if (!listModel) {
                return listModel;
            }

            return listModel.getFilteredOrderedCardsModelArray().map(function (cardModel) {
                    return ({
                        id: cardModel.id,
                        name: cardModel.name,
                        startDate: cardModel.startDate,
                        dueDate: cardModel.dueDate,
                        gantt: cardModel.gantt
                    })
                }
            )
        },
    )

export const makeSelectCardByListId = () =>
    createSelector(
        orm,
        (_, id) => id,
        ({List}, id) => {
            const listModel = List.withId(id);

            if (!listModel) {
                return listModel;
            }

            return listModel.getFilteredOrderedCardsModelArray().map(function (cardModel) {
                    return (cardModel)
                }
            )
        },
    )

export const selectCardIdsByListId = makeSelectCardIdsByListId();

export default {
    makeSelectListById,
    selectListById,
    makeSelectCardIdsByListId,
    selectCardIdsByListId,
    makeSelectCardForGanttByListId,
    makeSelectCardByListId,
};
