import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  totalSteps: number;
}

function ProgressBar({ totalSteps }: ProgressBarProps) {
  const progressBar = useRef<HTMLDivElement>(null);
  const [progressLevel, setProgressLevel] = useState(0);

  //   const totalSteps = 3;
  const minPerc = 3; // %
  const stepPerc = 100 / totalSteps;

  const updateProgressBarLevel = (level: number) => {
    setProgressLevel(Math.min(Math.max(level * stepPerc, 0), 100)); // if is lower than 0, pick 0. If its higher than 100, pick 100
    progressBar.current!.style.width = (level <= 0 ? minPerc : level) + "%";
  };

  const nextStep = () => {
    updateProgressBarLevel(progressLevel);
  };

  //   const previousStep = () => {
  //     updateProgressBarLevel(progressLevel - stepPerc);
  //     updateFormSlide(formStep - 1);
  //   };

  useEffect(() => {
    updateProgressBarLevel(0);
  }, []);
  return (
    <>
      <div
        className="progress"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          ref={progressBar}
          className="progress-bar progress-bar-striped progress-bar-animated"
        ></div>
      </div>
    </>
  );
}

export default ProgressBar;
