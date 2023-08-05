import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { DocenteInformacion } from '../../../modelos/DocenteInformacion';
import { DocenteInformacionService } from '../../../servicios/DocenteInformacion.service';
import { FormacionAcademicaAdicional } from '../../../modelos/FormacionAcademicaAdicional';
import { Idioma } from '../../../modelos/Idioma';
import { Publicacion } from '../../../modelos/Publicacion';
import { ExperienciaProfesional } from '../../../modelos/ExperienciaProfesional';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-docentes-informacion',
  templateUrl: './listar-docentes-informacion.component.html',
  styleUrls: ['./listar-docentes-informacion.component.css'],
})
export class ListarDocentesInformacionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //docentesInfromacion: any[] | undefined = [];
  cedulaDocenteRevisor: any;
  dataTable: any | null;
  data: any;
  name = 'DatosInformacionPersonal.xlsx';
  blockedDocument: boolean = false;
  getInformacionDocentes$: Observable<DocenteInformacion[]>;
  displayedColumns: string[] = [
    'tipoDocumento',
    'numeroDocumento',
    'idEspe',
    'nombreCompleto',
    'fechaNacimiento',
    'edad',
    'genero',
    'estadoCivil',
    'nacionalidad',
    'tipoSangre',
    'aniosResidencia',
    'etnia',
    'grupoEtnico',
    'correoPrincipal',
    'correoAlternativo',

    'discapacidadEspecial',
    'tipoDiscapacidad',
    'porcentajeDiscapacidad',
    'numeroCarnet',
    'enfermedadCatastrofica',
    'tipoEnfermedadCatastrofica',

    'provincia',
    'canton',
    'parroquia',
    'callePrincipal',
    'calleSecundaria',
    'numeroDomicilio',
    'referencia',
    'telefonoDomicilio',
    'telefonoCelular',
    'telefonoTrabajo',//'extension',

    'nombresCompletosContacto',
    'tipoDocumentoContacto',
    'numeroDocumentoContacto',
    'parentesco',
    'provinciaContacto',
    'cantonContacto',
    'parroquiaContacto',
    'callePrincipalContacto',
    'calleSecundariaContacto',
    'numeroDomicilioContacto',
    'referenciaContacto',
    'telefonoDomicilioContacto',
    'telefonoCelularContacto',

    'tipoinstitucionFinanciera',
    'nombreinstitucionFinanciera',
    'tipoCuenta',
    'numeroCuenta',

    'nivelInstruccion',
    'institucion',
    'tituloObtenido',
    'tiempoEstudio',//periodoEstudio
    'numeroRegistroSenescyt',
    'pais',
    'fechaRegistroSenescyt',
    'fechaGraduacion',
    'export'
  ];

  dataSource: any;

  readonly formControl: AbstractControl;

  constructor(
    private docenteInformacionService: DocenteInformacionService,
    formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.getInformacionDocentes$ =
      this.docenteInformacionService.listarTodosDocentes();
    this.getInformacionDocentes();

    this.formControl = formBuilder.group({
      tipoDocumento:'',
      numeroDocumento:'',
      idEspe:'',
      nombreCompleto:'',
      //fechaNacimiento:'',
      //edad:'',
      genero:'',
      estadoCivil:'',
      nacionalidad:'',
      tipoSangre:'',
      aniosResidencia:'',
      etnia:'',
      grupoEtnico:'',
      //correoPrincipal:'',
      //correoAlternativo:'',

      discapacidadEspecial:'',
      tipoDiscapacidad:'',
      //porcentajeDiscapacidad:'',
      numeroCarnet:'',
      enfermedadCatastrofica:'',
      tipoEnfermedadCatastrofica:'',

      provincia:'',
      canton:'',
      parroquia:'',
      //callePrincipal:'',
      //calleSecundaria:'',
      //numeroDomicilio:'',
      //referencia:'',
      //telefonoDomicilio:'',
      //telefonoCelular:'',
      //telefonoTrabajo:'',
      //extension:'',

      nombresCompletosContacto:'',
      tipoDocumentoContacto:'',
      numeroDocumentoContacto:'',
      parentesco:'',
      provinciaContacto:'',
      cantonContacto:'',
      parroquiaContacto:'',
      //callePrincipalContacto:'',
      //calleSecundariaContacto:'',
      //numeroDomicilioContacto:'',
      //referenciaContacto:'',
      //telefonoDomicilioContacto:'',
      //telefonoCelularContacto:'',

      tipoinstitucionFinanciera:'',
      nombreinstitucionFinanciera:'',
      tipoCuenta:'',
      numeroCuenta:'',

      nivelInstruccion:'',
      institucion:'',
      tituloObtenido:'',
      // tiempoEstudio:'',
      // periodoEstudio:'',
      numeroRegistroSenescyt:'',
      pais:'',
      // fechaRegistroSenescyt:'',
      // fechaGraduacion:'',
    });
    this.formControl.valueChanges.subscribe((value) => {
      const filter = {
        ...value,
        // revisor: value.revisor.trim().toLowerCase(),
        // proyecto: value.proyecto.trim().toLowerCase(),
        // tarea: value.tarea.trim().toLowerCase(),
        // responsable: value.responsable.trim().toLowerCase(),
        tipoDocumento:value.tipoDocumento.trim().toLowerCase(),
        // numeroDocumento: value.numeroDocumento.trim().toLowerCase(),
        idEspe: value.idEspe.trim().toLowerCase(),
        nombreCompleto:value.nombreCompleto.trim().toLowerCase(),
        genero:value.genero.trim().toLowerCase(),
        estadoCivil:value.estadoCivil.trim().toLowerCase(),
        nacionalidad:value.nacionalidad?value.nacionalidad.trim().toLowerCase():'',
        tipoSangre:value.tipoSangre.trim().toLowerCase(),
        etnia:value.etnia.trim().toLowerCase(),
        grupoEtnico:value.grupoEtnico.trim().toLowerCase(),

        discapacidadEspecial:value.discapacidadEspecial.trim().toLowerCase(),
        tipoDiscapacidad:value.tipoDiscapacidad.trim().toLowerCase(),
        enfermedadCatastrofica:value.enfermedadCatastrofica.trim().toLowerCase(),
        tipoEnfermedadCatastrofica:value.tipoEnfermedadCatastrofica.trim().toLowerCase(),

        // provincia:value.numeroDocumento.trim().toLowerCase(),
        // canton:value.numeroDocumento.trim().toLowerCase(),
        // parroquia:value.numeroDocumento.trim().toLowerCase(),

        nombresCompletosContacto:value.nombresCompletosContacto.trim().toLowerCase(),
        tipoDocumentoContacto:value.tipoDocumentoContacto.trim().toLowerCase(),
        parentesco:value.parentesco.trim().toLowerCase(),
        // provinciaContacto:value.numeroDocumento.trim().toLowerCase(),
        // cantonContacto:value.numeroDocumento.trim().toLowerCase(),
        // parroquiaContacto:value.numeroDocumento.trim().toLowerCase(),

        tipoinstitucionFinanciera:value.tipoinstitucionFinanciera.trim().toLowerCase(),
        nombreinstitucionFinanciera:value.nombreinstitucionFinanciera.trim().toLowerCase(),
        tipoCuenta:value.tipoCuenta.trim().toLowerCase(),

        nivelInstruccion:value.nivelInstruccion.trim().toLowerCase(),
        institucion:value.institucion.trim().toLowerCase(),
        tituloObtenido:value.tituloObtenido.trim().toLowerCase(),
        pais:value.pais.trim().toLowerCase(),
      } as string;
      this.dataSource.filter = filter;
    });
  }

  ngOnInit(): void {}

  getInformacionDocentes() {
    this.blockedDocument = true;
    this.getInformacionDocentes$.subscribe({
      next: (data) => {
        //this.docentesInfromacion = data;
        this.dataTable = [];
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = ((data, filter) => {
          const isValid = (value, filterValue) => {
            if (typeof value === 'string') {
                return !filterValue || value.toLowerCase().includes(filterValue);
            } else if (typeof value === 'number') {
                const filterNumber = parseFloat(filterValue);
                return isNaN(filterNumber) || value === filterNumber;
            }
            return true; // Si el valor no es ni cadena ni número, considerarlo válido
        };
          return isValid(data.tipoDocumento, filter.tipoDocumento) &&
              isValid(data.numeroDocumento, filter.numeroDocumento) &&
              isValid(data.idEspe, filter.idEspe) &&
              isValid(data.nombreCompleto, filter.nombreCompleto) &&
              isValid(data.genero, filter.genero) &&
              isValid(data.estadoCivil, filter.estadoCivil) &&
              isValid(data.nacionalidad, filter.nacionalidad) &&
              isValid(data.tipoSangre, filter.tipoSangre) &&
              isValid(data.aniosResidencia, filter.aniosResidencia) &&
              isValid(data.etnia, filter.etnia) &&
              isValid(data.grupoEtnico, filter.grupoEtnico) &&
              isValid(data.discapacidad.discapacidadEspecial, filter.discapacidadEspecial) &&
              isValid(data.discapacidad.tipoDiscapacidad, filter.tipoDiscapacidad) &&
              isValid(data.discapacidad.numeroCarnet, filter.numeroCarnet) &&
              isValid(data.discapacidad.enfermedadCatastrofica, filter.enfermedadCatastrofica) &&
              isValid(data.discapacidad.tipoEnfermedadCatastrofica, filter.tipoEnfermedadCatastrofica) &&
              isValid(data.domicilio.provincia, filter.provincia) &&
              isValid(data.domicilio.canton, filter.canton) &&
              isValid(data.domicilio.parroquia, filter.parroquia) &&
              isValid(data.contactoEmergencia.nombresCompletos, filter.nombresCompletosContacto) &&
              isValid(data.contactoEmergencia.tipoDocumento, filter.tipoDocumentoContacto) &&
              isValid(data.contactoEmergencia.numeroDocumento, filter.numeroDocumentoContacto) &&
              isValid(data.contactoEmergencia.parentesco, filter.parentesco) &&
              isValid(data.contactoEmergencia.domicilio.provincia, filter.provinciaContacto) &&
              isValid(data.contactoEmergencia.domicilio.canton, filter.cantonContacto) &&
              isValid(data.contactoEmergencia.domicilio.parroquia, filter.parroquiaContacto) &&
              isValid(data.informacionBancaria.tipoinstitucionFinanciera, filter.tipoinstitucionFinanciera) &&
              isValid(data.informacionBancaria.nombreinstitucionFinanciera, filter.nombreinstitucionFinanciera) &&
              isValid(data.informacionBancaria.tipoCuenta, filter.tipoCuenta) &&
              isValid(data.formacionAcademica.nivelInstruccion, filter.nivelInstruccion) &&
              isValid(data.formacionAcademica.institucion, filter.institucion) &&
              isValid(data.formacionAcademica.tituloObtenido, filter.tituloObtenido) &&
              isValid(data.formacionAcademica.numeroRegistroSenescyt, filter.numeroRegistroSenescyt) &&
              isValid(data.formacionAcademica.pais, filter.pais);
      }) as (PeriodicElement: any, string: any) => boolean;


        this.dataSource.paginator = this.paginator;
        this.blockedDocument = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos Cargados con éxito',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al cargar la Tabla',
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    });
  }

  exportToExcel(): void {
    let element = document.getElementById('dataPdf');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'INFORMACIÓN_PERSONAL');
    XLSX.writeFile(book, this.name);
  }

  exportarDatosDocenteToExcel(docenteInformacion:DocenteInformacion): void {

    // for (const clave in docenteInformacion) {
    //   if (typeof docenteInformacion[clave] === 'object') {
    //     // El valor es un objeto JSON
    //     const subobjeto = docenteInformacion[clave];
    //     console.log('Clave:', clave);

    //     for (const subclave in subobjeto) {
    //       const valor = subobjeto[subclave];
    //       console.log(subclave + ': ' + valor);
    //     }

    //     console.log('--------');
    //   } else {
    //     const valor = docenteInformacion[clave];
    //     console.log(clave + ': ' + valor);
    //   }
    // }

    const informacionPersonalDocente = {
      "Tipo de Documento": docenteInformacion.tipoDocumento,
      "Número de Documento": docenteInformacion.numeroDocumento,
      "Id Espe":  docenteInformacion.idEspe,
      "Nombre Completo":docenteInformacion.nombreCompleto,
      "Fecha de Nacimiento":docenteInformacion.fechaNacimiento,
      "Edad":docenteInformacion.edad,
      "Género":docenteInformacion.genero,
      "Estado civil":docenteInformacion.estadoCivil,
      "Tipo de Sangre":docenteInformacion.tipoSangre,
      "Nacionalidad":docenteInformacion.nacionalidad,
      "Años de Residencia":docenteInformacion.aniosResidencia,
      "Etnia": docenteInformacion.etnia,
      "Grupo Étnico":docenteInformacion.grupoEtnico,
      "Correo Electrónico Personal":docenteInformacion.correoPrincipal,
      "Correo Electrónico Secundario": docenteInformacion.correoAlternativo,

      "Discapacidad Especial":docenteInformacion.discapacidad?.discapacidadEspecial,
      "Tipo de Discapacidad":  docenteInformacion.discapacidad?.tipoDiscapacidad,
      "Porcentaje de Discapacidad":  docenteInformacion.discapacidad?.porcentajeDiscapacidad,
      "N° Carnet M.S.P": docenteInformacion.discapacidad?.numeroCarnet,
      "Enfermedad Catastrófica": docenteInformacion.discapacidad?.enfermedadCatastrofica,
      "tipo Enfermedad Catastrófica": docenteInformacion.discapacidad?.tipoEnfermedadCatastrofica,

      "Provincia": docenteInformacion.domicilio?.provincia,
      "Cantón": docenteInformacion.domicilio?.canton,
      "Parroquia": docenteInformacion.domicilio?.parroquia,
      "Calle Principal": docenteInformacion.domicilio?.callePrincipal,
      "Calle Secundaria": docenteInformacion.domicilio?.calleSecundaria,
      "N° de Domicilio": docenteInformacion.domicilio?.numeroDomicilio,
      "Referencia": docenteInformacion.domicilio?.referencia,
      "Teléfono de Domicilio": docenteInformacion.domicilio?.telefonoDomicilio,
      "Teléfono Celular": docenteInformacion.domicilio?.telefonoCelular,
      "Teléfono del Trabajo":docenteInformacion.telefonoTrabajo+ "Extensión:"+docenteInformacion.extension,

      "Nombres Completos del Contacto": docenteInformacion.contactoEmergencia?.nombresCompletos,
      "Tipo de Documento del Contacto": docenteInformacion.contactoEmergencia?.tipoDocumento,
      "Número de Documento del Contacto": docenteInformacion.contactoEmergencia?.numeroDocumento,
      "Parentesco": docenteInformacion.contactoEmergencia?.parentesco,

      "Dirección de Provincia del Contacto": docenteInformacion.contactoEmergencia?.domicilio?.provincia,
      "Dirección de Cantón del Contacto": docenteInformacion.contactoEmergencia?.domicilio?.canton,
      "Dirección de Parroquia del Contacto": docenteInformacion.contactoEmergencia?.domicilio?.parroquia,
      "Dirección de Calle principal del Contacto": docenteInformacion.contactoEmergencia?.domicilio?.callePrincipal,
      "Dirección de Calle secundaria del Contacto": docenteInformacion.contactoEmergencia?.domicilio?.calleSecundaria,
      "N° de Domicilio del Contacto": docenteInformacion.contactoEmergencia?.domicilio?.numeroDomicilio,
      "Referencia de Domicilio": docenteInformacion.contactoEmergencia?.domicilio?.referencia,
      "teléfono de Domicilio": docenteInformacion.contactoEmergencia?.domicilio?.telefonoDomicilio,
      "telefonoCelular": docenteInformacion.contactoEmergencia?.domicilio?.telefonoCelular,

      "Tipo Institución financiera": docenteInformacion.informacionBancaria?.tipoinstitucionFinanciera,
      "Nombre Institución Financiera": docenteInformacion.informacionBancaria?.nombreinstitucionFinanciera,
      "Tipo de Cuenta": docenteInformacion.informacionBancaria?.tipoCuenta,
      "N° de Cuenta": docenteInformacion.informacionBancaria?.numeroCuenta,

      "Nivel de Instrucción (máximo nivel alcanzado)": docenteInformacion.formacionAcademica?.nivelInstruccion,
      "Institución": docenteInformacion.formacionAcademica?.institucion,
      "Título Obtenido": docenteInformacion.formacionAcademica?.tituloObtenido,
      "Tiempo de Estudio": docenteInformacion.formacionAcademica?.tiempoEstudio + " "+ docenteInformacion.formacionAcademica?.periodoEstudio,
      "Número de Registro del Senescyt": docenteInformacion.formacionAcademica?.numeroRegistroSenescyt,
      "Fecha de Registro del Senescyt": docenteInformacion.formacionAcademica?.fechaRegistroSenescyt,
      "País": docenteInformacion.formacionAcademica?.pais,
      "Fecha de Graduación": docenteInformacion.formacionAcademica?.fechaGraduacion
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([informacionPersonalDocente]);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'INFORMACIÓN_PERSONAL');


    let formacionAcademicaAdicionalesCopy =docenteInformacion.formacionAcademica?.formacionAcademicaAdicionales;
    if(formacionAcademicaAdicionalesCopy){
      const formacionAcademicaAdicionales = formacionAcademicaAdicionalesCopy.map((items:FormacionAcademicaAdicional) => {
        return {
         "Nivel de Instrucción": items?.nivelInstruccion,
         "Institución": items?.institucion,
         "Título Obtenido": items?.tituloObtenido,
         "NúmeroSenescyt": items?.numeroSenescyt,
         "Fecha de Registro Senescyt": items?.fechaRegistroSenescyt,
         "Fecha de Graduación": items?.fechaGraduacion,
         "País": items?.pais,
         "Tiempo de Estudio en Años": items?.tiempoEstudio
       }
      });

      const worksheetFormacionAcademicaAdicionales: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formacionAcademicaAdicionales);
      XLSX.utils.book_append_sheet(book, worksheetFormacionAcademicaAdicionales, 'FORMACIÓN_ACADÉMICA');
    }

    let idiomasCopy = docenteInformacion.formacionAcademica?.idiomas;
    if(idiomasCopy){
      const idiomas = idiomasCopy.map((items:Idioma) => {
        return {
         "Idioma": items?.idioma,
         "% Hablado": items?.porcentajeHablado,
         "% Escrito": items?.porcentajeEscrito,
         "% Comprension": items?.porcentajeComprension
       }
      });
      const worksheetIdiomas: XLSX.WorkSheet = XLSX.utils.json_to_sheet(idiomas);
      XLSX.utils.book_append_sheet(book, worksheetIdiomas, 'IDIOMAS');
    }

    let publicacionesCopy =  docenteInformacion.formacionAcademica?.publicaciones;
    if(publicacionesCopy){
      const publicaciones = publicacionesCopy.map((items:Publicacion) => {
        return {
         "Tipo de Investigación": items?.tipoInvestigacion,
         "Título Completo": items?.tituloCompleto,
         "Publicador": items?.publicador,
         "ISSN/ISBN/DOI": items?.codigoPublicacion,
         "Participación": items?.participacion,
         "Idioma": items?.idioma,
         "Estado de Publicación": items?.estadoPublicacion,
         "fecha de Publicación": items?.fechaPublicacion,
         "Volumen de Publicación": items?.volumenPublicacion,
         "Revisión de Pares": items?.revisionPares,
         "DOI": items?.doi
       }
      });
      const worksheetpublicaciones: XLSX.WorkSheet = XLSX.utils.json_to_sheet(publicaciones);
      XLSX.utils.book_append_sheet(book, worksheetpublicaciones, 'PUBLICACIONES');
    }

    const experienciaProfesionalesCopy =  docenteInformacion.experienciaProfesionales;

    if(experienciaProfesionalesCopy){
      const experienciaProfesionales = experienciaProfesionalesCopy.map((items:ExperienciaProfesional) => {
        return {
          "Nombre de la Institucion": items.nombreInstitucion,
          "Puesto": items.puesto,
          "UnidadAdministrativa": items.unidadAdministrativa,
          "tipoInstitucion": items.tipoInstitucion,
          "Modalidad de Contratación": items.modalidadContratacion,
          "Fecha de Ingreso": items.fechaIngreso,
          "Motivo de Salida Laboral": items.motivoSalidaLaboral,
          "Fecha de Salida": items.fechaSalida,
          "Pais": items.pais,
          "Provincia": items.provincia
       }
      });
      const worksheetExperienciaProfesional: XLSX.WorkSheet = XLSX.utils.json_to_sheet(experienciaProfesionales);
      XLSX.utils.book_append_sheet(book, worksheetExperienciaProfesional, 'EXPERIENCIA_PROFESIONAL');
    }
    XLSX.writeFile(book, this.name);
  }

  verInformacionDocente(docenteInformacion:DocenteInformacion){
    this.docenteInformacionService.setDocente(docenteInformacion);
    this.router.navigate(['ver-docente-informacion']);
  }

}
