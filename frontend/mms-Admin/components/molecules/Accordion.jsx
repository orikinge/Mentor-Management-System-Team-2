import React, {useState} from 'react';
import styles from './styles/accordion.module.scss';
import Image from 'next/image';
export const Accordion = ({
  header,
  icon,
  body,
  footer,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState (defaultOpen);

  return (
    <div className={styles.accordion}>
      <div className={styles.header} onClick={() => setOpen (prev => !prev)}>
        {header}
        {icon &&
          <div className={styles.float_right}>
            <Image src="/assets/images/arrow_down.svg" width="25" height="25" />

          </div>}

      </div>
      {open &&
        <div>
          <div className={styles.accordion_body}>{body}</div>
          {footer &&
            <div
              className={`flex flex-justify-end ${styles.accordion_footer}`}
            />}
        </div>}
    </div>
  );
};
