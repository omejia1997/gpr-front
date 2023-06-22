import { Proyecto } from "src/app/models/Proyecto";
import { DashboardTareaInvestigacion } from "./DashboardTareaInvestigacion";

export type DashboardProyectoInvestigacion = {
    name?: string;
    value?: number |any;
    valueTotal?: number;
    proyecto?: Proyecto;
    dasboardTareaInvestigacionList?:DashboardTareaInvestigacion[];
};
