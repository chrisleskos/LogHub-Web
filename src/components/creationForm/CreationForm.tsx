import { forwardRef, useEffect, useRef, useState } from "react";
import ProgressBar, { type ProgressBarRef } from "../progressBar/ProgressBar";

interface CreationFormProps {
  children?: React.ReactNode;
}

const CreationForm = forwardRef<ProgressBarRef, CreationFormProps>(
  ({ children }, progressRef) => {
    return (
      <>
        <ProgressBar totalSteps={4} ref={progressRef} />
        {children}
      </>
    );
  }
);

export default CreationForm;
