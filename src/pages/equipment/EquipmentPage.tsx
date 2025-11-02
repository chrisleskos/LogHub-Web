import Axios from "axios";
import PageBase from "../../components/base/PageBase";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { EquipmentResponse } from "../../interface/Equipment";
// import styles from "./equipment.module.css";
import ListElementCard from "../../components/display/list/ListElementCard";
import List from "../../components/display/list/List";

interface EquipmentProps {
  baseUrl: string;
}

function EquipmentPage({ baseUrl }: EquipmentProps) {
  const [cookies] = useCookies(["token"]);
  const equipmentURL = "equipment";
  const [equipmentList, setEquipmentList] = useState([]);
  const [searchValue, setSearchValue] = useState<string>("");

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
  }, []);

  const prepareDOMElements = () => {
    return equipmentList
      .filter(
        (equipment: EquipmentResponse) =>
          searchValue === "" ||
          equipment.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          equipment.description
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map((equipment: EquipmentResponse) => (
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
      <PageBase header="Equipment" />
      <List
        handleOnKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          setSearchValue(e.currentTarget.value);
        }}
      >
        {prepareDOMElements()}
      </List>
    </>
  );
}

export default EquipmentPage;
