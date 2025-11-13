import React, { useEffect, useState } from "react";
import List from "../List";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { ExerciseInstanceResponse } from "../../../../interface/ExerciseInstance";
import ListElementCard from "../ListElementCard";

interface ExerciseInstanceListProps {
  baseUrl: string;
  haveAddBtn?: boolean;
  idList?: number[];
  handleOnElementClick: (id: number) => void;
}

function ExerciseInstanceList({
  baseUrl,
  haveAddBtn = true,
  idList = [],
  handleOnElementClick,
}: ExerciseInstanceListProps) {
  const [cookies] = useCookies(["token"]);
  const exerciseInstanceURL = "exercise-instance/";
  const [exerciseInstanceList, setExerciseInstanceList] = useState([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const getAllUserEquipment = () => {
    Axios.get(baseUrl + exerciseInstanceURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setExerciseInstanceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUserEquipment();
  }, []);

  const prepareDOMElements = () => {
    return exerciseInstanceList
      .filter(
        (exerciseInstance: ExerciseInstanceResponse) =>
          searchValue === "" ||
          exerciseInstance.exercise.name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          exerciseInstance.comment
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map((exerciseInstance: ExerciseInstanceResponse) => (
        <ListElementCard
          listElementData={{
            id: exerciseInstance.id,
            name: exerciseInstance.exercise.name + " Instance",
            creator: exerciseInstance.creator,
            // description: exerciseInstance.description,
            favorite: false,
            // hashtag: exerciseInstance.,
          }}
          onClickHandler={() => handleOnElementClick(exerciseInstance.id)}
          key={exerciseInstance.id}
          isSelected={idList.includes(exerciseInstance.id)}
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

export default ExerciseInstanceList;
