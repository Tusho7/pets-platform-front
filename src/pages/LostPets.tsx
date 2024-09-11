import { useState } from "react";
import Lostpet from "../modals/Lostpet";

const LostPets = () => {
  const [lostPetModalOpen, setLostPetModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setLostPetModalOpen(true)}>Add Lost Pet</button>

      {lostPetModalOpen && <Lostpet />}
    </div>
  );
};

export default LostPets;
