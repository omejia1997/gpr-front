import { ProyectoVinculacion } from "./ProyectoVinculacion";

export type TareaVinculacion = {
  id?: string;
  nombreTarea?: string;
  //tipoTarea?: string;
  fechaCreaciontarea?: Date;
  //prioridadTarea?: string;
  observacionTarea?: string;
  estadoTarea?: string;
  proyecto?: ProyectoVinculacion |null;
  fechaEntregaTarea?: Date |null|string;
  nombreArchivoTareaEnStorage?: string;
  nombreArchivoTarea?: string;
  // pesoTarea?: string;
  // valorPesoTarea?:number;
  idDocenteRevisor?: string|null;
  nombreDocenteRevisor?: string|null;
  periodo?:string;
  fechaInicioTarea?:Date;
  fechaFinTarea?:Date;
  cantidadRepeticiones?: number;
  tipoActividad?: string;//programada|no programada
  //tareaDocenteList?:TareaDocenteVinculacion[] ;
};
