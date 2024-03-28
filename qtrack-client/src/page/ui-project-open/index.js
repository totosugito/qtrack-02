import selectors from "../../redux/selectors";
import {connect} from "react-redux";
import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import BaseProject from "../base-project";
import {Icon} from "semantic-ui-react";
import BoardToolbar from "../../view/BoardToolbar";

function UiProjectOpen({projectId, board}) {
    const [t] = useTranslation();
    if (projectId === null) {
        return (
            <>
                <BaseProject>
                    <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
                        <div className={styles.message}>
                            <Icon name='unlink' size='huge'/>
                            <h1>
                                {t('common.projectNotFound', {
                                    context: 'title',
                                })}
                            </h1>
                        </div>
                    </div>
                </BaseProject>
            </>
        );
    }

    if (board === undefined) {
        return (
            <>
                <BaseProject>
                    <div style={{height: '100%'}}>
                        <div>
                            {projectId && <BoardToolbar/>}
                        </div>

                        <div className={classNames(styles.wrapper, styles.wrapperFlex)}>
                            <div className={styles.message}>
                                <Icon name='hand point up outline' size='huge'/>
                                <h1 className={styles.messageTitle}>
                                    {t('common.openBoard', {
                                        context: 'title',
                                    })}
                                </h1>
                                <div className={styles.messageContent}>
                                    <Trans i18nKey="common.createNewOneOrSelectExistingOne"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseProject>
            </>
        );
    }

    return (
        <>
        </>
    )
}

const mapStateToProps = (state) => {
    const {projectId} = selectors.selectPath(state);
    const currentBoard = selectors.selectCurrentBoard(state);

    return {
        projectId,
        board: currentBoard,
    };
};

export default connect(mapStateToProps)(UiProjectOpen);
