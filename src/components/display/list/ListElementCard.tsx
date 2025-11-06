import type { MouseEventHandler } from "react";
import styles from "./list-display.module.css";
import type { ListElementData } from "./ListElementData";

interface ListElementCardProps {
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
  extraClasses?: string;
  listElementData: ListElementData;
}

function ListElementCard({
  onClickHandler,
  extraClasses,
  listElementData,
}: ListElementCardProps) {
  return (
    <div
      className={`${styles.element} ${extraClasses}`}
      onClick={onClickHandler}
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
  );
}

export default ListElementCard;
