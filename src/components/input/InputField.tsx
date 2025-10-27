import { useEffect, useRef } from "react";
import styles from "./input-field.module.css";

interface InputFieldProps {
  placeHolder: string;
}

function InputField({ placeHolder }: InputFieldProps) {
  const input = useRef<HTMLInputElement>(null);
  const placeHolderSpan = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    input.current!.onfocus = () => {
      placeHolderSpan.current!.classList.add(styles.small);
    };

    input.current!.addEventListener("focusout", () => {
      if (input.current!.value == "")
        placeHolderSpan.current!.classList.remove(styles.small);
    });
  }, []);

  return (
    <>
      <div className={styles["input-field-wrap"]}>
        <span className={styles.placeholder} ref={placeHolderSpan}>
          {placeHolder}
        </span>
        <input ref={input} />
      </div>
    </>
  );
}

export default InputField;
