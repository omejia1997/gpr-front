import { TareaDocenteProyecto } from "./TareaDocenteProyecto";
import { TipoProceso } from "./TipoProceso";

export type Periodo = {
  codigoPeriodo?: number;
  nombrePeriodo?: string;
  descripcionPeriodo?: string;
  estadoPeriodo?: string;
  fechaCreacionPeriodo?: Date;
  fechaModificacionPeriodo?:Date;
};
