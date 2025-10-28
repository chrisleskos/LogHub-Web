import { useEffect, useRef } from "react";
import styles from "./input-field.module.css";

interface TextAreaFieldProps {
  placeHolder: string;
}

function TextAreaField({ placeHolder }: TextAreaFieldProps) {
  const input = useRef<HTMLTextAreaElement>(null);
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
      <div className={styles["input-field-wrap"] + " " + styles.textarea}>
        <span className={styles.placeholder} ref={placeHolderSpan}>
          {placeHolder}
        </span>
        <textarea ref={input} />
      </div>
    </>
  );
}

export default TextAreaField;
