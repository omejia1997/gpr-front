import { Docente } from "src/app/models/Docente";

export type TareaDocenciaDTO = {
  idEspeDocenteRevisor?: string;
  nombreDocenteRevisor?: string;
  nombreTarea?: string;
  fechaCreaciontarea?: Date;
  fechaModificaciontarea?: Date;
  observacionTarea?: string[];
  estadoTarea?: string;
  periodo?: string;
  docentesAsignados?: Docente[];
};
