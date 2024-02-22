//
//
import React, {useCallback, useRef} from "react"

import { useDidUpdate, usePrevious } from '../../lib/hooks';
import { useField } from '../../hooks';

import { Input, Divider } from 'semantic-ui-react'
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";


const Cost = React.memo(({ defaultValueBudget, defaultValueExpense, onUpdate }) => {
    const [t] = useTranslation();

    const prevDefaultValueBudget = usePrevious(defaultValueBudget)
    const [valueBudget, handleChangeBudget, setValueBudget] = useField(defaultValueBudget)
    const isFocusedBudget = useRef(false);
    const handleFocusBudget = useCallback(() => {
        isFocusedBudget.current = true;
    }, []);
    const handleKeyDownBudget = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            event.target.blur();
        }
    }, []);
    const handleKeyDownExpense = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            event.target.blur();
        }
    }, []);
    const handleBlurBudget = useCallback(() => {
        isFocusedBudget.current = false;

        const cleanValueBudget = valueBudget.trim();
        if (cleanValueBudget) {
            if (cleanValueBudget !== defaultValueBudget) {
                onUpdate(cleanValueBudget, prevDefaultValueExpense);
            }
        } else {
            setValueBudget(defaultValueBudget);
        }

    }, [defaultValueBudget, onUpdate, valueBudget, setValueBudget]);

    const prevDefaultValueExpense = usePrevious(defaultValueExpense)
    const [valueExpense, handleChangeExpense, setValueExpense] = useField(defaultValueExpense)
    const isFocusedExpense = useRef(false);
    const handleFocusExpense = useCallback(() => {
        isFocusedExpense.current = true;
    }, []);
    const handleBlurExpense = useCallback(() => {
        isFocusedExpense.current = false;

        const cleanValueExpense = valueExpense.trim();
        if (cleanValueExpense) {
            if (cleanValueExpense !== defaultValueExpense) {
                onUpdate(prevDefaultValueBudget, cleanValueExpense);
            }
        } else {
            setValueExpense(defaultValueExpense);
        }
    }, [defaultValueExpense, onUpdate, valueExpense, setValueExpense]);

    useDidUpdate(() => {
        if (!isFocusedBudget.current && defaultValueBudget !== prevDefaultValueBudget) {
            setValueBudget(defaultValueBudget);
        }
        if (!isFocusedExpense.current && defaultValueExpense !== prevDefaultValueExpense) {
            setValueExpense(defaultValueExpense);
        }
    }, [defaultValueBudget, prevDefaultValueBudget, setValueBudget, defaultValueExpense, prevDefaultValueExpense, setValueExpense]);

    return (
        <>
            <Input
                onFocus={handleFocusBudget}
                onKeyDown={handleKeyDownBudget}
                onChange={handleChangeBudget}
                onBlur={handleBlurBudget}
                label={t('common.costBudget')}
                value={valueBudget}
            />
            <Divider />
            <Input
                onFocus={handleFocusExpense}
                onKeyDown={handleKeyDownExpense}
                onChange={handleChangeExpense}
                onBlur={handleBlurExpense}
                label={t('common.costExpense')}
                value={valueExpense}
            />

        </>
    );
})

Cost.propTypes = {
    defaultValueBudget: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default Cost;
