export interface LoginProps {
  onOpenRegistration: () => void;
  onClose: () => void;
}

export interface RegisterProps {
  onClose: () => void;
  openLogin: () => void;
}
