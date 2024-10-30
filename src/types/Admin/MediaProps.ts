import { LostPet } from "../LostPetProps";
import { StreetPet } from "../StreetPetProps";

export interface StreetPetMediaProps {
  selectedPet: StreetPet;
  closeModal: () => void;
}

export interface LostPetMediaProps {
  selectedPet: LostPet;
  closeModal: () => void;
}
