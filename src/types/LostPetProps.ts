import { User } from "./User";

export interface LostPet {
  id: number;
  pet_name: string;
  breed: string;
  age: number;
  gender: string;
  description?: string;
  location: string;
  aggresive: boolean;
  status: string;
  images?: string[];
  videos?: string[];
  User?: User;
}

export interface LostPetImageModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  fromProfile?: boolean;
}

export interface LostPetVideosModalProps {
  isOpen: boolean;
  videos: string[];
  onClose: () => void;
  fromProfile?: boolean;
}

export interface LostPetEditModalProps {
  pet: LostPet;
  onClose: () => void;
  onUpdate: (updatedPet: LostPet) => void;
}

export interface LostPetModalProps {
  onClose: () => void;
}
