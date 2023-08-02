import { Docente } from "src/app/models/Docente";
import { IndicadorDocencia } from "./IndicadorDocencia";
import { InformeFinal } from "./InformeFinal/InformeFinal";

export type TareaDocenteDocencia = {
  id?: string;
  idTareaDocencia?: string;
  docenteAsignado?: Docente;
  estadoTareaDocente?: string;
  informeFinal?: InformeFinal;
  fechaEntrega?:Date;
  fechaModificacion?:Date;
};
