import selectors from "../../../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../../../redux/entry-actions";
import {connect} from "react-redux";
import UserSettingsModal from "./UserSettingsModal";

const mapStateToProps = (state) => {
    let {
        email,
        name,
        username,
        avatarUrl,
        phone,
        organization,
        language,
        subscribeToOwnCards,
        isLocked,
        isAvatarUpdating,
        emailUpdateForm,
        passwordUpdateForm,
        usernameUpdateForm,
    } = selectors.selectCurrentUser(state);

    if(subscribeToOwnCards===undefined)
      subscribeToOwnCards = false

    return {
        email,
        name,
        username,
        avatarUrl,
        phone,
        organization,
        language,
        subscribeToOwnCards,
        isLocked,
        isAvatarUpdating,
        emailUpdateForm,
        passwordUpdateForm,
        usernameUpdateForm,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onUpdate: entryActions.updateCurrentUser,
            onAvatarUpdate: entryActions.updateCurrentUserAvatar,
            onLanguageUpdate: entryActions.updateCurrentUserLanguage,
            onUsernameUpdate: entryActions.updateCurrentUserUsername,
            onUsernameUpdateMessageDismiss: entryActions.clearCurrentUserUsernameUpdateError,
            onEmailUpdate: entryActions.updateCurrentUserEmail,
            onEmailUpdateMessageDismiss: entryActions.clearCurrentUserEmailUpdateError,
            onPasswordUpdate: entryActions.updateCurrentUserPassword,
            onPasswordUpdateMessageDismiss: entryActions.clearCurrentUserPasswordUpdateError,
            onClose: entryActions.closeModal,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);
