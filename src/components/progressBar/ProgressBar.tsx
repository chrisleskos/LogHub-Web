import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface ProgressBarRef {
  nextStep: () => void;
  previousStep: () => void;
}

interface ProgressBarProps {
  totalSteps: number;
}

const ProgressBar = forwardRef<ProgressBarRef, ProgressBarProps>(
  ({ totalSteps }, ref) => {
    const progressBar = useRef<HTMLDivElement>(null);
    const [, setProgressLevel] = useState(0);

    //   const totalSteps = 3;
    const minPerc = 3; // %
    const stepPerc = 100 / totalSteps;

    const updateProgressBarLevel = (level: number) => {
      if (!progressBar.current) return;

      progressBar.current.style.width =
        Math.min(Math.max(level * stepPerc, minPerc), 100) + "%"; // if < min percentage -> min. If > 100 -> 100
    };

    const nextStep = () => {
      setProgressLevel((prev) => {
        const newLvl = Math.min(prev + 1, totalSteps);
        updateProgressBarLevel(newLvl);
        return newLvl;
      });
    };

    const previousStep = () => {
      setProgressLevel((prev) => {
        const newLvl = Math.max(prev - 1, 0);
        updateProgressBarLevel(newLvl);
        return newLvl;
      });
    };

    useEffect(() => {
      updateProgressBarLevel(0);
    }, []);

    // expose methods to parent
    useImperativeHandle(ref, () => ({
      nextStep,
      previousStep,
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
