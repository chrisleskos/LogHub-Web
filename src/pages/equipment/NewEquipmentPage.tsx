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

interface EquipmentProps {
  baseUrl: string;
}

function NewEquipmentPage({ baseUrl }: EquipmentProps) {
  const progressBar = useRef<HTMLDivElement>(null);
  const typeSelectionSlide = useRef<HTMLDivElement>(null);
  const detailsSlide = useRef<HTMLDivElement>(null);
  const [progressLevel, setProgressLevel] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const minPerc = 3; // %
  const stepPerc = 100 / totalSteps;

  const updateProgressBarLevel = (level: number) => {
    setProgressLevel(Math.min(Math.max(level, 0), 100)); // if is lower than 0, pick 0. If its higher than 100, pick 100
    progressBar.current!.style.width = (level <= 0 ? minPerc : level) + "%";
  };

  const initProgressBar = () => {
    setTotalSteps(document.getElementsByClassName(styles["form-slide"]).length);
    console.log(totalSteps);
  };

  const nextStep = () => {
    updateProgressBarLevel(progressLevel + stepPerc);
    updateFormSlide(formStep + 1);
  };

  //   const previousStep = () => {
  //     updateProgressBarLevel(progressLevel - stepPerc);
  //     updateFormSlide(formStep - 1);
  //   };

  const updateFormSlide = (step: number) => {
    setFormStep(step);
    switch (step) {
      case 0: {
        typeSelectionSlide.current!.style.display = "block";
        detailsSlide.current!.style.display = "none";
        // formRef.current!.style.display = "none";
        break;
      }
      case 1: {
        typeSelectionSlide.current!.style.display = "none";
        detailsSlide.current!.style.display = "block";
        // formRef.current!.style.display = "none";
        break;
      }
      case 2: {
        typeSelectionSlide.current!.style.display = "none";
        detailsSlide.current!.style.display = "none";
        // formRef.current!.style.display = "block";
      }
    }
  };

  const [cookies] = useCookies(["token"]);
  const equipmentURL = "equipment/";
  const equipmentTypesURL = "types";

  const [equipmentTypesList, setEquipmentTypesList] = useState([]);

  let equipmentRequest: EquipmentRequest = {
    name: "",
    description: "",
    equipmentType: "",
  };

  const selectEquipmentType = (type: string) => {
    equipmentRequest.equipmentType = type;
    nextStep();
  };

  useEffect(() => {
    initProgressBar();
    updateProgressBarLevel(0);
    updateFormSlide(formStep);
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
  }, [formStep]);

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
        onClickHandler={() => selectEquipmentType(type)}
        key={type}
      />
    ));
  };
  return (
    <>
      <PageBase />
      <div className={styles["form-name"]}>New Equipment</div>
      <form>
        {/* progression bar */}
        <div
          className="progress"
          role="progressbar"
          aria-label="Animated striped example"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            ref={progressBar}
            className="progress-bar progress-bar-striped progress-bar-animated"
          ></div>
        </div>
        {/* Back/Next buttons */}
        {/*  */}
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
      </form>
    </>
  );
}

export default NewEquipmentPage;
