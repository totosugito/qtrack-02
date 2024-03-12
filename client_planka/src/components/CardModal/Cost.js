//
//


import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import styles from './Cost.module.scss';
import {Icon, Progress} from "semantic-ui-react";


const Cost = React.memo(({ cost }) => {
    const [t] = useTranslation();
    return (
        <div className={styles.contentModule}>
            <div className={styles.moduleWrapper}>
                <Icon name="check square outline" className={styles.moduleIcon}/>
                <div className={styles.moduleHeader}>{t('common.costControl')}</div>
                <span className={styles.progressWrapper}>
                    { cost.budget >= cost.expense ? (
                        <Progress
                            progress='ratio'
                            value={cost.expense}
                            total={cost.budget}
                            color="green"
                            size="medium"
                            className={styles.progress}
                        />
                    ) : (
                        <Progress
                            error
                            progress='ratio'
                            value={cost.expense}
                            total={cost.budget}
                            color="red"
                            size="medium"
                            className={styles.progress}
                        >
                            over-budget
                        </Progress>
                    )}

                  </span>

            </div>
        </div>
    )
})

Cost.propTypes = {
    cost: PropTypes.object.isRequired,
};

export default Cost;
