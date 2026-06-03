export type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phone?: string | null;
  avatarUrl?: string | null;
  aboutMe?: string | null;
  lat?: string | null;
  lng?: string | null;
  city?: string | null;
};