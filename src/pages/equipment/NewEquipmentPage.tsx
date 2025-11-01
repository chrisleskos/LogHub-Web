import { useEffect, useMemo, useRef, useState } from "react";
import PageBase from "../../components/base/PageBase";
import InputField from "../../components/input/InputField";
import styles from "./new-equipment.module.css";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import TextAreaField from "../../components/input/TextAreaField";
import ListElementCard from "../../components/display/list/ListElementCard";
import type { EquipmentRequest } from "../../interface/Equipment";
import CreationForm, {
  type CreationFormRef,
} from "../../components/creationForm/CreationForm";

interface EquipmentProps {
  baseUrl: string;
}

function NewEquipmentPage({ baseUrl }: EquipmentProps) {
  const [cookies] = useCookies(["token"]);
  const equipmentURL = "equipment/";
  const equipmentTypesURL = "types";

  const typeSelectionSlide = useRef<HTMLDivElement>(null);
  const detailsSlide = useRef<HTMLDivElement>(null);
  const [equipmentTypesList, setEquipmentTypesList] = useState([]);

  const creationFormRef = useRef<CreationFormRef>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const nextStep = () => creationFormRef.current?.nextStep();
  const prevStep = () => creationFormRef.current?.prevStep();

  const [equipmentRequest, setEquipmentRequest] = useState<EquipmentRequest>({
    name: "",
    description: "",
    equipmentType: "",
  });

  const setEquipmentType = (type: string) => {
    setEquipmentRequest({
      name: equipmentRequest.name,
      description: equipmentRequest.description,
      equipmentType: type,
    });
  };

  const setEquipmentName = (name: string) => {
    setEquipmentRequest({
      name: name,
      description: equipmentRequest.description,
      equipmentType: equipmentRequest.equipmentType,
    });
  };

  const setEquipmentDescription = (description: string) => {
    setEquipmentRequest({
      name: equipmentRequest.name,
      description: description,
      equipmentType: equipmentRequest.equipmentType,
    });
  };

  const handleNameInputOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setEquipmentName(e.currentTarget.value);
  };

  const handleDescInputOnKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setEquipmentDescription(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    nextStep();

    Axios.post(baseUrl + equipmentURL, equipmentRequest, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    }).then();
  };

  useEffect(() => {
    // Get Equipment Types
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
  }, [baseUrl, equipmentURL]);

  const prepareDOMElements = useMemo(() => {
    return equipmentTypesList.map((type: string) => (
      <ListElementCard
        listElement={{
          // Edit the string enum format
          name: type
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
        }}
        extraClasses={`${styles["equipment-type-card"]} ${cardStyles["smaller-text"]}`}
        onClickHandler={() => {
          setEquipmentType(type);
          nextStep();
        }}
        key={type}
      />
    ));
  }, [equipmentTypesList]);
  return (
    <>
      <PageBase />
      <div className={styles["form-name"]}>New Equipment</div>
      <div className={styles["selected-type"]}>
        #{equipmentRequest.equipmentType.toLowerCase()}
      </div>

      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        <div
          className={creationFormStyles["form-slide"]}
          id="slide1"
          ref={typeSelectionSlide}
        >
          <div className={styles["form-slide-header"]}>
            Select type of equipment
            <div className={styles["types-container"]}>
              {prepareDOMElements}
            </div>
          </div>
          <div className={styles["type-select-container"]}>
            <div className={styles.types}></div>
          </div>
        </div>
        <div
          className={creationFormStyles["form-slide"]}
          id="slide2"
          ref={detailsSlide}
        >
          <div
            onClick={() => {
              prevStep();
            }}
          >
            Prev
          </div>
          <InputField
            placeHolder="Name"
            name="equiupment-name"
            id="equipment-name"
            inputRef={nameInputRef}
            handleOnKeyUp={handleNameInputOnKeyUp}
          />
          <TextAreaField
            placeHolder="Description"
            name="equipment-description"
            id="equipment-description"
            inputRef={descriptionInputRef}
            handleOnKeyUp={handleDescInputOnKeyUp}
          />
          <button>Submit</button>
        </div>
      </CreationForm>
    </>
  );
}

export default NewEquipmentPage;
