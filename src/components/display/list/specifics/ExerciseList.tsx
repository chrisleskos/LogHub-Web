import { useEffect, useState } from "react";
import ListElementCard from "../ListElementCard";
import Axios from "axios";
import { useCookies } from "react-cookie";
import List from "../List";
import type { ExerciseResponse } from "../../../../interface/Exercise";

interface ExerciseListProps {
  baseUrl: string;
  haveAddBtn?: boolean;
  idList?: number[];
  handleOnElementClick: (id: number) => void;
}

function ExerciseList({
  baseUrl,
  haveAddBtn = true,
  idList = [],
  handleOnElementClick,
}: ExerciseListProps) {
  const [cookies] = useCookies(["token"]);
  const exerciseURL = "exercise";
  const [exerciseList, setExerciseList] = useState([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const getAllUserexercise = () => {
    Axios.get(baseUrl + exerciseURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setExerciseList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUserexercise();
  }, []);

  const prepareDOMElements = () => {
    return exerciseList
      .filter(
        (exercise: ExerciseResponse) =>
          searchValue === "" ||
          exercise.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (exercise.description &&
            exercise.description
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
      )
      .map((exercise: ExerciseResponse) => (
        <ListElementCard
          listElementData={{
            id: exercise.id,
            name: exercise.name,
            creator: exercise.creator,
            description: exercise.description,
            favorite: false,
            // hashtag: exercise.exerciseType,
            imageSrc: "/exercise/exercise-icon.png",
          }}
          onClickHandler={() => handleOnElementClick(exercise.id)}
          key={exercise.id}
          isSelected={idList.includes(exercise.id)}
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

export default ExerciseList;
