//
//
import upperFirst from 'lodash/upperFirst';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';

import getDateFormat from '../../utils/get-date-format';

import styles from './index.module.scss';

const SIZES = {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
};

const LONG_DATE_FORMAT_BY_SIZE = {
    tiny: 'longDate',
    small: 'longDate',
    medium: 'longDateTime',
};

const FULL_DATE_FORMAT_BY_SIZE = {
    tiny: 'fullDate',
    small: 'fullDate',
    medium: 'fullDateTime',
};

const DateTimeRange = React.memo(({startDate, dueDate, size, isDisabled, onClick}) => {
    const [t] = useTranslation();

    const dateFormat = getDateFormat(
        startDate,
        LONG_DATE_FORMAT_BY_SIZE[size],
        FULL_DATE_FORMAT_BY_SIZE[size],
    );

    const contentNode = (
        <div>
            <table cellPadding="0" cellSpacing="0">
                <tbody>
                {size === SIZES.MEDIUM &&
                    <tr>
                        <td>
                            <div className={styles.text}>
                                {t('common.startDate', {
                                    context: 'title',
                                })}
                            </div>
                        </td>
                        <td>
                            <div className={styles.text}>
                                {t('common.dueDate', {
                                    context: 'title',
                                })}
                            </div>
                        </td>
                    </tr>
                }
                <tr>
                    <td style={{paddingRight: size === SIZES.MEDIUM ? '2px' : '0px'}}>
            <span
                className={classNames(
                    styles.wrapper,
                    styles[`wrapper${upperFirst(size)}`],
                    onClick && styles.wrapperHoverable,
                )}>
              {t(`format:${dateFormat}`, {
                  value: startDate,
                  postProcess: 'formatDate',
              })}
            </span>
                    </td>
                    {size !== SIZES.MEDIUM && <td>&nbsp;-&nbsp;</td>}
                    <td>
            <span
                className={classNames(
                    styles.wrapper,
                    styles[`wrapper${upperFirst(size)}`],
                    onClick && styles.wrapperHoverable,
                )}
            >
            {t(`format:${dateFormat}`, {
                value: dueDate,
                postProcess: 'formatDate',
            })}
          </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );

    return onClick ? (
        <button type="button" disabled={isDisabled} className={styles.button} onClick={onClick}>
            {contentNode}
        </button>
    ) : (
        contentNode
    );
});

DateTimeRange.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    dueDate: PropTypes.instanceOf(Date).isRequired,
    size: PropTypes.oneOf(Object.values(SIZES)),
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
};

DateTimeRange.defaultProps = {
    size: SIZES.MEDIUM,
    isDisabled: false,
    onClick: undefined,
};

export default DateTimeRange
