export interface Actor {
  id: string;
  name: string;
  profile_path: string | null;
  // movie_roles?: string[]; // Uncomment if you want to expose related ids
}
