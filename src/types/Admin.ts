export interface Admin {
  id: number;
  email: string;
}

export interface AdminContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

export interface AdminUpdate {
  currentPassword: string;
  newPassword: string;
  newEmail: string;
}
