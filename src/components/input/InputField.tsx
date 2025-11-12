import { useEffect, useRef } from "react";
import styles from "./input-field.module.css";

interface InputFieldProps {
  placeHolder: string;
  name: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  defaultValue?: string;
  handleOnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputField({
  placeHolder,
  name,
  id,
  inputRef,
  defaultValue,
  handleOnKeyUp,
}: InputFieldProps) {
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
      <div className={styles["input-field-wrap"]}>
        <span className={styles.placeholder} ref={placeHolderSpan}>
          {placeHolder}
        </span>
        <input
          ref={inputRef}
          name={name}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleOnKeyUp}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
}

export default InputField;
