import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'semantic-ui-react';

import styles from './Cost.module.scss';

const Cost = React.memo(({ cost }) => {
    // const [isOpened, toggleOpened] = useToggle()
    return (

        <span className={styles.progressWrapper}>
           { cost.budget >= cost.expense ? (
               <Progress
                   progress='percent'
                   value={cost.expense}
                   total={cost.budget}
                   color="green"
                   size="small"
                   className={styles.progress}
               />
           ) : (
               <Progress
                   error
                   progress='percent'
                   value={cost.expense}
                   total={cost.budget}
                   color="red"
                   size="small"
                   className={styles.progress}
               >
                   over-budget
               </Progress>
           )}
        </span>

    )
})

Cost.propTypes = {
    cost: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default Cost
