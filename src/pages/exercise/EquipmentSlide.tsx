import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import type { NewExerciseSlideProps } from "./NewExerciseSlideProps";
import EquipmentList from "../../components/display/list/specifics/EquipmentList";

function EquipmentSlide({
  baseUrl,
  exerciseRequest,
  setExerciseRequest,
  prevStep = () => {},
}: NewExerciseSlideProps) {
  const setPossibleEquipment = (equipment: number) => {
    setExerciseRequest((prev) => ({
      ...prev,
      possibleEquipment: prev.possibleEquipment.includes(equipment)
        ? prev.possibleEquipment.filter((u) => u !== equipment)
        : [...prev.possibleEquipment, equipment],
    }));
  };

  return (
    <div className={creationFormStyles["form-slide"]} id="slide5">
      <AlertMessage>
        Select <strong>possible equipment</strong> to use for this exercise
      </AlertMessage>
      <EquipmentList
        baseUrl={baseUrl}
        haveAddBtn={false}
        handleOnElementClick={(id: number) => {
          setPossibleEquipment(id);
        }}
        idList={exerciseRequest.possibleEquipment}
      />
      <div className={creationFormStyles["nav-btn-wrap"]}>
        <div
          onClick={() => {
            prevStep();
          }}
          className={creationFormStyles.step}
        >
          &#60; Back
        </div>

        <button>Submit</button>
      </div>
    </div>
  );
}

export default EquipmentSlide;
