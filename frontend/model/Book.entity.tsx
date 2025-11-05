export interface Book {
  id: number;
  titre: string;
  auteur: string;
  isbn: string;
  date_publication: Date;
  genre: string;
  couverture_url: string;
  status: string;
  date_debut_lecture: Date;
  date_fin_lecture: Date;
  note: number;
  notes_personnelles: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;

}