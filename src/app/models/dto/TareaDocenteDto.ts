import { Docente } from "../Docente";
import { Tarea } from "../Tarea";
import { TareaIndicador } from "../TareaIndicador";

export type TareaDocenteDto = {
    codigoTareaDocente?: number;
    archivoTareaDocente?: string;
    descripcionTareadocente?: string;
    estadoTareaDocente?: string;
    nombreArchivoTareaDocente?: string;
    fechaEntregadaTareaDocente?: Date;
    cedulaDocenteRevisor?: string;
    codigoDocente?: Docente;
    codigoTarea?: Tarea;
    tareaIndicadorList?:TareaIndicador[];
};
