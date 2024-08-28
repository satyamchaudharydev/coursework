import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const EvaluationButton = ({
  disable,
  isLoading,
}: {
  disable: boolean;
  isLoading: boolean;
}) => {
  return (
    <div
      className={cn(
        "customButton mt-4 rounded-full",
        isLoading && "before:opacity-[1]",
        disable && "cursor-not-allowed"
      )}
    >
      <Button
        type="submit"
        variant={"ghost"}
        className={cn(
          "relative w-full after:bg-primary rounded-full gap-2 p-2 pr-6 bg-primary",
          "disabled:bg-[#ADB8C9] disabled:text-[#98A1BB] text-primary disabled:opacity-100",
          isLoading && "bg-[#cac6d4]"
        )}
        disabled={disable}
        aria-busy={isLoading}
        aria-disabled={disable}
      >
        <span className="flex items-center justify-center w-full">
          <span className="w-[24px] h-[24px] rounded-full flex justify-center items-center bg-neutral-100 mr-2" aria-hidden="true">
            <svg height="16" width="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
            </svg>
          </span>
          <span className="text-white text-[18px]">
            {isLoading ? "Evaluating..." : "Evaluate Your Score"}
          </span>
        </span>
      </Button>
    </div>
  );
};

export default EvaluationButton;