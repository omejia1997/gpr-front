import { Docente } from "src/app/models/Docente";
import { IndicadorDocencia } from "./IndicadorDocencia";

export type TareaDocenteDocencia = {
  id?: string;
  idTareaDocencia?: string;
  docenteAsignado?: Docente;
  estadoTareaDocente?: string;
  //fechaEntregaTarea?: Date;
  indicador?: IndicadorDocencia;
};
