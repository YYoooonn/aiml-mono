"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getArchives } from "../_actions/project";
import { Archives } from "./_archives";

import * as styles from "./archive.css";
import { useModals } from "@/hook/useModals";
import { ArchiveModal } from "@/components/modal/archive";
import { ModalType } from "@/hook/useModalStore";

export default function Archive() {
  const { modals, open, close } = useModals();
  const [pageNum, setPageNum] = useState(0);
  const [keyword, setKeyword] = useState("");
  // XXX type
  const [archives, setArchives] = useState<Array<any>>([]);

  const searchParams = useSearchParams();
  useEffect(() => {
    const param = searchParams.get("from");
    if (param) {
      open(ArchiveModal, { id: param }, ModalType.ARCHIVE);
    }
    if (!param && modals) {
      close();
    }
  }, [searchParams.get("from")]);

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
    <>
      {/* <div className={styles.archiveTitle}>archives</div> */}
      <Archives archives={archives} />
    </>
  );
}
