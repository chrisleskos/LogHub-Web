import React, { useRef } from "react";
import InputField from "../../input/InputField";
import styles from "./list-display.module.css";
import AddNewListElement from "./AddNewListElement";
import ListElementCard from "./ListElementCard";

interface ListProps {
  children?: React.ReactNode;
  handleOnKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function List({ children, handleOnKeyUp }: ListProps) {
  const searchIputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className={styles["list-display"]}>
        <InputField
          placeHolder="Search"
          name="search-bar"
          id="search-bar"
          inputRef={searchIputRef}
          handleOnKeyUp={handleOnKeyUp}
        />
        <div className={styles["list-container"]}>
          <ListElementCard
            listElementData={{ title: "Add", imageSrc: "/add.png" }}
            onClickHandler={() =>
              (window.location.href += window.location.href.endsWith("/")
                ? `new`
                : "/new")
            }
          />
          {children}
        </div>
      </div>
    </>
  );
}

export default List;
