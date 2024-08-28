"use client";

import { ChevronsRightLeft, Expand, ZoomIn, ZoomOut } from "lucide-react";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import useFullscreen from "@/hooks/useFullScreen";
import { Icons } from "./Icons";
import useElementSize from "@/hooks/useObserver";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  title: string;
  pdfFile: string;
  handleCollapseFile: () => void;
}

export default function PDFViewer({
  title,
  pdfFile,
  handleCollapseFile,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  const [size, elementRef] = useElementSize<HTMLDivElement>();

  const { isFullscreen, toggle } = useFullscreen(elementRef);
  const collapsed = false;
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-viewer rounded-3xl sm:sticky sm:top-[66px]  overflow-hidden md:h-[90vh] h-70vh ">
      <div className="toolbar p-[12px] bg-white/50 flex items-start flex-wrap gap-2 sl:flex-nowrap  justify-between ">
        <h2 className="bg-white px-3 py-1 rounded-full text-gray-400 text-[14px] max-w-[40ch] truncate font-[600]">
          {title}
        </h2>
        <div className="flex justify-between w-full  items-center  gap-3 xl:w-auto">
          <div className="flex gap-2 text-gray items-center">
            <button onClick={() => setScale((prevScale) => prevScale + 0.1)}>
              <Icons.zoomIn />
            </button>
            <span className="font-[600] text-[14px] min-w-[30px]">
              {Math.round(scale * 100)}%
            </span>
            <button onClick={() => setScale((prevScale) => prevScale - 0.1)}>
              <Icons.zoomOut />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant={"secondary"}
              onClick={toggle}
              className="bg-[#FCFBFD] rounded-full shadow-none  w-[24px] h-[24px] p-[4px]"
            >
              <Icons.expand />
            </Button>
            <Button
              variant={"secondary"}
              onClick={handleCollapseFile}
              className="bg-[#FCFBFD] text-gray  px-2 py-1 rounded-full shadow-none gap-1
            hidden sm:flex h-fit
            "
            >
              <Icons.collapse />
              <span className="text-[12px]">
                {collapsed ? "Expand" : "Collapse"}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div
        ref={elementRef}
        
        className="scrollbar-none h-[calc(100lvh-175px)] overflow-y-scroll rounded-b-[24px] border border-neutrals-300 bg-white p-8"
      >
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div
              
              key={`page_${index + 1}`}
              className="mb-4 rounded-lg shadow-md  p-4 w-fit"
            >
              <Page
               renderTextLayer={false}
               width={(elementRef.current?.clientWidth || 0) - 100}
               renderAnnotationLayer={false}
                pageNumber={index + 1}
                scale={scale}
                className="max-w-full"
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
