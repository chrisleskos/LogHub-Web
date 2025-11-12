import { useEffect, useRef } from "react";
import styles from "./input-field.module.css";

interface TextAreaFieldProps {
  placeHolder: string;
  name: string;
  id: string;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  defaultValue?: string;
  handleOnKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

function TextAreaField({
  placeHolder,
  name,
  id,
  inputRef,
  defaultValue,
  handleOnKeyUp,
}: TextAreaFieldProps) {
  const placeHolderSpan = useRef<HTMLSpanElement>(null);

  const handleFocus = () => {
    placeHolderSpan.current!.classList.add(styles.small);
  };

  const handleBlur = () => {
    if (inputRef.current!.value === "" || defaultValue === "")
      placeHolderSpan.current!.classList.remove(styles.small);
    else placeHolderSpan.current!.classList.add(styles.small);
  };

  useEffect(() => {
    handleBlur();
  }, [placeHolderSpan]);

  return (
    <>
      <div className={styles["input-field-wrap"] + " " + styles.textarea}>
        <span className={styles.placeholder} ref={placeHolderSpan}>
          {placeHolder}
        </span>
        <textarea
          ref={inputRef}
          name={name}
          id={id}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleOnKeyUp}
        />
      </div>
    </>
  );
}

export default TextAreaField;
