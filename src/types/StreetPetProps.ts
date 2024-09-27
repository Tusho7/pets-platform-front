import { User } from "./User";

export interface StreetPet {
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

export interface StreetPetImageModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  fromProfile?: boolean;
  petId?: number;
  onUpdate?: (updatedImages: string[]) => void;
}

export interface StreetPetVideosModalProps {
  isOpen: boolean;
  videos: string[];
  onClose: () => void;
  fromProfile?: boolean;
}

export interface StreetPetEditModalProps {
  pet: StreetPet;
  onClose: () => void;
  onUpdate: (updatedPet: StreetPet) => void;
}

export interface StreetPetModalProps {
  onClose: () => void;
  onUpdate: () => void;
}
