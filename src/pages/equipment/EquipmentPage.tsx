import Axios from "axios";
import PageBase from "../../components/base/PageBase";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { EquipmentResponse } from "../../interface/Equipment";
import styles from "./equipment.module.css";
import InputField from "../../components/input/InputField";
import ListElementCard from "../../components/display/list/ListElementCard";
import AddNewListElement from "../../components/display/list/AddNewListElement";

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
      <ListElementCard
        listElement={{
          id: equipment.id,
          name: equipment.name,
          creator: equipment.creator,
          description: equipment.description,
          favorite: false,
          hashtag: equipment.equipmentType,
        }}
        onClickHandler={() =>
          (window.location.href = "/equipment/" + equipment.id)
        }
        key={equipment.id}
      />
    ));
  };
  return (
    <>
      <PageBase />
      <h1>Equipment</h1>
      <div className={styles["list-display"]}>
        <InputField placeHolder="Search" />
        <div className={styles["equipment-container"]}>
          <AddNewListElement responseLocation="equipment" />
          {prepareDOMElements()}
        </div>
      </div>
    </>
  );
}

export default EquipmentPage;
