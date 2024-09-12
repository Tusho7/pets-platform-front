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
}

export interface LostPetImageModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
}

export interface LostPetVideosModalProps {
  isOpen: boolean;
  videos: string[];
  onClose: () => void;
}
