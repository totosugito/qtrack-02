//
//
import React, {useCallback} from "react";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

import { RangePicker, Popup } from "../../lib"
import "../../lib/react-minimal-datetime-range-2.1.0/react-minimal-datetime-range.css";

const DateTimeRangeStep = React.memo(({startDate, dueDate, onUpdate, onBack, onClose}) => {
    const [t] = useTranslation();
    const date2String = (dt) => {
        // noinspection JSAnnotator
        let dateText = t('format:dateTimePicker', {
            postProcess: 'formatDate',
            value: dt,
        })
        let dateSplit = dateText.split(" ")
        return (
            {
                date: dateSplit[0],
                time: dateSplit[1]
            }
        )
    }

    const startDate_ = startDate ? date2String(startDate) : date2String(new Date().setHours(0, 0, 0, 0))
    const dueDate_ = dueDate ? date2String(dueDate) : date2String(new Date().setHours(0, 0, 0, 0))
    const defaultDate_ = date2String(new Date().setFullYear(0, 0, 0))

    const handleSubmit = useCallback((v) => {
        // noinspection JSAnnotator
        let startDt = t('format:dateTimePicker', {
            postProcess: 'parseDate',
            value: v[0],
        })
        // noinspection JSAnnotator
        let dueDt = t('format:dateTimePicker', {
            postProcess: 'parseDate',
            value: v[1],
        })

        if ((startDt.getFullYear() < 1000) || (dueDt.getFullYear() < 1000)) {
            onUpdate(null, null)
        } else {
            onUpdate(startDt, dueDt)
        }
        onClose();
    }, [startDate, dueDate, onUpdate, onClose]);

    const handleClearClick = useCallback(() => {
        onUpdate(null, null);
        onClose();
    }, [startDate, dueDate, onUpdate, onClose]);

    return (
        <>
            <Popup.Header onBack={onBack}>
                {t('common.editDateRange', {
                    context: 'title',
                })}
            </Popup.Header>
            <Popup.Content>
                <RangePicker
                    locale="en-us"// ['en-us', 'zh-cn','ko-kr']; default is en-us
                    show={true} // default is false
                    disabled={false} // default is false
                    allowPageClickToClose={true} // default is true
                    onConfirm={handleSubmit}
                    onClose={onClose}
                    onClear={handleClearClick}
                    style={{width: '300px', margin: '0 auto'}}
                    placeholder={['Start Time', 'End Time']}
                    // markedDates={[`${todayY}-${todayM}-${todayD - 1}`, `${todayY}-${todayM}-${todayD}`]} // OPTIONAL. ['YYYY-MM-DD']
                    showOnlyTime={false} // default is false, only select time
                    // duration={2} // day count. default is 0. End date will be automatically added 2 days when the start date is picked.
                    // onChooseDate={res => {}} // on date clicked
                    ////////////////////
                    // IMPORTANT DESC //
                    ////////////////////
                    defaultDates={[startDate_.date, dueDate_.date]}
                    // ['YYYY-MM-DD', 'YYYY-MM-DD']
                    // This is the value you choose every time.
                    defaultTimes={[startDate_.time, dueDate_.time]}
                    // ['hh:mm', 'hh:mm']
                    // This is the value you choose every time.
                    // initialDates={[defaultDate_.date, defaultDate_.date]}
                    // ['YYYY-MM-DD', 'YYYY-MM-DD']
                    // This is the initial dates.
                    // If provied, input will be reset to this value when the clear icon hits,
                    // otherwise input will be display placeholder
                    initialTimes={[defaultDate_.time, defaultDate_.time]}
                    // ['hh:mm', 'hh:mm']
                    // This is the initial times.
                    // If provied, input will be reset to this value when the clear icon hits,
                    // otherwise input will be display placeholder
                />
            </Popup.Content>
        </>
    )
})

DateTimeRangeStep.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    dueDate: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    onUpdate: PropTypes.func.isRequired,
    onBack: PropTypes.func,
    onClose: PropTypes.func.isRequired,
};

DateTimeRangeStep.defaultProps = {
    defaultValue: undefined,
    onBack: undefined,
};

export default DateTimeRangeStep;
