import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup as SemanticUIPopup } from 'semantic-ui-react';
import styles from './Popup.module.css';

export default (Step, props) => {
  return useMemo(() => {
    const Popup = React.memo(({ children, onClose, ...stepProps }) => {
      const [isOpened, setIsOpened] = useState(false);

      const wrapper = useRef(null);
      const handleOpen = useCallback(() => {
        setIsOpened(true);
      }, []);

      const handleClose = useCallback(() => {
        setIsOpened(false);

        if (onClose) {
          onClose();
        }
      }, [onClose]);

      const handleMouseDown = useCallback((event) => {
        event.stopPropagation();
      }, []);

      const handleClick = useCallback((event) => {
        event.stopPropagation();
      }, []);

      const handleTriggerClick = useCallback(
        (event) => {
          event.stopPropagation();

          const { onClick } = children;

          if (onClick) {
            onClick(event);
          }
        },
        [children],
      );

      const tigger = React.cloneElement(children, {
        onClick: handleTriggerClick,
      });

      return (
        <SemanticUIPopup
          basic
          wide
          ref={wrapper}
          trigger={tigger}
          on="click"
          open={isOpened}
          position="bottom left"
          popperModifiers={[
            {
              name: 'preventOverflow',
              enabled: true,
              options: {
                altAxis: true,
                padding: 20,
              },
            },
          ]}
          className={styles.wrapper}
          onOpen={handleOpen}
          onClose={handleClose}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          {...props}
        >
          <div>
            <Button icon="close" onClick={handleClose} className={styles.closeButton} />
            <Step {...stepProps} onClose={handleClose} />
          </div>
        </SemanticUIPopup>
      );
    });

    Popup.propTypes = {
      children: PropTypes.node.isRequired,
      onClose: PropTypes.func,
    };

    Popup.defaultProps = {
      onClose: undefined,
    };

    return Popup;
  }, [props]);
};
