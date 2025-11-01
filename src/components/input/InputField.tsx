import { useRef } from "react";
import styles from "./input-field.module.css";

interface InputFieldProps {
  placeHolder: string;
  name: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleOnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputField({
  placeHolder,
  name,
  id,
  inputRef,
  handleOnKeyUp,
}: InputFieldProps) {
  const placeHolderSpan = useRef<HTMLSpanElement>(null);

  const handleFocus = () => {
    placeHolderSpan.current!.classList.add(styles.small);
  };

  const handleBlur = () => {
    if (inputRef.current!.value == "")
      placeHolderSpan.current!.classList.remove(styles.small);
  };

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
        />
      </div>
    </>
  );
}

export default InputField;
