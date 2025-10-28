import type { MouseEventHandler } from "react";
import styles from "./list-display.module.css";
import type { ListElement } from "./ListElement";

interface ListElementCardProps {
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
  extraClasses?: string;
  listElement: ListElement;
}

function ListElementCard({
  onClickHandler,
  extraClasses,
  listElement,
}: ListElementCardProps) {
  return (
    <div
      className={`${styles.element} ${extraClasses}`}
      onClick={onClickHandler}
    >
      {listElement.creator && (
        <div
          className={styles.creator}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            window.location.href = "/" + listElement.creator;
          }}
        >
          @{listElement.creator}
        </div>
      )}
      {listElement.favorite && (
        <div
          className={styles.favorite}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            const heartImg = document.getElementById(
              `heart-${listElement.id}`
            ) as HTMLImageElement;
            heartImg.src = "/heart.png";
          }}
        >
          <img src="/empty-heart.png" id={`heart-${listElement.id}`} />
        </div>
      )}
      <div className={styles["element-image"]}>
        <img src="/default-equipment.jpg" />
      </div>

      <div className={styles["element-text"]}>
        <div className={styles["element-name"]}>
          {listElement.hashtag && (
            <span className={styles.hashtag}>
              #{listElement.hashtag.toLowerCase()}
            </span>
          )}
          {listElement.name}
        </div>
        {listElement.description && (
          <div className={styles["element-description"]}>
            {listElement.description}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListElementCard;
