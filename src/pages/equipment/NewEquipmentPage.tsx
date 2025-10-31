import { useEffect, useRef, useState } from "react";
import PageBase from "../../components/base/PageBase";
import InputField from "../../components/input/InputField";
// import type { EquipmentRequest } from "../../interface/Equipment";
import styles from "./new-equipment.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import TextAreaField from "../../components/input/TextAreaField";
import ListElementCard from "../../components/display/list/ListElementCard";
import type { EquipmentRequest } from "../../interface/Equipment";
import CreationForm from "../../components/creationForm/CreationForm";
import type { ProgressBarRef } from "../../components/progressBar/ProgressBar";

interface EquipmentProps {
  baseUrl: string;
}

function NewEquipmentPage({ baseUrl }: EquipmentProps) {
  const [cookies] = useCookies(["token"]);
  const equipmentURL = "equipment/";
  const equipmentTypesURL = "types";

  const typeSelectionSlide = useRef<HTMLDivElement>(null);
  const detailsSlide = useRef<HTMLDivElement>(null);
  const [equipmentTypesList, setEquipmentTypesList] = useState([]);

  const progressBarRef = useRef<ProgressBarRef>(null);

  let equipmentRequest: EquipmentRequest = {
    name: "",
    description: "",
    equipmentType: "",
  };

  const selectEquipmentType = (type: string) => {
    equipmentRequest.equipmentType = type;
  };

  useEffect(() => {
    // Get Equipment Types
    Axios.get(baseUrl + equipmentURL + equipmentTypesURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setEquipmentTypesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseUrl, equipmentURL]);

  const prepareDOMElements = () => {
    return equipmentTypesList.map((type: string) => (
      <ListElementCard
        listElement={{
          // Edit the string enum format
          name: type
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
        }}
        extraClasses={`${styles["equipment-type-card"]} ${cardStyles["smaller-text"]}`}
        onClickHandler={() => {
          selectEquipmentType(type);
          progressBarRef.current?.nextStep();
        }}
        key={type}
      />
    ));
  };
  return (
    <>
      <PageBase />
      <div className={styles["form-name"]}>New Equipment</div>
      <form>
        <CreationForm ref={progressBarRef}>
          <div
            className={styles["form-slide"]}
            id="slide1"
            ref={typeSelectionSlide}
          >
            <div className={styles["form-slide-header"]}>
              Select type of equipment
              <div className={styles["types-container"]}>
                {prepareDOMElements()}
              </div>
            </div>
            <div className={styles["type-select-container"]}>
              <div className={styles.types}></div>
            </div>
          </div>
          <div className={styles["form-slide"]} id="slide2" ref={detailsSlide}>
            <InputField placeHolder="Name" />
            <TextAreaField placeHolder="Description" />
          </div>
        </CreationForm>
      </form>
    </>
  );
}

export default NewEquipmentPage;
