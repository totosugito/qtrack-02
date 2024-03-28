import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import styles from './CostLabel.module.scss';
import {Icon, Progress} from "semantic-ui-react";
import stylesView from "../../../view/index.module.scss";


const CostLabel = React.memo(({ cost }) => {
    const [t] = useTranslation();
    return (
        <div className={styles.contentModule}>
            <div className={styles.moduleWrapper}>
                <Icon name="credit card outline" className={stylesView.cardModalListTitleIcon}/>
                <div className={styles.moduleHeader}>{t('common.costAction')}</div>
                <span className={styles.progressWrapper}>
                    { cost.budget >= cost.expense ? (
                        <Progress
                          progress
                          percent={(cost.expense/cost.budget * 100).toFixed(2)}
                            color="green"
                            size="medium"
                            className={styles.progress}
                            label={cost.expense.toFixed(0) + " / " + cost.budget.toFixed(0)}
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

CostLabel.propTypes = {
    cost: PropTypes.object.isRequired,
};

export default CostLabel;
