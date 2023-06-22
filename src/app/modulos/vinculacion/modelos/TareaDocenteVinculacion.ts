import { Docente } from "src/app/models/Docente";
import { TareaIndicador } from "src/app/models/TareaIndicador";
import { TareaVinculacion } from "./TareaVinculacion";

export type TareaDocenteVinculacion = {
    id?: string;
    tarea?: TareaVinculacion;
    nombreArchivoTareaDocenteEnStorage?: string;
    descripcionTareadocente?: string;
    estadoTareaDocente?: string;
    nombreArchivoTareaDocente?: string;
    fechaEntregadaTareaDocente?: Date;
    cedulaDocenteRevisor?: string;
    docente?: Docente;
    //codigoTarea?: Tarea;
    tareaIndicadorList?:TareaIndicador[];
};
