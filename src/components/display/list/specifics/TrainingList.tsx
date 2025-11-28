import { useEffect, useState } from "react";
import ListElementCard from "../ListElementCard";
import Axios from "axios";
import { useCookies } from "react-cookie";
import List from "../List";
import type { TrainingResponse } from "../../../../interface/Training";

interface TrainingListProps {
  baseUrl: string;
  haveAddBtn?: boolean;
  idList?: number[];
  handleOnElementClick: (id: number) => void;
}

function TrainingList({
  baseUrl,
  haveAddBtn = true,
  idList = [],
  handleOnElementClick,
}: TrainingListProps) {
  const [cookies] = useCookies(["token"]);
  const trainingURL = "training";
  const [trainingList, setTrainingList] = useState([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const getAllTrainings = () => {
    Axios.get(baseUrl + trainingURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setTrainingList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTrainings();
  }, []);

  const prepareDOMElements = () => {
    return trainingList
      .filter(
        (Training: TrainingResponse) =>
          searchValue === "" ||
          Training.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((training: TrainingResponse) => (
        <ListElementCard
          listElementData={{
            id: training.id,
            name: training.name,
            creator: training.creator,
            description: training.description,
            favorite: false,
            // hashtag: Training.TrainingType,
            imageSrc: "/training/training-icon.png",
          }}
          onClickHandler={() => handleOnElementClick(training.id)}
          key={training.id}
          isSelected={idList.includes(training.id)}
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

export default TrainingList;
