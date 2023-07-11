import { Domicilio } from "./Domicilio";

export type ContactoEmergencia = {
  nombresCompletos?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  parentesco?: string;
  domicilio?: Domicilio;
};
