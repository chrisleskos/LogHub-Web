import styles from "./close-btn.module.css";

interface CloseButtonProps {
  onClickHandler: () => void;
}

function CloseButton({ onClickHandler }: CloseButtonProps) {
  return (
    <>
      <div className={styles["close-btn"]} onClick={onClickHandler}>
        <span>&times;</span>
      </div>
    </>
  );
}

export default CloseButton;
