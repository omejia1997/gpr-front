import { TareaDocente } from "src/app/models/TareaDocente";
import { TareaVinculacion } from "../TareaVinculacion";
import { Series } from "./Series";

export type DashboardTareaVinculacion = {
    name?: string;
    value?: number;
    valueTotal?: number;
    tarea?: TareaVinculacion;
    series?:Series;
    tareaDocentes?:TareaDocente[];
};
