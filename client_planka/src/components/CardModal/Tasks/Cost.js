//
//

import React from "react";
import PropTypes from "prop-types";
import styles from "./Tasks.module.scss";
import { Progress } from "semantic-ui-react";

const Cost = React.memo(({ defaultValue }) => {
    return (
        <>
            {items.length > 0 && (
                <>
                  <span className={styles.progressWrapper}>
                    <Progress
                        autoSuccess
                        value={completedItems.length}
                        total={items.length}
                        color="blue"
                        size="tiny"
                        className={styles.progress}
                    />
                    </span>
                </>
            )}
        </>
    )
})

Cost.propTypes = {
    defaultValue: PropTypes.object.isRequired,
};

export default Cost;
