import selectors from "../../redux/selectors";
import {bindActionCreators} from "redux";
import entryActions from "../../redux/entry-actions";
import {connect} from "react-redux";
import React, {useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Button, Modal, Table} from "semantic-ui-react";
import Item from "./Item/Item";
import PropTypes from "prop-types";
import {usePopup} from "../../lib/use-popup";
import UserAddStep from "../UserAddStep";
const UsersModal = React.memo(
    ({
         items,
         onUpdate,
         onUsernameUpdate,
         onUsernameUpdateMessageDismiss,
         onEmailUpdate,
         onEmailUpdateMessageDismiss,
         onPasswordUpdate,
         onPasswordUpdateMessageDismiss,
         onDelete,
         onClose,
     }) => {
        const [t] = useTranslation();

        const handleUpdate = useCallback(
            (id, data) => {
                onUpdate(id, data);
            },
            [onUpdate],
        );

        const handleUsernameUpdate = useCallback(
            (id, data) => {
                onUsernameUpdate(id, data);
            },
            [onUsernameUpdate],
        );

        const handleUsernameUpdateMessageDismiss = useCallback(
            (id) => {
                onUsernameUpdateMessageDismiss(id);
            },
            [onUsernameUpdateMessageDismiss],
        );

        const handleEmailUpdate = useCallback(
            (id, data) => {
                onEmailUpdate(id, data);
            },
            [onEmailUpdate],
        );

        const handleEmailUpdateMessageDismiss = useCallback(
            (id) => {
                onEmailUpdateMessageDismiss(id);
            },
            [onEmailUpdateMessageDismiss],
        );

        const handlePasswordUpdate = useCallback(
            (id, data) => {
                onPasswordUpdate(id, data);
            },
            [onPasswordUpdate],
        );

        const handlePasswordUpdateMessageDismiss = useCallback(
            (id) => {
                onPasswordUpdateMessageDismiss(id);
            },
            [onPasswordUpdateMessageDismiss],
        );

        const handleDelete = useCallback(
            (id) => {
                onDelete(id);
            },
            [onDelete],
        );

        const UserAddPopupContainer = usePopup(UserAddStep);

        return (
          <Modal open closeIcon={{ style: { top: '0.5rem', right: '0.5rem' }, color: 'black', name: 'close' }} size="small" centered={false} onClose={onClose}>
                <Modal.Header>
                    {t('common.users', {
                        context: 'title',
                    })}
                </Modal.Header>
                <Modal.Content scrolling>
                    <Table unstackable basic="very">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell width={4}>{t('common.name')}</Table.HeaderCell>
                                <Table.HeaderCell width={4}>{t('common.username')}</Table.HeaderCell>
                                <Table.HeaderCell width={4}>{t('common.email')}</Table.HeaderCell>
                                <Table.HeaderCell>{t('common.administrator')}</Table.HeaderCell>
                                <Table.HeaderCell />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map((item) => (
                                <Item
                                    key={item.id}
                                    email={item.email}
                                    username={item.username}
                                    name={item.name}
                                    avatarUrl={item.avatarUrl}
                                    organization={item.organization}
                                    phone={item.phone}
                                    isAdmin={item.isAdmin}
                                    isLocked={item.isLocked}
                                    isRoleLocked={item.isRoleLocked}
                                    isDeletionLocked={item.isDeletionLocked}
                                    emailUpdateForm={item.emailUpdateForm}
                                    passwordUpdateForm={item.passwordUpdateForm}
                                    usernameUpdateForm={item.usernameUpdateForm}
                                    onUpdate={(data) => handleUpdate(item.id, data)}
                                    onUsernameUpdate={(data) => handleUsernameUpdate(item.id, data)}
                                    onUsernameUpdateMessageDismiss={() => handleUsernameUpdateMessageDismiss(item.id)}
                                    onEmailUpdate={(data) => handleEmailUpdate(item.id, data)}
                                    onEmailUpdateMessageDismiss={() => handleEmailUpdateMessageDismiss(item.id)}
                                    onPasswordUpdate={(data) => handlePasswordUpdate(item.id, data)}
                                    onPasswordUpdateMessageDismiss={() => handlePasswordUpdateMessageDismiss(item.id)}
                                    onDelete={() => handleDelete(item.id)}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <UserAddPopupContainer>
                        <Button positive content={t('action.addUser')} />
                    </UserAddPopupContainer>
                </Modal.Actions>
            </Modal>
        );
    },
)

UsersModal.propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onUpdate: PropTypes.func.isRequired,
    onUsernameUpdate: PropTypes.func.isRequired,
    onUsernameUpdateMessageDismiss: PropTypes.func.isRequired,
    onEmailUpdate: PropTypes.func.isRequired,
    onEmailUpdateMessageDismiss: PropTypes.func.isRequired,
    onPasswordUpdate: PropTypes.func.isRequired,
    onPasswordUpdateMessageDismiss: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    const users = selectors.selectUsersExceptCurrent(state);

    return {
        items: users,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onUpdate: entryActions.updateUser,
            onUsernameUpdate: entryActions.updateUserUsername,
            onUsernameUpdateMessageDismiss: entryActions.clearUserUsernameUpdateError,
            onEmailUpdate: entryActions.updateUserEmail,
            onEmailUpdateMessageDismiss: entryActions.clearUserEmailUpdateError,
            onPasswordUpdate: entryActions.updateUserPassword,
            onPasswordUpdateMessageDismiss: entryActions.clearUserPasswordUpdateError,
            onDelete: entryActions.deleteUser,
            onClose: entryActions.closeModal,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(UsersModal);
