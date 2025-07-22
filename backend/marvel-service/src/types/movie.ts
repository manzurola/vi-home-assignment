export interface Movie {
  id: string;
  title: string;
  release_date: string | null;
  overview: string | null;
  // cast?: string[]; // Uncomment if you want to expose related ids
}
