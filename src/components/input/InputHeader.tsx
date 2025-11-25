import type { ChangeEvent } from "react";
import styles from "./input-field.module.css";

interface InputHeaderProps {
  placeHolder: string;
  name: string;
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  defaultValue?: string;
  value?: string;
  handleOnKeyUp?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputHeader({
  placeHolder,
  name,
  id,
  inputRef,
  value,
  handleOnKeyUp,
}: InputHeaderProps) {
  return (
    <>
      <div className={styles["input-header-wrap"]}>
        <div className={styles.icon}>
          <img src="/edit-icon.png" />
        </div>
        <input
          ref={inputRef}
          name={name}
          id={id}
          onChange={handleOnKeyUp}
          value={value}
          placeholder={placeHolder}
        />
      </div>
    </>
  );
}

export default InputHeader;
