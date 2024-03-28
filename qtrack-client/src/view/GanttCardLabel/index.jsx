import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';
import {useTranslation} from "react-i18next";
import upperFirst from "lodash/upperFirst";

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
};

const GanttCardLabel = React.memo(({gantt, size, onClick}) => {
  const [t] = useTranslation();

  const ContentNode = ({progress}) => {
    return (
      <>
        <table cellPadding="0" cellSpacing="0">
          <tbody>
          {size === SIZES.MEDIUM &&
            <tr>
              <td>
                <div className={styles.text}>
                  {t('common.ganttProgress')}
                </div>
              </td>
            </tr>
          }
          <tr>

          </tr>
          </tbody>
        </table>
        <span
          title={'Gantt'}
          className={classNames(
            styles.wrapper,
            styles[`wrapper${upperFirst(size)}`],
            onClick && styles.wrapperHoverable,
          )}
        >
          {size !== SIZES.MEDIUM && (t('common.ganttProgress') + " : ")}{progress}%
        </span>
      </>
    )
  }

  return gantt.isEnable ? (onClick ? (
    <div className={styles.button} onClick={onClick}>
      <ContentNode progress={gantt.progress}/>
    </div>
  ) : (
    <ContentNode progress={gantt.progress}/>
  )) : <></>
});

GanttCardLabel.propTypes = {
  gantt: PropTypes.object,
  size: PropTypes.oneOf(Object.values(SIZES)),
  onClick: PropTypes.func,
};

GanttCardLabel.defaultProps = {
  size: SIZES.MEDIUM,
  onClick: undefined,
};

export default GanttCardLabel;
