import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Checkbox, Dropdown, Form} from 'semantic-ui-react';
import {Input, Popup} from '../../lib';
import styles from './index.module.scss';

const GanttCardLabelStep = React.memo(({defaultValue, onUpdate, onBack, onClose}) => {
  const [t] = useTranslation();
  const [isEnable, setIsEnable] = useState(defaultValue.isEnable)
  const [progress, setProgress] = useState(defaultValue.progress)
  const stateOptions = [
    {
      key: 1,
      text: 'First',
      value: 'first'
    },
    {
      key: 2,
      text: 'Second',
      value: 'second'
    }
  ]

  const handleSubmit = () => {
    const cleanData = {
      isEnable: isEnable,
      progress: progress*1.0
    }
    onUpdate(cleanData);
    onClose();
  }

  const handleToggleChange = () => {
    setIsEnable(!isEnable)
  }

  const handleInputProgressChange = (e, {value}) => {
    // Remove non-numeric characters using regex
    let numericValue = value.replace(/[^\d.]/g, '')

    // Ensure the value is within the desired range (1 to 100 in this example)
    if (numericValue <= 100.0) {
      setProgress(numericValue);
    }
  }

  const [pred, setPred] = useState([])
  const handleChangePred = (e, { value }) => {
    setPred(value)
  }

  return (
    <>
      <Popup.Header onBack={onBack}>
        {t('common.gantt')}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.divGroup}>
              <span>
                      {t('common.setGanttProgress')}
              </span>
            <Input
                disabled={!isEnable}
                className={styles.inputText}
                fluid
                size='small'
                value={progress}
                onChange={handleInputProgressChange}
            />
          </div>
          <div className={styles.divGroup}>
            <span>
                      {t('common.predecessor')}
              </span>
            <Dropdown
                disabled={!isEnable}
                fluid
                multiple
                onChange={handleChangePred}
                options={stateOptions}
                placeholder='State'
                selection
                value={pred}
            />
          </div>
          <div className={styles.divGroup}>
            <Checkbox
                checked={isEnable}
                  className={styles.checkbox}
                  onChange={handleToggleChange}
              />
              <span onClick={handleToggleChange}>
                {t('common.showInTheGanttChart')}
              </span>
            </div>
            <div className={styles.divButton}>
              <Button positive content={t('action.save')}/>
            </div>
        </Form>
      </Popup.Content>
    </>
);
});

GanttCardLabelStep.propTypes = {
  defaultValue: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

GanttCardLabelStep.defaultProps = {
  onBack: undefined,
};

export default GanttCardLabelStep;
