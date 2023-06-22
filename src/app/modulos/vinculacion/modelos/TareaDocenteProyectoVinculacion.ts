
import { Docente } from "src/app/models/Docente";
import { TareaVinculacion } from "./TareaVinculacion";
import { Indicador } from "src/app/models/Indicador";

export type TareaDocenteProyectoVinculacion = {
    tarea?: TareaVinculacion;
    docentes?: Docente[];
    indicadors?: Indicador[];
    claseCirculoPintar?:string;
};
