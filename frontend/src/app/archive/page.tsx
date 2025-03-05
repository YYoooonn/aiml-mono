"use client";

import { useEffect, useState } from "react";
import { getArchives } from "../_actions/project";
import * as styles from "./archive.css";
import { Archives } from "./_archives";

export default function Archive() {
  const [pageNum, setPageNum] = useState(0);
  const [keyword, setKeyword] = useState("");
  // XXX type
  const [archives, setArchives] = useState<Array<any>>([]);

  useEffect(() => {
    fetchArchive();
  }, [pageNum, keyword]);

  const fetchArchive = async () => {
    const publicPrjt = await getArchives({
      pageNumber: pageNum,
      keyword: keyword,
      pageSize: 20,
    });

    setArchives(publicPrjt.content);
  };

  return (
    <div>
      {/* <div className={styles.archiveTitle}>archives</div> */}
      <Archives archives={archives} />
    </div>
  );
}
