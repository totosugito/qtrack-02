import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Form, Input} from 'semantic-ui-react';
import classNames from "classnames";
import {ChipInput} from "../../../lib";
import styles from './InformationEdit.module.scss';

const InformationEdit = React.memo(({defaultData, onUpdate}) => {
  const [t] = useTranslation();

  const [name, setName] = useState(defaultData.name)
  const [latitude, setLatitude] = useState(defaultData.eT.lat)
  const [longitude, setLongitude] = useState(defaultData.eT.lon)
  const [progress, setProgress] = useState(defaultData.eT.progress)
  const [validName, setValidName] = useState(true)
  const [validLat, setValidLat] = useState(true)
  const [validLon, setValidLon] = useState(true)
  const [tags, setTags] = React.useState(defaultData.tags)

  const handleInputName = (e, {value}) => {
    let name_ = value.trim()
    if (name_ === '') {
      setValidName(false)
    } else {
      setValidName(true)
    }
    setName(name_)
  }

  const handleInputLatitude = (e, {value}) => {
    // Remove non-numeric characters using regex
    let numericValue = value.replace(/[^-\d.]/g, '')

    // nan number
    if (isNaN(numericValue * 1.0)) {
      setValidLat(false)
    } else {
      setValidLat(true)
    }

    // update value
    setLatitude(numericValue);
  }

  const handleInputLongitude = (e, {value}) => {
    // Remove non-numeric characters using regex
    let numericValue = value.replace(/[^-\d.]/g, '')

    // nan number
    if (isNaN(numericValue * 1.0)) {
      setValidLon(false)
    } else {
      setValidLon(true)
    }

    // update value
    setLongitude(numericValue);
  }

  const handleInputProgress = (e, {value}) => {
    // Remove non-numeric characters using regex
    let numericValue = value.replace(/[^\d.]/g, '')

    // Ensure the value is within the desired range (1 to 100 in this example)
    if (numericValue <= 100.0) {
      setProgress(numericValue);
    }
  }

  const handleSubmit = () => {
    const cleanData = {
      name: name,
      eT: {
        lat: latitude * 1.0,
        lon: longitude * 1.0,
        progress: progress * 1.0
      },
      tags: tags
    }
    onUpdate(cleanData);
  }

  const handleTags = (newTags) => {
    setTags(newTags)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.text}>{t('common.title')}</div>
      <Input
        fluid
        name="name"
        value={name}
        className={styles.field}
        onChange={handleInputName}
      />
      <div className={styles.divContainer}>
        <div className={styles.text}>{t('common.tags')}</div>
        <ChipInput value={tags} onChange={handleTags}/>
      </div>
      <div className={styles.divContainer}>
        <div className={styles.divGroup}>
          <div className={styles.text}>{t('common.latitude')}</div>
          <Input
            fluid
            size='small'
            value={latitude}
            onChange={handleInputLatitude}
          />
        </div>
        <div className={classNames(styles.divGroup, styles.divGroupColumn)}>
          <div className={styles.text}>{t('common.longitude')}</div>
          <Input
            fluid
            size='small'
            value={longitude}
            onChange={handleInputLongitude}
          />
        </div>
      </div>
      <div className={styles.divContainer}>
        <div className={classNames(styles.divGroup)}>
          <div className={styles.text}>{t('common.projectProgress')}</div>
          <Input
            fluid
            size='small'
            value={progress}
            onChange={handleInputProgress}
          />
        </div>
      </div>
      <Button positive className={styles.buttonSubmit}
              disabled={!(validName && validLat && validLon)}
        // disabled={dequal(cleanData, defaultData)}
              content={t('action.save')}/>
    </Form>
  );
});

InformationEdit.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
};

export default InformationEdit;
