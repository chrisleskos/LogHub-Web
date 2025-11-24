import styles from "./input-field.module.css";

interface InputHeaderProps {
  placeHolder: string;
  name: string;
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  defaultValue?: string;
  handleOnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputHeader({
  placeHolder,
  name,
  id,
  inputRef,
  defaultValue,
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
          onKeyUp={handleOnKeyUp}
          defaultValue={defaultValue}
          placeholder={placeHolder}
        />
      </div>
    </>
  );
}

export default InputHeader;
