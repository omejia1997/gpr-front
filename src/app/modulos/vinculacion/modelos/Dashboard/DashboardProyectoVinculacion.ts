import { ProyectoVinculacion } from "../ProyectoVinculacion";
import { DashboardTareaVinculacion } from "./DashboardTareaVinculacion";

export type DashboardProyectoVinculacion= {
    name?: string;
    value?: number |any;
    valueTotal?: number;
    proyecto?: ProyectoVinculacion;
    dasboardTareaVinculacionList?:DashboardTareaVinculacion[];
};
