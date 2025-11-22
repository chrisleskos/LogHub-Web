import { useEffect, useState } from "react";
import ListElementCard from "../ListElementCard";
import Axios from "axios";
import { useCookies } from "react-cookie";
import List from "../List";
import type { SequenceResponse } from "../../../../interface/Sequence";

interface SequenceListProps {
  baseUrl: string;
  haveAddBtn?: boolean;
  idList?: number[];
  handleOnElementClick: (id: number) => void;
}

function SequenceList({
  baseUrl,
  haveAddBtn = true,
  idList = [],
  handleOnElementClick,
}: SequenceListProps) {
  const [cookies] = useCookies(["token"]);
  const sequenceURL = "sequence";
  const [sequenceList, setSequenceList] = useState([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const getAllSequences = () => {
    Axios.get(baseUrl + sequenceURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setSequenceList(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllSequences();
  }, []);

  const prepareDOMElements = () => {
    return sequenceList
      .filter(
        (sequence: SequenceResponse) =>
          searchValue === "" ||
          sequence.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((sequence: SequenceResponse) => (
        <ListElementCard
          listElementData={{
            id: sequence.id,
            name: sequence.name,
            creator: sequence.creator,
            // description: sequence.description,
            favorite: false,
            // hashtag: sequence.sequenceType,
            imageSrc: "/sequence/sequence-icon.png",
          }}
          onClickHandler={() => handleOnElementClick(sequence.id)}
          key={sequence.id}
          isSelected={idList.includes(sequence.id)}
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

export default SequenceList;
