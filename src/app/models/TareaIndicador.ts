import { Indicador } from "./Indicador";
import { TareaDocente } from "./TareaDocente";

export type TareaIndicador = {
    codigoTareaIndicador?: number;
    fechaCreacionIndicador?: Date;
    valorIndicador?: string;
    descripcionTareaIndicador?:string;
    indicadorCODIGOINDICADOR?: Indicador;
    tareadocenteCODIGOTAREADOCENTE?: TareaDocente;
};
