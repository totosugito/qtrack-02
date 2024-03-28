import LoginForm from "./component/login-form";
import {connect} from "react-redux";
import React from "react";
import entryActions from "../../redux/entry-actions";
import selectors from "../../redux/selectors";
import {bindActionCreators} from "redux";
import {Grid, Header} from "semantic-ui-react";
import classNames from "classnames";
import styles from './index.module.scss';
import {useTranslation} from "react-i18next";
import {CircularProgress} from "@mui/material";

const UiLogin = React.memo(({ isInitializing,
                                defaultData,
                                isSubmitting,
                                error,
                                onAuthenticate,
                                onMessageDismiss}) => {
    const [t] = useTranslation();

    return (
        <>
            <div className={classNames(styles.wrapper, styles.fullHeight)}>
                <Grid verticalAlign="middle" className={styles.fullHeightPaddingFix}>
                    <Grid.Column widescreen={4} largeScreen={5} computer={6} tablet={16} mobile={16}>
                        <Grid verticalAlign="middle" className={styles.fullHeightPaddingFix}>
                            {isInitializing ? <CircularProgress/> : <LoginForm msg={error} onSubmit={onAuthenticate}/>}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column
                        widescreen={12}
                        largeScreen={11}
                        computer={10}
                        only="computer"
                        className={classNames(styles.cover, styles.fullHeight)}
                    >
                        <div className={styles.descriptionWrapperOverlay} />
                        <div className={styles.descriptionWrapper}>
                            <Header inverted as="h1" content="QTrack" className={styles.descriptionTitle} />
                            <Header
                                inverted
                                as="h2"
                                content={t('common.projectManagement')}
                                className={styles.descriptionSubtitle}
                            />
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
            {/*<AuthFooter/>*/}
        </>)
})

const mapStateToProps = (state) => {
    const {
        ui: {
            authenticateForm: { data: defaultData, isSubmitting, error },
        },
    } = state;

    const isInitializing = selectors.selectIsInitializing(state);
    return {
        isInitializing,
        defaultData,
        isSubmitting,
        error,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onAuthenticate: entryActions.authenticate,
            onMessageDismiss: entryActions.clearAuthenticateError,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(UiLogin);
