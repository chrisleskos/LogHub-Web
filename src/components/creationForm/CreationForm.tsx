import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import ProgressBar, { type ProgressBarRef } from "../progressBar/ProgressBar";
import styles from "./creation-form.module.css";

export interface CreationFormRef {
  nextStep: (steps: number) => void;
  prevStep: () => void;
}

interface CreationFormProps {
  children?: React.ReactNode;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreationForm = forwardRef<CreationFormRef, CreationFormProps>(
  ({ children, onSubmitHandler }, ref) => {
    const [formLevel, setFormLevel] = useState<number>(0);

    const progressBarRef = useRef<ProgressBarRef>(null);
    const nextProgressBarStep = () => progressBarRef.current?.nextStep();
    const prevProgressBarStep = () => progressBarRef.current?.prevStep();

    const defaultSlides = [
      <div
        className={`${styles["form-slide"]} ${styles["submition-msg"]}`}
        key="submition-outcome"
      >
        <div className={`${styles.icon}`}></div>
        <div className={styles.outcome}>Submiting</div>
      </div>,
      <div
        className={`${styles["form-slide"]} ${styles["submition-msg"]}`}
        key="submition-outcome"
      >
        <div className={`${styles.icon} ${styles.success}`}></div>
        <div className={styles.outcome}>Successfull</div>
      </div>,
      <div
        className={`${styles["form-slide"]} ${styles["submition-msg"]}`}
        key="submition-outcome"
      >
        <div className={`${styles.icon} ${styles.error}`}></div>
        <div className={styles.outcome}>Something went wrong</div>
      </div>,
    ];

    // Type guard
    function isSlide(
      node: React.ReactNode
    ): node is ReactElement<{ className?: string }> {
      return (
        typeof node === "object" &&
        node !== null &&
        "props" in node &&
        typeof (node as any).props.className === "string" &&
        (node as any).props.className.includes(styles["form-slide"])
      );
    }

    const allSlides = useMemo(() => {
      const parentSlides = React.Children.toArray(children).filter(isSlide);
      return [...parentSlides, ...defaultSlides];
    }, [children]);

    const nextStep = (steps = 1) => {
      setFormLevel((prev) => {
        const newLvl = Math.min(prev + steps, allSlides.length);
        return newLvl;
      });

      nextProgressBarStep();
    };

    const prevStep = () => {
      setFormLevel((prev) => {
        const newLvl = Math.max(prev - 1, 0);
        return newLvl;
      });

      prevProgressBarStep();
    };

    // expose methods to parent
    useImperativeHandle(ref, () => ({
      nextStep,
      prevStep,
    }));

    return (
      <>
        <form onSubmit={onSubmitHandler}>
          {/* Length is minus 3 because the last 3 slides are submition outcome */}
          <ProgressBar totalSteps={allSlides.length - 3} ref={progressBarRef} />
          {allSlides.map((slide, i) =>
            i === formLevel ? (
              <div className={styles["show-slide"]} key={i}>
                {slide}
              </div>
            ) : null
          )}
        </form>
      </>
    );
  }
);

export default CreationForm;
