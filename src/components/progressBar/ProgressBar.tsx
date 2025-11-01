import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface ProgressBarRef {
  nextStep: () => void;
  prevStep: () => void;
}

interface ProgressBarProps {
  totalSteps: number;
}

const ProgressBar = forwardRef<ProgressBarRef, ProgressBarProps>(
  ({ totalSteps }, ref) => {
    const progressBar = useRef<HTMLDivElement>(null);
    const progressBarLevel = useRef(0);
    //   const totalSteps = 3;
    const minPerc = 3; // %
    const stepPerc = 100 / totalSteps;

    const updateProgressBarLevel = (level: number) => {
      console.log("Bar: " + level + "*" + stepPerc + "%");
      if (!progressBar.current) return;

      progressBar.current.style.width =
        Math.min(Math.max(level * stepPerc, minPerc), 100) + "%"; // if < min percentage -> min. If > 100 -> 100
    };

    const nextStep = () => {
      progressBarLevel.current = Math.min(
        progressBarLevel.current + 1,
        totalSteps
      );
      updateProgressBarLevel(progressBarLevel.current);
    };

    const prevStep = () => {
      progressBarLevel.current = Math.max(progressBarLevel.current - 1, 0);
      updateProgressBarLevel(progressBarLevel.current);
    };

    useEffect(() => {
      updateProgressBarLevel(0);
    }, []);

    // expose methods to parent
    useImperativeHandle(ref, () => ({
      nextStep,
      prevStep,
    }));
    return (
      <>
        <div
          className="progress"
          role="progressbar"
          aria-label="Animated striped example"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
        >
          <div
            ref={progressBar}
            className="progress-bar progress-bar-striped progress-bar-animated"
          ></div>
        </div>
      </>
    );
  }
);

export default ProgressBar;
