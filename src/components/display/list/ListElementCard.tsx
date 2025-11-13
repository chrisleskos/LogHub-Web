import { useState, type MouseEventHandler, type ReactNode } from "react";
import styles from "./list-display.module.css";
import type { ListElementData } from "./ListElementData";

interface ListElementCardProps {
  onClickHandler?: () => void;
  extraClasses?: string;
  isSelected?: boolean;
  children?: ReactNode;
  listElementData: ListElementData;
}

function ListElementCard({
  onClickHandler,
  extraClasses,
  isSelected,
  listElementData,
  children,
}: ListElementCardProps) {
  const [showChildren, setShowChildren] = useState<boolean>(true);
  return (
    <div className={`${styles["element-wrap"]}`}>
      <div
        className={`${styles.element} ${isSelected ? styles.selected : ""}  ${
          children ? styles["not-hover"] : ""
        } ${extraClasses} `}
        onClick={() => {
          if (onClickHandler) onClickHandler();
          setShowChildren((prev) => !prev);
        }}
      >
        {listElementData.creator && (
          <div
            className={styles.creator}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              window.location.href = "/" + listElementData.creator;
            }}
          >
            @{listElementData.creator}
          </div>
        )}
        {listElementData.favorite && (
          <div
            className={styles.favorite}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              const heartImg = document.getElementById(
                `heart-${listElementData.id}`
              ) as HTMLImageElement;
              heartImg.src = "/heart.png";
            }}
          >
            <img src="/empty-heart.png" id={`heart-${listElementData.id}`} />
          </div>
        )}
        <div className={styles["element-image"]}>
          <img
            src={
              listElementData.imageSrc
                ? listElementData.imageSrc
                : "/default-equipment.jpg"
            }
          />
        </div>
        {listElementData.title && (
          <div className={styles.title}>{listElementData.title}</div>
        )}
        {(listElementData.name ||
          listElementData.description ||
          listElementData.hashtag) && (
          <div className={styles["element-text"]}>
            <div className={styles["element-name"]}>
              {listElementData.hashtag && (
                <span className={styles.hashtag}>
                  #{listElementData.hashtag.toLowerCase()}
                </span>
              )}
              {listElementData.name}
            </div>
            {listElementData.description && (
              <div className={styles["element-description"]}>
                {listElementData.description}
              </div>
            )}
          </div>
        )}
      </div>
      {children && (
        <div className={styles.footer}>
          {showChildren ? (
            <>
              {children}
              <div
                className={`${styles.hidden}`}
                onClick={() => setShowChildren(false)}
              >
                <span>
                  Hide<span className={styles["arrows-up"]}>»</span>
                </span>
              </div>
            </>
          ) : (
            <div
              className={`${styles.hidden}`}
              onClick={() => setShowChildren(true)}
            >
              <span>
                Show<span className={styles["arrows-down"]}>»</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ListElementCard;
