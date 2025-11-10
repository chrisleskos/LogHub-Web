import { useEffect, useState } from "react";
import type { EquipmentResponse } from "../../../../interface/Equipment";
import ListElementCard from "../ListElementCard";
import Axios from "axios";
import { useCookies } from "react-cookie";
import List from "../List";

interface EquipmentListProps {
  baseUrl: string;
  haveAddBtn?: boolean;
  idList?: number[];
  handleOnElementClick: (id: number) => void;
}

function EquipmentList({
  baseUrl,
  haveAddBtn = true,
  idList = [],
  handleOnElementClick,
}: EquipmentListProps) {
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
          listElementData={{
            id: equipment.id,
            name: equipment.name,
            creator: equipment.creator,
            description: equipment.description,
            favorite: false,
            hashtag: equipment.equipmentType,
          }}
          onClickHandler={() => handleOnElementClick(equipment.id)}
          key={equipment.id}
          isSelected={idList.includes(equipment.id)}
        />
      ));
  };
  return (
    <List
      handleOnKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
      }}
      haveAddBtn={haveAddBtn}
    >
      {prepareDOMElements()}
    </List>
  );
}

export default EquipmentList;
