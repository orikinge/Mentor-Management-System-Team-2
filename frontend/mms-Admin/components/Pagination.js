import { useState } from "react";
import styles from "./componentStyles/pagination.module.css";
import Icon from "./Icon";

const PAGE_SIZE = 10;

const Pagination = ({ total }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(startIndex + PAGE_SIZE - 1, total);

  return (
    <div className={styles.container}>
      <button
        className={styles.button1}
        disabled={currentPage === 1}
        onClick={handlePreviousClick}>
        <Icon
          icon={"/assets/images/Backward.svg"}
          width={"20px"}
          height={"20px"}
        />
        <Icon
          icon={"/assets/images/Backward-sign.svg"}
          width={"20px"}
          height={"20px"}
        />
      </button>
      <div className={styles.indextotal}>
        {startIndex} - {endIndex} of {total}
      </div>
      {/*Array.from({ length: totalPages }).map((_, i) => (
        <Link href={`?page=${i + 1}`} key={i}>
          <a className={i + 1 === currentPage ? 'active' : ''}>{i + 1}</a>
        </Link>
      ))*/}
      <button
        className={styles.button2}
        disabled={currentPage === totalPages}
        onClick={handleNextClick}>
        <Icon
          icon={"/assets/images/forward-sign.svg"}
          width={"20px"}
          height={"20px"}
        />
        <Icon
          icon={"/assets/images/Forward.svg"}
          width={"20px"}
          height={"20px"}
        />
      </button>
    </div>
  );
};

export default Pagination;
