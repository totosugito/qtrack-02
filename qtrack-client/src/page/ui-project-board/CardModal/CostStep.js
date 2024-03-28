//
//
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Input, Popup} from '../../../lib';
import styles from './CostStep.module.scss'

const CostStep = React.memo(({defaultValue, onUpdate, onBack, onClose}) => {
    const [t] = useTranslation();
    const [isEnable, setIsEnable] = useState(defaultValue.isEnable)
    const [budget, setBudget] = useState(defaultValue.budget ?? 0)
    const [expense, setExpense] = useState(defaultValue.expense)

    const handleSubmit = () => {
        const cleanData = {
            isEnable: isEnable,
            budget: budget*1.0,
            expense: expense*1.0
        }
        onUpdate(cleanData);
        onClose();
    }

    const handleToggleChange = () => {
        setIsEnable(!isEnable)
    }

    const handleInputBudget = (e, {value}) => {
        // Remove non-numeric characters using regex
        let numericValue = value.replace(/[^\d.]/g, '')
        setBudget(numericValue)
    }
    const handleInputExpense = (e, {value}) => {
        // Remove non-numeric characters using regex
        let numericValue = value.replace(/[^\d.]/g, '')
        setExpense(numericValue)
    }

    return (
        <>
            <Popup.Header onBack={onBack}>
                {t('common.costAction')}
            </Popup.Header>
            <Popup.Content>
                <Form onSubmit={handleSubmit}>
                    <div className={styles.divGroup}>
                         <span>
                            {t('common.costBudget')}
                        </span>
                        <Input
                          disabled={!isEnable}
                          className={styles.inputText}
                          fluid
                          size='small'
                          value={budget}
                          onChange={handleInputBudget}
                        />
                    </div>
                    <div className={styles.divGroup}>
                         <span>
                            {t('common.costExpense')}
                        </span>
                        <Input
                          disabled={!isEnable}
                          className={styles.inputText}
                          fluid
                          size='small'
                          value={expense}
                          onChange={handleInputExpense}
                        />
                    </div>
                    <div className={styles.divGroup}>
                        <Checkbox
                          checked={isEnable}
                          className={styles.checkbox}
                          onChange={handleToggleChange}
                        />
                        <span onClick={handleToggleChange}>
                        {t('common.costEnable')}
                        </span>
                    </div>
                    <div className={styles.divButton}>
                        <Button positive content={t('action.save')}/>
                    </div>
                </Form>
            </Popup.Content>
        </>
    )

})

CostStep.propTypes = {
    defaultValue: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    onUpdate: PropTypes.func.isRequired,
    onBack: PropTypes.func,
    onClose: PropTypes.func.isRequired,
};

CostStep.defaultProps = {
    onBack: undefined,
};

export default CostStep;
