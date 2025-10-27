import { useEffect, useState } from "react";
import PageBase from "../../components/base/PageBase";
import InputField from "../../components/input/InputField";
// import type { EquipmentRequest } from "../../interface/Equipment";
import styles from "./new-equipment.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";

interface EquipmentProps {
  baseUrl: string;
}

function NewEquipmentPage({ baseUrl }: EquipmentProps) {
  //   let requestBody: EquipmentRequest;
  const [cookies] = useCookies(["token"]);
  const equipmentURL = "equipment/";
  const equipmentTypesURL = "types";

  const [equipmentTypesList, setEquipmentTypesList] = useState([]);

  useEffect(() => {
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
  }, []);

  const prepareDOMElements = () => {
    return equipmentTypesList.map((type: string) => (
      <div className={styles["type-selection"]}>{type}</div>
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
            // ref={progressBar}
            className="progress-bar progress-bar-striped progress-bar-animated"
          ></div>
        </div>
        {/* Back/Next buttons */}
        {/*  */}
        <div className={styles["form-slide"]} id="slide1">
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
        <div className={styles["form-slide"]} id="slide2">
          <InputField placeHolder="Name" />
          <div className={styles["input-wrap"]}>
            <span>Description</span>
            <textarea />
          </div>
        </div>
      </form>
    </>
  );
}

export default NewEquipmentPage;
