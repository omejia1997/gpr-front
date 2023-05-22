import { Docente } from "./Docente";
import { Tarea } from "./Tarea";
import { TareaIndicador } from "./TareaIndicador";

export type TareaDocente = {
    codigoTareaDocente?: number;
    archivoTareaDocente?: string;
    descripcionTareadocente?: string;
    estadoTareaDocente?: string;
    nombreArchivoTareaDocente?: string;
    codigoDocente?: Docente;
    codigoTarea?: Tarea;
    tareaIndicadorList?:TareaIndicador[];
    //private List<TareaIndicador> tareaIndicadorList;
};
