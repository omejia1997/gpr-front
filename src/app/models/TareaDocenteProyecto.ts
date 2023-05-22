import { Docente } from "./Docente";
import { Indicador } from "./Indicador";
import { Tarea } from "./Tarea";
import { TareaDocente } from "./TareaDocente";

export type TareaDocenteProyecto = {
    tarea?: Tarea;
    docentes?: Docente[];
    indicadors?: Indicador[];
};
