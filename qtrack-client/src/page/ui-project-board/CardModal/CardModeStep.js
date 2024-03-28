import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Form} from 'semantic-ui-react';
import {Popup} from '../../../lib';
import styles from './CardModeStep.module.scss'
import {read, utils} from "xlsx";

const CardModeStep = React.memo(({onUpdate, onBack, onClose}) => {
  const defaultData = {
    description: "",
    cost: {
      isEnable: true,
      budget: 0.0,
      expense: 0.0
    },
  }
  const [t] = useTranslation();
  const [isValid, setIsValid] = useState(false)
  const [data, setData] = useState(defaultData)
  const [validFile, setValidFile] = useState(null)

  const handleSubmit = () => {
    const cleanData = {...data}
    onUpdate(cleanData, validFile);
    onClose();
  }

  const handleInvalidData = () => {
    setData(defaultData)
    setValidFile(null)
    setIsValid(false)
  }

  // const handleInputBudget = (e, {value}) => {
  //     // Remove non-numeric characters using regex
  //     let numericValue = value.replace(/[^\d.]/g, '')
  //     setBudget(numericValue)
  // }

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

          if (rows.length < 11) {
            handleInvalidData()
            return
          }

          let budget = rows[8]['__EMPTY_9'] * 1.0
          let expense = rows[8]['__EMPTY_11'] * 1.0
          let description = rows[11]['__EMPTY_2']

          if (isNaN(budget) || isNaN(expense)) {
            handleInvalidData()
            return;
          }
          setData({
            description: description,
            cost: {
              isEnable: true,
              budget: budget,
              expense: expense
            },
          })
          setValidFile(file)
          setIsValid(true)
        } else {
          handleInvalidData()
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <>
      <Popup.Header onBack={onBack}>
        {t('common.cardMode')}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.divGroup}>
            <span>{t('common.importExcelFile')}</span>
            <input id="files" type="file" name="file" className="custom-file-input"
                   required onChange={handleImport}
                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
          </div>
          <div className={styles.divGroup}>
            <div><b>{t('common.costBudget')} :</b> {data['cost']['budget']}</div>
            <div><b>{t('common.costExpense')} :</b> {data['cost']['expense']}</div>
          </div>
          <div className={styles.divGroup}>
            <div><b>{t('common.description')} :</b></div>
            <div>{data.description}</div>
          </div>
          <div className={styles.divButton}>
            <Button positive disabled={!isValid} content={t('action.save')}/>
          </div>
        </Form>
      </Popup.Content>
    </>
  )

})

CardModeStep.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

CardModeStep.defaultProps = {
  onBack: undefined,
};

export default CardModeStep;
