import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Form, Header, Modal} from 'semantic-ui-react';
import {Input} from '../../../lib';
import {useForm} from '../../../lib/hooks-ui';
import styles from './index.module.scss';
import {bindActionCreators} from "redux";
import entryActions from "../../../redux/entry-actions";
import {connect} from "react-redux";

const ProjectAddModal = React.memo(({defaultData, isSubmitting, onCreate, onClose}) => {
    const [t] = useTranslation();

    const [data, handleFieldChange] = useForm(() => ({
        name: '',
        ...defaultData,
    }));

    const nameField = useRef(null);

    const handleSubmit = useCallback(() => {
        const cleanData = {
            ...data,
            name: data.name.trim(),
        };

        if (!cleanData.name) {
            nameField.current.select();
            return;
        }

        onCreate(cleanData);
    }, [onCreate, data]);

    useEffect(() => {
        nameField.current.focus();
    }, []);

    return (
        <Modal open closeIcon={{ style: { top: '0.5rem', right: '0.5rem' }, color: 'black', name: 'close' }} size="tiny" onClose={onClose} style={{padding: 10}}>
            <Modal.Content>
                <Header size="huge">
                    {t('common.createProject', {
                        context: 'title',
                    })}
                </Header>
                <p>{t('common.enterProjectTitle')}</p>
                <Form onSubmit={handleSubmit}>
                    <Input
                        fluid
                        inverted
                        ref={nameField}
                        name="name"
                        value={data.name}
                        readOnly={isSubmitting}
                        className={styles.field}
                        onChange={handleFieldChange}
                    />
                    <Button
                        inverted
                        color="green"
                        icon="checkmark"
                        content={t('action.createProject')}
                        floated="right"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </Form>
            </Modal.Content>
        </Modal>
    );
});

ProjectAddModal.propTypes = {
    defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isSubmitting: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({
                             ui: {
                                 projectCreateForm: {data: defaultData, isSubmitting},
                             },
                         }) => ({
    defaultData,
    isSubmitting,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onCreate: entryActions.createProject,
            onClose: entryActions.closeModal,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAddModal);
