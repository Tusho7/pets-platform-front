export interface Admin {
  id: number;
  email: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
}

export interface AdminContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

export interface UpdateAdminData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
