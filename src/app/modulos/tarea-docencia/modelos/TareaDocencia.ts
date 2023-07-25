import { TareaDocenteDocencia } from "./TareaDocenteDocencia";

export type TareaDocencia = {
  id?: string;
  idEspeDocenteRevisor?: string;
  nombreDocenteRevisor?: string;
  nombreTarea?: string;
  fechaCreaciontarea?: Date;
  fechaModificaciontarea?: Date;
  observacionTarea?: string[];
  estadoTarea?: string;
  periodo?: string;
};
