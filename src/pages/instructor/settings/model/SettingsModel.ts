export interface InstructorProfile {
  name: string;
  email: string;
  bio: string;
  avatar?: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}