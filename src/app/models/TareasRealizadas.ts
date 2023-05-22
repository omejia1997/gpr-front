import { TareaIndicador } from "./TareaIndicador";

export type TareasRealizadas = {
    nombreDocenteRevisor?: string;
    tipoTarea?: string;
    tipoProceso?: string;
    nombreProyecto?: string;
    nombreTarea?: string;
    prioridadTarea?: string;
    pesoTarea?: string;
    fechaCreaciontarea?:Date;
    fechaEntregaTarea?: Date;
    responsable?: string;
    tareaIndicadors?: TareaIndicador[];
    nombreArchivo?: string;
    urlArchivo?: string;
};