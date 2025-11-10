import PageBase from "../../components/base/PageBase";
// import styles from "./equipment.module.css";
import EquipmentList from "../../components/display/list/specifics/EquipmentList";

interface EquipmentProps {
  baseUrl: string;
}

function EquipmentPage({ baseUrl }: EquipmentProps) {
  const handleElementClick = (id: number) => {
    window.location.href = "/equipment/" + id;
  };
  return (
    <>
      <PageBase header="Equipment" />
      <EquipmentList
        baseUrl={baseUrl}
        haveAddBtn={true}
        handleOnElementClick={handleElementClick}
      />
    </>
  );
}

export default EquipmentPage;
