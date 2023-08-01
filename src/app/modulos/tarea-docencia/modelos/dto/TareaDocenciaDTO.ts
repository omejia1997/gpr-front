import { Docente } from "src/app/models/Docente";

export type TareaDocenciaDTO = {
  id?: string;
  idEspeDocenteRevisor?: string;
  codigoPeriodo?: number;
  nombreDocenteRevisor?: string;
  nombreTarea?: string;
  fechaCreaciontarea?: Date;
  fechaModificaciontarea?: Date;
  observacionTarea?: string[];
  estadoTarea?: string;
  docentesAsignados?: Docente[];
};
