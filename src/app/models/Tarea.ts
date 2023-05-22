import { Proyecto } from "./Proyecto";
import { TareaDocente } from "./TareaDocente";

export type Tarea = {
  codigoTarea?: number;
  nombreTarea?: string;
  tipoTarea?: string;
  fechaCreaciontarea?: Date;
  prioridadTarea?: string;
  observacionTarea?: string;
  //descripicionTarea?: string;//indicador numerico,etc
  estadoTarea?: string;
  codigoProyecto?: Proyecto |null;
  fechaEntregaTarea?: Date |null|string;
  archivoTarea?: string;
  nombreArchivoTarea?: string;
  pesoTarea?: string;
  valorPesoTarea?:number;
  idDocenteRevisor?: string|null;
  nombreDocenteRevisor?: string|null;
  periodo?:string;
  fechaInicioTarea?:Date;
  fechaFinTarea?:Date;
  cantidadRepeticiones?: number;
  tipoActividad?: string;
  //codigoTareaPadre?:Tarea|null;
  tareaDocenteList?:TareaDocente[] ;
};
