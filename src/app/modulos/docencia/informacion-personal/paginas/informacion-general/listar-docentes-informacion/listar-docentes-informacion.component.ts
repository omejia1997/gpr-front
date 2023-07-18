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
    private messageService: MessageService
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
          const a = !filter.tipoDocumento || data.tipoDocumento.includes(filter.tipoDocumento);
          const b = !filter.numeroDocumento || data.numeroDocumento.includes(filter.numeroDocumento);
          const c = !filter.idEspe || data.idEspe.includes(filter.idEspe);
          const d = !filter.nombreCompleto || data.nombreCompleto.toLowerCase().includes(filter.nombreCompleto);

          const e = !filter.genero || data.genero.toLowerCase().includes(filter.genero);
          const f = !filter.estadoCivil || data.estadoCivil.includes(filter.estadoCivil);
          const g = !filter.nacionalidad || data.nacionalidad.toLowerCase().includes(filter.nacionalidad);
          const h = !filter.tipoSangre || data.tipoSangre.includes(filter.tipoSangre);
          const i = !filter.aniosResidencia || data.aniosResidencia.includes(filter.aniosResidencia);
          const j = !filter.etnia || data.etnia.includes(filter.etnia);
          const k = !filter.grupoEtnico || data.numeroDocumento.includes(filter.grupoEtnico);

          const l = !filter.discapacidadEspecial || data.discapacidadEspecial.includes(filter.discapacidadEspecial);
          const m = !filter.tipoDiscapacidad || data.tipoDiscapacidad.includes(filter.tipoDiscapacidad);
          const n = !filter.numeroCarnet || data.numeroDocumento.includes(filter.numeroCarnet);
          const o = !filter.enfermedadCatastrofica || data.tipoEnfermedadCatastrofica.toLowerCase().includes(filter.tipoEnfermedadCatastrofica);
          const p = !filter.tipoEnfermedadCatastrofica || data.tipoEnfermedadCatastrofica.toLowerCase().includes(filter.tipoEnfermedadCatastrofica);

          const q = !filter.provincia || data.provincia.toLowerCase().includes(filter.provincia);
          const r = !filter.canton || data.canton.toLowerCase().includes(filter.canton);
          const s = !filter.parroquia || data.parroquia.toLowerCase().includes(filter.parroquia);

          const t = !filter.nombresCompletosContacto || data.nombresCompletosContacto.toLowerCase().includes(filter.nombresCompletosContacto);
          const u = !filter.tipoDocumentoContacto || data.tipoDocumentoContacto.toLowerCase().includes(filter.tipoDocumentoContacto);
          const v = !filter.numeroDocumentoContacto || data.numeroDocumentoContacto.includes(filter.numeroDocumentoContacto);
          const w = !filter.parentesco || data.parentesco.toLowerCase().includes(filter.parentesco);
          const x = !filter.provinciaContacto || data.provinciaContacto.toLowerCase().includes(filter.provinciaContacto);
          const y = !filter.cantonContacto || data.cantonContacto.toLowerCase().includes(filter.cantonContacto);
          const z = !filter.parroquiaContacto || data.parroquiaContacto.toLowerCase().includes(filter.parroquiaContacto);

          const aa = !filter.tipoinstitucionFinanciera || data.tipoinstitucionFinanciera.toLowerCase().includes(filter.tipoinstitucionFinanciera);
          const bb = !filter.nombreinstitucionFinanciera || data.nombreinstitucionFinanciera.toLowerCase().includes(filter.nombreinstitucionFinanciera);
          const cc = !filter.tipoCuenta || data.tipoCuenta.includes(filter.tipoCuenta);

          const dd = !filter.nivelInstruccion || data.nivelInstruccion.toLowerCase().includes(filter.nivelInstruccion);
          const ee = !filter.institucion || data.institucion.toLowerCase().includes(filter.institucion);
          const ff = !filter.tituloObtenido || data.tituloObtenido.toLowerCase().includes(filter.tituloObtenido);
          const gg = !filter.tiempoEstudio || data.tiempoEstudio.includes(filter.tiempoEstudio);
          const hh = !filter.numeroRegistroSenescyt || data.numeroRegistroSenescyt.includes(filter.numeroRegistroSenescyt);
          const ii = !filter.pais || data.pais.toLowerCase().includes(filter.pais);
          const jj = !filter.institucion || data.institucion.toLowerCase().includes(filter.institucion);

            return a && b && c &&d && e && f && g && h && i && j && k && l && m && n && o && p && q && r && s && t && u && v && w && x && y && z &&
              aa && bb && cc && dd && ee && ff && gg && hh && ii && jj;
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
    console.log(docenteInformacion)

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


    let formacionAcademicaAdicionalesCopy =docenteInformacion.formacionAcademica?.formacionAcademicaAdicionales
    console.log(formacionAcademicaAdicionalesCopy)
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
      console.log("append")
      XLSX.utils.book_append_sheet(book, worksheetFormacionAcademicaAdicionales, 'FORMACIÓN_ACADÉMICA');
    }

    let idiomasCopy = docenteInformacion.formacionAcademica?.idiomas;
    console.log(idiomasCopy)

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
    console.log(publicacionesCopy)
    if(publicacionesCopy){
      console.log("entro")
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
         "Revisión de Pares": items?.revisionPares
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

}
