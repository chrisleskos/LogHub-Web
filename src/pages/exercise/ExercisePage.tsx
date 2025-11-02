import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ListElementCard from "../../components/display/list/ListElementCard";
import PageBase from "../../components/base/PageBase";
import List from "../../components/display/list/List";
import type { ExerciseResponse } from "../../interface/Exercise";

interface exerciseProps {
  baseUrl: string;
}

function ExercisePage({ baseUrl }: exerciseProps) {
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
        setExerciseList(response.data);
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
          exercise.description.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((exercise: ExerciseResponse) => (
        <ListElementCard
          listElement={{
            id: exercise.id,
            name: exercise.name,
            creator: exercise.creator,
            description: exercise.description,
            favorite: false,
            // hashtag: exercise.exerciseType,
          }}
          onClickHandler={() =>
            (window.location.href = "/exercise/" + exercise.id)
          }
          key={exercise.id}
        />
      ));
  };
  return (
    <>
      <PageBase />
      <h2>Exercises</h2>
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

export default ExercisePage;
