import React, {useState} from "react";
import styles from './ChipInput.module.scss'
import {Icon, Input} from "semantic-ui-react";

const ChipInput = ({label, value, onChange}) => {
  const [text, setText] = useState("");
  const [chips, setChips] = useState(value);
  const [validationError, setValidationError] = useState("");

  function removeChip(chipToRemove) {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
    onChange(updatedChips)
  }

  function handlePressEnter(e) {
    // don't submit the form if the user presses 'Enter'
    if (e.key === "Enter") e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== "Enter" || !text) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once");
    }

    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);

    let tmp = [...chips]
    tmp.push(text)
    onChange(tmp)

    // clearing the input box
    setText("");
    // clearing error message
    setValidationError("");
  }


  return (
    <div className={styles.chipRoot}>
      {
        label && (<span style={{marginRight: '10px', paddingTop: '10px'}}>{label}</span>)
      }
      <div className={styles.inputChipContainer}>
        <ul className={styles.chips}>
          {chips.map((chip) => (
            <li key={chip} className={styles.chip}>
              <span>{chip}</span>
              <span className={styles.deleteIcon}>
                <Icon name="times" onClick={() => removeChip(chip)}/>
              </span>
            </li>
          ))}
        </ul>

        <Input size={'mini'} transparent={true} value={text} placeholder="Press Enter to add tag"
               className={styles.inputChip}
               onKeyDown={handlePressEnter} onChange={(e) => setText(e.target.value)}/>
      </div>
      {validationError && <p className={styles.errorMessage}>{validationError}</p>}
    </div>
  );
}

export default ChipInput;