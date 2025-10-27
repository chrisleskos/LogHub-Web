import Axios from "axios";
import PageBase from "../../components/base/PageBase";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { EquipmentResponse } from "../../interface/Equipment";
import styles from "./equipment.module.css";
import InputField from "../../components/input/InputField";

interface EquipmentProps {
  baseUrl: string;
}

function EquipmentPage({ baseUrl }: EquipmentProps) {
  const [cookies] = useCookies(["token"]);
  const equipmentURL = "equipment";
  const [equipmentList, setEquipmentList] = useState([]);
  const getAllUserEquipment = () => {
    Axios.get(baseUrl + equipmentURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setEquipmentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUserEquipment();
  }, [baseUrl, equipmentURL]);

  const prepareDOMElements = () => {
    return equipmentList.map((equipment: EquipmentResponse) => (
      <div
        className={styles.equipment}
        onClick={() => (window.location.href = "/equipment/" + equipment.id)}
        key={equipment.id}
      >
        <div
          className={styles.creator}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            window.location.href = "/" + equipment.creator;
          }}
        >
          @{equipment.creator}
        </div>
        <div className={styles["equipment-image"]}>
          <img src="/default-equipment.jpg" />
        </div>
        <div className={styles["equipment-text"]}>
          <div className={styles["equipment-name"]}>
            <span className={styles.hashtag}>
              #{equipment.equipmentType.toLowerCase()}
            </span>
            {equipment.name}
          </div>

          <div className={styles["equipment-description"]}>
            {equipment.description}
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      <PageBase />
      <h1>Equipment</h1>
      <div className={styles["list-display"]}>
        <InputField placeHolder="Search" />
        <div className={styles["equipment-container"]}>
          <div
            className={styles.equipment + " " + styles["add-new"]}
            onClick={() => (window.location.href = "/equipment/new")}
          >
            <div className={styles["equipment-image"]}>
              <img src="/add.png" />
            </div>
            <div className={styles["equipment-text"]}>
              <div className={styles["equipment-name"]}>Add new</div>
            </div>
          </div>
          {prepareDOMElements()}
        </div>
      </div>
    </>
  );
}

export default EquipmentPage;
