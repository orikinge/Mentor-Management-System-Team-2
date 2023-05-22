import React, { useState } from "react";
import styles from "../styles/criteria-setup.module.scss";
import { Button } from "../components/atoms/Button";
import { CriteriaInputModal } from "../components/molecules/CriteriaInputModal";
import Modal from "components/molecules/Modal";

const CriteriaSetup = () => {
  const [showInfoText, setShowInfoText] = useState(true);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);

  return (
    <div className={`${styles.wrapper} flex flex-column flex-justify-between`}>
      <div className={`flex flex-column gap-16`}>
        <h1 className={styles.page_title}>Criteria Setup</h1>
        {showInfoText && (
          <div className={styles.info_text_area}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              itaque maxime aliquid nulla iusto facilis ut officiis repellat
              totam, inventore blanditiis accusamus numquam. Obcaecati, enim.
              Ipsam tempore autem voluptates beatae. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Reiciendis commodi possimus magnam
              sed officia. Hic ad praesentium enim, natus sit quos
              exercitationem cupiditate quae? Nam atque quibusdam veniam nulla
              facere?
            </p>

            <div className={`flex flex-justify-end`}>
              <Button
                onClick={() => setShowInfoText(false)}
                variant="normal"
                size="small">
                Ok
              </Button>
            </div>
          </div>
        )}
        <div>
          <Button
            onClick={() => setShowAddCriteriaModal(true)}
            variant="normal"
            size="small">
            Add Criteria
          </Button>
        </div>
      </div>

      <div className={`flex flex-justify-end`}>
        <Button variant="normal" size="large">
          Create Criteria
        </Button>
      </div>

      <Modal show={showAddCriteriaModal}>
        <CriteriaInputModal onClose={() => setShowAddCriteriaModal(false)} />
      </Modal>
    </div>
  );
};

export default CriteriaSetup;
