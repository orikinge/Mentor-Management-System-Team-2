import React from "react";
import { ListItem } from "../../../components/atoms/ListItem";
import { Icons } from "../../../components/atoms/Icons";
import { Loader } from "../../../components/atoms/Loader";
import styles from "../../../styles/programs/reports.module.scss";
import { PaginationWithFilter } from "../../../components/molecules/PaginationWithFilter";
import { useRouter } from "next/router";
import { fetchReportAssociatedWithprogram } from "../../api/report";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const Reports = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useQuery(
    [`program-reports-by-${id}`],
    () => fetchReportAssociatedWithprogram(id),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <div>
      {data.length > 0 ? (
        <>
          <div className="flex flex-justify-between flex-align-center">
            <h1 className={styles.page_title}>Reports</h1>
            <PaginationWithFilter />
          </div>
          <div className={styles.program_reports}>
            {data.map((item) => (
              <ListItem key={item.id}>
                <div className="flex flex-align-center gap-16">
                  <Icons width="30" name="report-sheet" />
                  <div>
                    <h1 className={`list_main_text`}>{item.achievement}</h1>
                    <div className={`flex flex-align-center`}>
                      <p className={`list_sub_text`}>
                        {`By Ibrahim Kabir - ${format(
                          new Date(item.createdAt),
                          "MMM dd, yyyy",
                        )}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-16">
                  <span className={`cursor-pointer`}>
                    <Icons name="download" />
                  </span>
                  <span className={`cursor-pointer`}>
                    <Icons name="forward" />
                  </span>
                  <span className={`cursor-pointer`}>
                    <Icons name="arrow-up" />
                  </span>
                </div>
              </ListItem>
            ))}
          </div>
        </>
      ) : (
        <p>No report recorded for this program.</p>
      )}
    </div>
  );
};

export default Reports;
