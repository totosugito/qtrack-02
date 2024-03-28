import React, {useCallback, useImperativeHandle, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button} from 'semantic-ui-react';
import styles from './DescriptionEdit.module.scss';
import {QuillEditor} from "../../../lib";

const DescriptionEdit = React.forwardRef(({children, defaultValue, onUpdate}, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setValue(defaultValue || '');
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    let cleanValue = value.trim() || null;
    if(cleanValue !== null) {
      let tempElement = document.createElement('div'); // Create a temporary element
      tempElement.innerHTML = cleanValue; // Set the innerHTML of the temporary element with your string
      let textContent = tempElement.textContent || tempElement.innerText; // Get the text content of the temporary element
      if(textContent === "") {
        cleanValue = null;
      }
    }

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
    setValue(null);
  }, [defaultValue, onUpdate, value, setValue]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        close();
      }
    },
    [close],
  );

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  const onCancel = () => {
    setIsOpened(false);
  }

  return (
    <>
      <QuillEditor
        placeholder={t('common.enterDescription')}
        defaultValue={value}
        onChange={setValue}
        // onKeyDown={handleFieldKeyDown}
      />
      <div className={styles.controls}>
        <Button positive content={t('action.save')} onClick={handleSubmit}/>
        <Button content={t('action.cancel')} onClick={onCancel}/>
      </div>
    </>
  );
});

DescriptionEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

DescriptionEdit.defaultProps = {
  defaultValue: undefined,
};

export default React.memo(DescriptionEdit);
