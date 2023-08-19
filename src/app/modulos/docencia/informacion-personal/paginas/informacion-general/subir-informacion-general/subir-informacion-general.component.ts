import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/Docente';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { v4 as uuidv4 } from 'uuid';
import { ModalExperienciaProfesionalComponent } from '../../../components/modal-experiencia-profesional/modal-experiencia-profesional.component';
import { ModalFormacionAcademicaComponent } from '../../../components/modal-formacion-academica/modal-formacion-academica.component';
import { ModalIdiomaHabladoComponent } from '../../../components/modal-idioma-hablado/modal-idioma-hablado.component';
import { ModalPublicacionRealizadaComponent } from '../../../components/modal-publicacion-realizada/modal-publicacion-realizada.component';
import { ContactoEmergencia } from '../../../modelos/ContactoEmergencia';
import { Discapacidad } from '../../../modelos/Discapacidad';
import { DocenteInformacion } from '../../../modelos/DocenteInformacion';
import { Domicilio } from '../../../modelos/Domicilio';
import { ExperienciaProfesional } from '../../../modelos/ExperienciaProfesional';
import { FormacionAcademica } from '../../../modelos/FormacionAcademica';
import { FormacionAcademicaAdicional } from '../../../modelos/FormacionAcademicaAdicional';
import { Idioma } from '../../../modelos/Idioma';
import { InformacionBancaria } from '../../../modelos/InformacionBancaria';
import { Publicacion } from '../../../modelos/Publicacion';
import { DocenteInformacionService } from '../../../servicios/DocenteInformacion.service';
import jspdf from 'jspdf';
import { ImagenUser } from '../../../modelos/ImagenUser';

@Component({
  selector: 'app-subir-informacion-general',
  templateUrl: './subir-informacion-general.component.html',
  styleUrls: ['./subir-informacion-general.component.css'],
})
export class SubirInformacionGeneralComponent implements OnInit {
  blockedDocument: boolean = false;
  docente: DocenteInformacion = {};
  discapacidad: Discapacidad = {};
  domicilio: Domicilio = {};
  domicilioContacto: Domicilio = {};
  contactoEmergencia: ContactoEmergencia = {};
  informacionBancaria: InformacionBancaria = {};
  formacionAcademica: FormacionAcademica = {};
  nombreUsuario: any = localStorage.getItem('usuario');
  datosDocente: Docente = {};
  comboTipoDocumento: string[] = ['CÉDULA', 'PASAPORTE'];
  checkInformacionDocente: boolean = true;
  checkNumeroDocumento: boolean = true;
  checkDiscapacidadEspecial: boolean = true;
  checkEnfermedadCatastrofica: boolean = true;
  numeroDocumento: string = '';
  getNacionalidades$: Observable<any>;
  nacionalidades: string[] = [];
  geTerritorioEcuatoriano$: Observable<any>;
  gruposEtnicos$: Observable<any>;
  gruposEtnicos: string[] = [];
  provincias: any;
  cantones: any;
  parroquias!: any[];
  cantonesContacto: any;
  parroquiasContacto!: any[];
  paises$: Observable<any>;
  paises: string[] = [];
  imagenSeleccionada: any;
  imagenURL: any;
  imagenUser!:ImagenUser;
  widthImagenUser!:number;
  heigthImagenUser!: number;

  provinciaIds!: string[];
  cantonIds!: string[];
  cantonIdsContacto!: string[];

  comboEstadoCivil: string[] = [
    'CASADO (A)',
    'DIVORCIADO (A)',
    'SOLTERO (A)',
    'UNIÓN LIBRE',
    'VIUDO (A)',
  ];
  comboEtnia: string[] = [
    'AFROECUATORIANO/AFRODESCENDIENTE',
    'BLANCO/A',
    'INDÍGENA',
    'MESTIZO/A',
    'MONTUBIO/A',
    'MULATO/A',
    'NEGRO/A',
    'OTRO/A',
  ];

  comboTiposSangre: string[] = ["A-", "A+", "AB-", "AB+", "B-", "B+", "O-", "O+"];
  comboOpcionesCerradas: string[] = ['NO', 'SI'];
  comboTipoDiscapacidad: string[] = [
    'AUDITIVA',
    'FÍSICA',
    'INTELECTUAL',
    'VISUAL',
  ];
  comboTipoEnfermedadCatastrofica: string[] = [
    'Aneurisma tóraco-abdominal',
    'Insuficiencia renal crónica',
    'Malformaciones arterio venosas cerebrales',
    'Secuelas e quemaduras graves',
    'Síndrome de klippel trenaunay',
    'Todo tipo de cáncer',
    'Todo tipo de malformaciones congénitas de corazón',
    'Trasplante de órganos: riñón, hígado, medula ósea',
  ];
  comboParentesco: string[] = [
    'ABUELO (A)',
    'AMIGO (A)',
    'CONVIVIENTE',
    'CÓNYUGE',
    'CUÑADO (A)',
    'HIJO (A)',
    'HERMANO (A)',
    'MADRE',
    'NIETO (A)',
    'PADRE',
    'SUEGRO (A)',
  ];
  comboTipoInstitucionFinanciera: string[] = [
    'BANCO',
    'COOPERATIVA',
    'COOPERATIVA DE AHORRO Y CRÉDITO',
    'MUTUALISTA',
  ];
  comboTipoCuenta: string[] = ['AHORROS', 'CORRIENTE'];
  comboNivelInstruccion: string[] = [
    'BACHILLERATO',
    'CUARTO NIVEL - DIPLOMADO',
    'CUARTO NIVEL - ESPECIALIDAD',
    'CUARTO NIVEL - MAESTRIA',
    'CUARTO NIVEL-DOCTORADO',
    'EDUCACIÓN BÁSICA',
    'ESTUDIANTE UNIVERSITARIO',
    'PRIMARIA',
    'SECUNDARIA',
    'SIN INSTRUCCIÓN',
    'TÉCNICO SUPERIOR',
    'TECNOLOGÍA',
    'TERCER NIVEL',
  ];
  comboPeriodoInstruccion: string[] = ['AÑOS', 'SEMESTRES'];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private docenteInformacionService: DocenteInformacionService,
    private dialog: MatDialog
  ) {
    this.getNacionalidades$ =
      this.docenteInformacionService.loadNacionalidades();
    this.geTerritorioEcuatoriano$ =
      this.docenteInformacionService.getTerritorioEcuatoriano();
    this.gruposEtnicos$ = this.docenteInformacionService.loadGruposEtnicos();
    this.paises$ = this.docenteInformacionService.loadPaises();
    this.formacionAcademica.formacionAcademicaAdicionales = [];
    this.formacionAcademica.idiomas = [];
    this.formacionAcademica.publicaciones = [];
    this.docente.experienciaProfesionales = [];
  }

  ngOnInit() {
    this.cargarDatosDocente();
    this.cargarNacionalidades();
    this.cargarTerritorioEcuatoriano();
    this.cargarGruposEtnicos();
    this.cargarPaises();
  }

  cargarNacionalidades() {
    this.getNacionalidades$.subscribe((data) => {
      this.nacionalidades = data.nacionalidades;
    });
  }

  cargarTerritorioEcuatoriano() {
    this.geTerritorioEcuatoriano$.subscribe((data) => {
      this.provincias = Object.values(data);
      this.provinciaIds = Object.keys(this.provincias);
    });
  }

  cargarGruposEtnicos() {
    this.gruposEtnicos$.subscribe((data) => {
      this.gruposEtnicos = data.gruposEtnicos;
    });
  }

  cargarPaises() {
    this.paises$.subscribe((data) => {
      this.paises = data.paises;
    });
  }

  cargarDatosDocente() {
    this.usuarioService
      .obtenerUsuarioPorNombre(this.nombreUsuario)
      .subscribe((respuesta) => {
        this.procesarDocente(respuesta);
      });
  }

  procesarDocente(resp: any) {
    this.datosDocente = resp.docenteResponse.docente[0];
    this.docente.nombreCompleto =
      this.datosDocente.apellidoDocente + ' ' + this.datosDocente.nombreDocente;
    this.docente.genero = this.datosDocente.sexo;
    this.docente.correoPrincipal = this.datosDocente.correoDocente;
    this.docente.idEspe = this.datosDocente.idDocente;
    this.docenteInformacionService.obtenerDocentePorIdEspe(this.docente.idEspe).subscribe((data) => {
      if(data){
        this.docente = data;
        if(this.docente.imagenUser?.urlImagen){
          this.docenteInformacionService.obtenerImagenUser(this.docente.imagenUser?.nombreImagen)
            .subscribe((data)=>{
              this.imagenURL = this.docente.imagenUser?.urlImagen;
              this.docente.imagenUser=data;
              this.imagenUser= data;
              this.docente.imagenUser.urlImagen=this.imagenURL;
              this.imagenURL= "data:image/jpeg;base64,"+this.docente.imagenUser.fileBase64;
              if(this.imagenUser.fileBase64){
                this.calcularDimensionesImagen(this.imagenUser.fileBase64);
              }
            });
        }else{
          this.imagenURL =
          'https://icon-library.com/images/user-image-icon/user-image-icon-19.jpg'; //foto por defualt
        }
        if(this.docente.discapacidad)
          this.discapacidad = this.docente.discapacidad;
        if(this.docente.domicilio){
          this.domicilio = this.docente.domicilio;
          this.cargarDomicilioCantones();
          this.cargarDomicilioParroquia();
        }
        if(this.docente.contactoEmergencia)
          this.contactoEmergencia = this.docente.contactoEmergencia;
        if(this.docente.contactoEmergencia && this.docente.contactoEmergencia.domicilio){
          this.domicilioContacto = this.docente.contactoEmergencia.domicilio;
          this.cargarCantonContacto();
          this.cargarParroquiaContacto();
        }
        if(this.docente.informacionBancaria)
          this.informacionBancaria = this.docente.informacionBancaria;
        if(this.docente.formacionAcademica){
          this.formacionAcademica = this.docente.formacionAcademica;
        }
      }
    });
  }

  cargarDomicilioCantones() {
    if (this.domicilio.provincia) {
      this.cantones = Object.values(
        this.provincias[this.domicilio.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));
      this.cantonIds = Object.keys(this.cantones);
    }
  }

  cargarDomicilioParroquia() {
    if (this.domicilio.canton) {
      this.parroquias = Object.entries(
        this.cantones[this.domicilio.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
    }
  }

  onProvinciaChange() {
    if (this.domicilio.provincia) {
      this.cantones = Object.values(
        this.provincias[this.domicilio.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIds = Object.keys(this.cantones);
      this.domicilio.canton = '';
      this.parroquias = [];
      this.domicilio.parroquia = '';
    }
  }

  onCantonChange() {
    if (this.domicilio.canton) {
      this.parroquias = Object.entries(
        this.cantones[this.domicilio.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      this.domicilio.parroquia = '';
    }
  }

  cargarCantonContacto() {
    if (this.domicilioContacto.provincia) {
      this.cantonesContacto = Object.values(
        this.provincias[this.domicilioContacto.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIdsContacto = Object.keys(this.cantonesContacto);
    }
  }

  cargarParroquiaContacto() {
    if (this.domicilioContacto.canton) {
      this.parroquiasContacto = Object.entries(
        this.cantonesContacto[this.domicilioContacto.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
    }
  }

  onProvinciaContactoChange() {
    if (this.domicilioContacto.provincia) {
      this.cantonesContacto = Object.values(
        this.provincias[this.domicilioContacto.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIdsContacto = Object.keys(this.cantonesContacto);
      this.domicilioContacto.canton = '';
      this.parroquiasContacto = [];
      this.domicilioContacto.parroquia = '';
    }
  }

  onCantonContactoChange() {
    if (this.domicilioContacto.canton) {
      this.parroquiasContacto = Object.entries(
        this.cantonesContacto[this.domicilioContacto.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      this.domicilioContacto.parroquia = '';
    }
  }

  detectarCambioTipoDocumento() {
    if (this.docente.tipoDocumento == 'PASAPORTE') {
      this.checkNumeroDocumento = false;
      this.docente.numeroDocumento = this.numeroDocumento;
    } else {
      this.checkNumeroDocumento = true;
      this.docente.numeroDocumento = this.datosDocente.cedulaDocente;
    }
  }

  detectarCambioInputDiscapacidad() {
    if (this.discapacidad.discapacidadEspecial == 'SI') {
      this.checkDiscapacidadEspecial = false;
    } else {
      this.checkDiscapacidadEspecial = true;
      this.discapacidad.tipoDiscapacidad = '';
      this.discapacidad.porcentajeDiscapacidad = undefined;
      this.discapacidad.numeroCarnet = '';
    }
  }

  detectarCambioInputEnfermedadCatastrofica() {
    if (this.discapacidad.enfermedadCatastrofica == 'SI') {
      this.checkEnfermedadCatastrofica = false;
    } else {
      this.checkEnfermedadCatastrofica = true;
      this.discapacidad.tipoEnfermedadCatastrofica = '';
    }
  }

  onFileImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.imagenSeleccionada = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenURL = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenSeleccionada = null;
      if(this.docente.imagenUser?.urlImagen)
        this.imagenURL = this.docente.imagenUser?.urlImagen;
      else
        this.imagenURL = "https://icon-library.com/images/user-image-icon/user-image-icon-19.jpg";
    }
  }


  save() {
    this.docente.discapacidad = this.discapacidad;
    this.docente.domicilio = this.domicilio;
    this.docente.contactoEmergencia = this.contactoEmergencia;
    this.docente.contactoEmergencia.domicilio = this.domicilioContacto;
    this.docente.informacionBancaria = this.informacionBancaria;
    this.docente.formacionAcademica = this.formacionAcademica;
    this.blockedDocument = true;
    this.docenteInformacionService.guardarInformacion(this.docente,this.imagenSeleccionada)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos Actualizados con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.router.navigate(["/subir-informacion-general"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al actualizar la información'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    })
  }

  openModalFormacionAcademicaAdicional() {
    const dialogRef = this.dialog.open(ModalFormacionAcademicaComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.codigoFormacionAdicional = uuidv4();
        this.formacionAcademica.formacionAcademicaAdicionales?.push(formValue);
      }
    });
  }

  editarFormacionAdicional(formacionAcademica: FormacionAcademicaAdicional) {
    const dialogRef = this.dialog.open(ModalFormacionAcademicaComponent, {
      width: '450px',
      data: formacionAcademica,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.formacionAcademica.formacionAcademicaAdicionales =
          this.formacionAcademica.formacionAcademicaAdicionales?.filter(
            (item) =>
              item.codigoFormacionAdicional !==
              formacionAcademica.codigoFormacionAdicional
          );
        formValue.codigoFormacionAdicional = formacionAcademica.codigoFormacionAdicional;
        this.formacionAcademica.formacionAcademicaAdicionales?.push(formValue);
      }
    });
  }

  eliminarFormacionAdicional(formacionAcademica: FormacionAcademicaAdicional) {
    this.formacionAcademica.formacionAcademicaAdicionales =
      this.formacionAcademica.formacionAcademicaAdicionales?.filter(
        (item) =>
          item.codigoFormacionAdicional !==
          formacionAcademica.codigoFormacionAdicional
      );
  }

  openModalIdiomas() {
    const dialogRef = this.dialog.open(ModalIdiomaHabladoComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.codigoIdioma = uuidv4();
        this.formacionAcademica.idiomas?.push(formValue);
      }
    });
  }

  editarIdiomaIngresado(idioma: Idioma) {
    const dialogRef = this.dialog.open(ModalIdiomaHabladoComponent, {
      width: '450px',
      data: idioma,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.formacionAcademica.idiomas =
          this.formacionAcademica.idiomas?.filter(
            (item) => item.codigoIdioma !== idioma.codigoIdioma
          );
        formValue.codigoIdioma = idioma.codigoIdioma;
        this.formacionAcademica.idiomas?.push(formValue);
      }
    });
  }

  eliminarIdiomaIngresado(idioma: Idioma) {
    this.formacionAcademica.idiomas = this.formacionAcademica.idiomas?.filter(
      (item) => item.codigoIdioma !== idioma.codigoIdioma
    );
  }

  openModalPublicaciones() {
    const dialogRef = this.dialog.open(ModalPublicacionRealizadaComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.idPublicacion = uuidv4();
        this.formacionAcademica.publicaciones?.push(formValue);
      }
    });
  }

  editarPublicacionIngresada(publicacion: Publicacion) {
    const dialogRef = this.dialog.open(ModalPublicacionRealizadaComponent, {
      width: '450px',
      data: publicacion,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.formacionAcademica.publicaciones =
          this.formacionAcademica.publicaciones?.filter(
            (item) => item.idPublicacion !== publicacion.idPublicacion
          );
        formValue.idPublicacion = publicacion.idPublicacion;
        this.formacionAcademica.publicaciones?.push(formValue);
      }
    });
  }

  eliminarPublicacionIngresada(publicacion: Publicacion) {
    this.formacionAcademica.publicaciones =
      this.formacionAcademica.publicaciones?.filter(
        (item) => item.idPublicacion !== publicacion.idPublicacion
      );
  }

  openModalExperienciaProfesional() {
    const dialogRef = this.dialog.open(ModalExperienciaProfesionalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.codigoExperiencia = uuidv4();
        this.docente.experienciaProfesionales?.push(formValue);
      }
    });
  }

  editarExperienciaIngresada(experiencia: ExperienciaProfesional) {
    const dialogRef = this.dialog.open(ModalExperienciaProfesionalComponent, {
      width: '450px',
      data: experiencia,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.docente.experienciaProfesionales =
          this.docente.experienciaProfesionales?.filter(
            (item) => item.codigoExperiencia !== experiencia.codigoExperiencia
          );
          formValue.codigoExperiencia = experiencia.codigoExperiencia;
        this.docente.experienciaProfesionales?.push(formValue);
      }
    });
  }

  eliminarExperienciaIngresada(experiencia: ExperienciaProfesional) {
    this.docente.experienciaProfesionales =
      this.docente.experienciaProfesionales?.filter(
        (item) => item.codigoExperiencia !== experiencia.codigoExperiencia
      );
  }


  async generarPDF() {
    const doc = new jspdf();
    //Configuraciones
    let inicioEjeY = 10;
    let inicioEjeY2;
    const numColumns = 4;
    const paginaWidth = doc.internal.pageSize.getWidth();
    const columnWidth = paginaWidth / numColumns;
    let columnX1 = 0;
    let columnX2 = columnWidth;
    let columnX3 = 2 * columnWidth;
    let columnX4 = 3 * columnWidth;
    doc.addFont(
      '/assets/fonts/roboto/Roboto-Regular.ttf',
      'Roboto-Regular',
      'normal'
    );
    doc.addFont(
      '/assets/fonts/roboto/Roboto-Medium.ttf',
      'Roboto-Medium',
      'normal'
    );
    //Separador
    doc.setLineWidth(0.3); // Ancho de la línea del separador
    doc.setDrawColor(0, 0, 0); // Color de la línea del separador (negro en este caso)

    const imageUrl = 'https://www.espe.edu.ec/wp-content/uploads/2018/11/espe.png';
    const widthImage = 30;
    const heightImage = 8;
    doc.addImage(imageUrl, 'JPEG', 10, inicioEjeY+2 , widthImage, heightImage);

    doc.line(10, inicioEjeY, 200, inicioEjeY);

    doc.setFont('Roboto-Regular');
    doc.setFontSize(14);

    let titulo = 'HOJA DE VIDA ESPE';
    let tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    let x = ((paginaWidth-30) - tituloWidth) / 2;
    inicioEjeY+=5;
    doc.text(titulo, x+30, inicioEjeY);

    titulo = 'DEPARTAMENTO DE CIENCIAS DE ENERGÍA Y MECÁNICA';
    tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    x = ((paginaWidth-30) - tituloWidth) / 2;
    inicioEjeY+=5;
    doc.text(titulo, x+30, inicioEjeY);

    doc.line(10, inicioEjeY+2, 200, inicioEjeY+2);

    titulo = 'INFORMACIÓN PERSONAL';
    tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    x = (paginaWidth - tituloWidth) / 2;
    inicioEjeY+=10;
    doc.text(titulo, x, inicioEjeY);

    doc.setFontSize(8);
    inicioEjeY+=5;

    //ImagenUser
    if(this.imagenUser?.fileBase64){
      let anchoDisponible = (200-(columnX3+10));
      let coordenadaX = (anchoDisponible-this.widthImagenUser)/2;
      coordenadaX = columnX3+10+coordenadaX;
      doc.addImage(this.imagenUser.fileBase64, 'JPEG',  coordenadaX , inicioEjeY,this.widthImagenUser , this.heigthImagenUser);
    }
    doc.setFont('Roboto-Medium');
    doc.text('Tipo de Documento:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.tipoDocumento?this.docente.tipoDocumento:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Nº de Documento:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.numeroDocumento?this.docente.numeroDocumento:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Apellidos y Nombres:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.nombreCompleto?this.docente.nombreCompleto:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Fecha de Nacimiento:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(
      this.docente.fechaNacimiento?this.docente.fechaNacimiento.toString()! +
        '        ' +
        this.docente.edad +
        ' AÑOS':'',
      columnX2 + 10,
      inicioEjeY
    );
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Género:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.genero?this.docente.genero:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Estado Civil:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.estadoCivil?this.docente.estadoCivil:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Nacionalidad:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.nacionalidad?this.docente.nacionalidad:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('En caso de extranjero,', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.aniosResidencia?this.docente.aniosResidencia.toString():'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('indicar años de residencia:', columnX1 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Auto identificación étnica:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.etnia?this.docente.etnia:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('En caso de ser indígena,', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.grupoEtnico?this.docente.grupoEtnico:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    inicioEjeY2=inicioEjeY;
    doc.setFont('Roboto-Medium');
    doc.text('indique el grupo étnico:', columnX1 + 10, inicioEjeY);

    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Correo electrónico principal:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.correoPrincipal?this.docente.correoPrincipal:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Correo electrónico alternativo:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.correoAlternativo?this.docente.correoAlternativo:'', columnX2 + 10, inicioEjeY);

    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Tipo de Sangre:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.tipoSangre?this.docente.tipoSangre:'', columnX4 + 10, inicioEjeY2);
    inicioEjeY+=5;
    doc.line(10, inicioEjeY, 200, inicioEjeY); // Coordenadas del separador (x1, y1, x2, y2)
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text(
      'Información adicional de discapacidad y/o enfermedad catastrófica',
      columnX1 + 10,
      inicioEjeY
    );

    inicioEjeY+=5;
    inicioEjeY2 = inicioEjeY;
    doc.setFont('Roboto-Medium');
    doc.text('Discapacidad Especial:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.discapacidad.discapacidadEspecial?this.discapacidad.discapacidadEspecial:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Tipo de Discapacidad Especial:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.discapacidad.tipoDiscapacidad?this.discapacidad.tipoDiscapacidad:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('% de discapacidad:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(
      this.discapacidad.porcentajeDiscapacidad?this.discapacidad.porcentajeDiscapacidad.toString():'',
      columnX2 + 10,
      inicioEjeY
    );
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('No. Carnet M.S.P.:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.discapacidad.numeroCarnet?this.discapacidad.numeroCarnet:'', columnX2 + 10, inicioEjeY);

    doc.setFont('Roboto-Medium');
    doc.text('Enfermedad Catastrófica:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.discapacidad.enfermedadCatastrofica?this.discapacidad.enfermedadCatastrofica:'', columnX4 + 10, inicioEjeY2);
    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Tipo de Enfermedad Catastrófica:', columnX3 + 10, inicioEjeY2);
    inicioEjeY2+=5;
    doc.setFont('Roboto-Regular');
    doc.text(this.discapacidad.tipoEnfermedadCatastrofica?this.discapacidad.tipoEnfermedadCatastrofica:'', columnX3 + 20, inicioEjeY2);
    inicioEjeY+=5;
    doc.line(10, inicioEjeY, 200, inicioEjeY); // Coordenadas del separador (x1, y1, x2, y2)
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Dirección domiciliaria permanente', columnX1 + 10, inicioEjeY);
    inicioEjeY+=5;
    inicioEjeY2 = inicioEjeY;
    doc.setFont('Roboto-Medium');
    doc.text('Provincia:', columnX1 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.provincia?
      this.provincias[this.domicilio.provincia].provincia:'',
      columnX2 + 10,
      inicioEjeY2
    );
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Parroquia:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.parroquia?this.domicilio.parroquia:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Calle Principal:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.callePrincipal?this.domicilio.callePrincipal:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Calle Secundaria:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.calleSecundaria?this.domicilio.calleSecundaria:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Referencia:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.referencia?this.domicilio.referencia:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Teléfono domicilio:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.telefonoDomicilio?this.domicilio.telefonoDomicilio:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Teléfono trabajo:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.telefonoTrabajo?this.docente.telefonoTrabajo:'', columnX2 + 10, inicioEjeY);

    doc.setFont('Roboto-Medium');
    doc.text('Cantón:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.canton?this.cantones[this.domicilio.canton!].canton:'', columnX4 + 10, inicioEjeY2);
    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Número de Domicilio:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.numeroDomicilio?this.domicilio.numeroDomicilio:'', columnX4 + 10, inicioEjeY2);
    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Teléfono celular:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilio.telefonoCelular?this.domicilio.telefonoCelular:'', columnX4 + 10, inicioEjeY2);
    inicioEjeY2+=20;
    doc.setFont('Roboto-Medium');
    doc.text('Extensión:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.docente.extension?this.docente.extension:'', columnX4 + 10, inicioEjeY2);

    inicioEjeY+=5;
    doc.line(10, inicioEjeY, 200, inicioEjeY); // Coordenadas del separador (x1, y1, x2, y2)
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Contacto de emergencia', columnX1 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.text('Apellidos y Nombres:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.contactoEmergencia.nombresCompletos?this.contactoEmergencia.nombresCompletos:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    inicioEjeY2 = inicioEjeY;
    doc.setFont('Roboto-Medium');
    doc.text('Tipo de Documento:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.contactoEmergencia.tipoDocumento?this.contactoEmergencia.tipoDocumento:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Parentesco:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.contactoEmergencia.parentesco?this.contactoEmergencia.parentesco:'', columnX2 + 10, inicioEjeY);

    doc.setFont('Roboto-Medium');
    doc.text('Nº de Documento:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.contactoEmergencia.numeroDocumento?this.contactoEmergencia.numeroDocumento:'', columnX4 + 10, inicioEjeY2);
    // Otra información
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Dirección domiciliaria del Contacto', columnX1 + 10, inicioEjeY);
    inicioEjeY+=5;
    inicioEjeY2 = inicioEjeY;
    doc.setFont('Roboto-Medium');
    doc.text('Provincia:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.provincia?
      this.provincias[this.domicilioContacto.provincia!].provincia!:'',
      columnX2 + 10,
      inicioEjeY
    );
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Parroquia:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.parroquia?this.domicilioContacto.parroquia:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Calle Principal:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.callePrincipal?this.domicilioContacto.callePrincipal:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Calle Secundaria:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.calleSecundaria?this.domicilioContacto.calleSecundaria:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Referencia:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.referencia?this.domicilioContacto.referencia:'', columnX2 + 10, inicioEjeY);
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Teléfono domicilio:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.telefonoDomicilio?this.domicilioContacto.telefonoDomicilio:'', columnX2 + 10, inicioEjeY);

    doc.setFont('Roboto-Medium');
    doc.text('Cantón:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.canton?
      this.cantonesContacto[this.domicilioContacto.canton].canton:'',
      columnX4 + 10,
      inicioEjeY2
    );
    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Número de Domicilio:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.numeroDomicilio?this.domicilioContacto.numeroDomicilio:'', columnX4 + 10, inicioEjeY2);
    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Teléfono celular:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.domicilioContacto.telefonoCelular?this.domicilioContacto.telefonoCelular:'', columnX4 + 10, inicioEjeY2);

    inicioEjeY+=5;
    doc.line(10, inicioEjeY, 200, inicioEjeY); // Coordenadas del separador (x1, y1, x2, y2)
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Información bancaria', columnX1 + 10, inicioEjeY);
    inicioEjeY+=5;
    inicioEjeY2=inicioEjeY;
    doc.text('Nombre Institución Financiera:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(
      this.informacionBancaria.nombreinstitucionFinanciera?this.informacionBancaria.nombreinstitucionFinanciera:'',
      columnX2 + 10,
      inicioEjeY
    );
    inicioEjeY+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Tipo de cuenta:', columnX1 + 10, inicioEjeY);
    doc.setFont('Roboto-Regular');
    doc.text(this.informacionBancaria.tipoCuenta?this.informacionBancaria.tipoCuenta:'', columnX2 + 10, inicioEjeY);

    doc.setFont('Roboto-Medium');
    doc.text('Tipo de Institución Financiera:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(
      this.informacionBancaria.tipoinstitucionFinanciera?this.informacionBancaria.tipoinstitucionFinanciera:'',
      columnX4 + 10,
      inicioEjeY2
    );
    inicioEjeY2+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Nº de Cuenta:', columnX3 + 10, inicioEjeY2);
    doc.setFont('Roboto-Regular');
    doc.text(this.informacionBancaria.numeroCuenta?this.informacionBancaria.numeroCuenta:'', columnX4 + 10, inicioEjeY2);

    inicioEjeY+=5;
    doc.line(10, inicioEjeY, 200, inicioEjeY);

    //Pagina 2
    doc.addPage();
    doc.setFontSize(18);
    titulo = 'FORMACIÓN ACADÉMICA Y PUBLICACIONES';
    tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    x = (paginaWidth - tituloWidth) / 2;
    doc.setFont('Roboto-Medium');
    doc.text(titulo, x, 10);

    doc.setFontSize(8);
    doc.text('Nivel de Instrucción:', columnX1 + 10, 20);
    doc.text('(máximo nivel alcanzado)', columnX1 + 10, 25);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.nivelInstruccion?this.formacionAcademica.nivelInstruccion:'', columnX2 + 10, 20);
    doc.setFont('Roboto-Medium');
    doc.text('Título Obtenido:', columnX1 + 10, 30);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.tituloObtenido?this.formacionAcademica.tituloObtenido:'', columnX2 + 10, 30);
    doc.setFont('Roboto-Medium');
    doc.text('Tiempo de Estudio:', columnX1 + 10, 35);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.tiempoEstudio?
      this.formacionAcademica.tiempoEstudio + ' AÑOS ':'',
      columnX2 + 10,
      35
    );
    doc.setFont('Roboto-Medium');
    doc.text('Nº de Registro SENESCYT', columnX1 + 10, 40);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.numeroRegistroSenescyt?
      this.formacionAcademica.numeroRegistroSenescyt:'',
      columnX2 + 10,
      40
    );
    doc.setFont('Roboto-Medium');
    doc.text('País:', columnX1 + 10, 45);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.pais?this.formacionAcademica.pais:'', columnX2 + 10, 45);

    doc.setFont('Roboto-Medium');
    doc.text('Institución:', columnX3 + 10, 20);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.institucion?this.formacionAcademica.institucion:'', columnX4 + 10, 20);
    doc.setFont('Roboto-Medium');
    doc.text('Fecha de Registro Senescyt:', columnX3 + 10, 35);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.fechaRegistroSenescyt?
      this.formacionAcademica.fechaRegistroSenescyt.toString():'',
      columnX4 + 10,
      35
    );
    doc.setFont('Roboto-Medium');
    doc.text('Fecha de Graduación:', columnX3 + 10, 40);
    doc.setFont('Roboto-Regular');
    doc.text(this.formacionAcademica.fechaGraduacion?
      this.formacionAcademica.fechaGraduacion?.toString():'',
      columnX4 + 10,
      40
    );

    doc.line(10, 50, 200, 50);
    doc.line(10, 51, 200, 51);
    doc.setFont('Roboto-Medium');
    doc.text('Formación académica adicional:', columnX1 + 10, 55);
    let altura1=60
    for (const [indice, formacionAcademica]  of this.formacionAcademica.formacionAcademicaAdicionales!.entries()) {
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Nivel de Instrucción:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.nivelInstruccion!, columnX2, altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Institución:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.institucion!, columnX4 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Título Obtenido:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.tituloObtenido!, columnX2 , altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Nº. SENESCYT:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.numeroSenescyt!, columnX4 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Fecha de Registro Senescyt:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.fechaRegistroSenescyt!.toString(), columnX2 , altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Fecha de Graduación:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.fechaGraduacion?.toString()!, columnX4 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('País:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.pais?.toString()!, columnX2 , altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Tiempo de Estudio en Años:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(formacionAcademica.tiempoEstudio.toString()!, columnX4 , altura1);
      altura1+=5;
      if (indice !== this.formacionAcademica.formacionAcademicaAdicionales!.length - 1)
        doc.line(10, altura1, 200, altura1);
    }

    doc.line(10, altura1, 200, altura1);
    doc.line(10, altura1+1, 200, altura1+1);
    altura1+=5;
    doc.setFont('Roboto-Medium');
    doc.text('Idiomas:', columnX1 + 10, altura1);
    altura1+=5;
    for (const [indice, idioma]  of this.formacionAcademica.idiomas!.entries()) {
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Idioma:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(idioma.idioma!, columnX2, altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Hablado %:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(idioma.porcentajeHablado.toString()!, columnX4 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Escrito %:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(idioma.porcentajeEscrito.toString()!, columnX2 , altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Comprensión %:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(idioma.porcentajeComprension.toString()!, columnX4 , altura1);
      altura1+=5;
      if (indice !== this.formacionAcademica.idiomas!.length - 1)
        doc.line(10, altura1, 200, altura1);
    }

    doc.addPage();
    doc.setFontSize(18);
    doc.setFont('Roboto-Medium');
    titulo = 'PUBLICACIONES';
    tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    x = (paginaWidth - tituloWidth) / 2;
    doc.text(titulo, x, 10);
    doc.setFontSize(8);
    altura1=15
    for (const [indice, publicacion]  of this.formacionAcademica.publicaciones!.entries()) {
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Tipo de Investigación:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.tipoInvestigacion!, columnX2 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Titulo Completo:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.tituloCompleto!, columnX2 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Publicador:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.publicador!, columnX2 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('ISSN/ISBN:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.codigoPublicacion!, columnX2, altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Participación:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.participacion!, columnX2 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Idioma:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.idioma!, columnX2 , altura1);
      doc.setFont('Roboto-Medium');
      doc.text('Estado de Publicación:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.estadoPublicacion!, columnX4 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Fecha de Publicación:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.fechaPublicacion?.toString()!, columnX2 , altura1);
      doc.setFont('Roboto-Medium');
      doc.text('N° Volumen:', columnX3 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.volumenPublicacion.toString()!, columnX4 , altura1);
      altura1+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Revisión de Pares:', columnX1 + 10, altura1);
      doc.setFont('Roboto-Regular');
      doc.text(publicacion.revisionPares!, columnX2 , altura1);
      altura1+=5;
      if (indice !== this.formacionAcademica.publicaciones!.length - 1)
        doc.line(10, altura1, 200, altura1);
    }

    //Pagina 3
    doc.addPage();
    doc.setFontSize(18);
    doc.setFont('Roboto-Medium');
    titulo = 'EXPERIENCIA PROFESIONAL (últimos 5 años)';
    tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    x = (paginaWidth - tituloWidth) / 2;
    doc.text(titulo, x, 10);
    doc.setFontSize(8);
    let altura=15
    for (const [indice, experiencia]  of this.docente.experienciaProfesionales!.entries()) {
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Institución:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.nombreInstitucion!, columnX2, altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Puesto:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.puesto!, columnX2 , altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Unidad administrativa:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.unidadAdministrativa!, columnX2 , altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Tipo de Institución:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.tipoInstitucion!, columnX2 , altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Modalidad de contratación:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.modalidadContratacion!, columnX2 , altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Fecha de ingreso:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.fechaIngreso?.toString()!, columnX2 , altura);
      doc.setFont('Roboto-Medium');
      doc.text('Fecha de Salida:', columnX3 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.fechaSalida?.toString()!, columnX4 , altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('Motivo de salida laboral:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.motivoSalidaLaboral!, columnX2 , altura);
      altura+=5;
      doc.setFont('Roboto-Medium');
      doc.text('País:', columnX1 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.pais!, columnX2 , altura);
      doc.setFont('Roboto-Medium');
      doc.text('Provincia:', columnX3 + 10, altura);
      doc.setFont('Roboto-Regular');
      doc.text(experiencia.provincia?experiencia.provincia:'', columnX4 , altura);
      altura+=5;
      if (indice !== this.docente.experienciaProfesionales!.length - 1)
        doc.line(10, altura, 200, altura);
    }
  doc.save('documento.pdf');
  }

  calcularDimensionesImagen(base64Image: string) {
    const doc = new jspdf();
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + base64Image;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const maxWidth = doc.internal.pageSize.getWidth(); // Ancho máximo del PDF
      const maxHeight = 40; // Altura deseada para la imagen

      let imgWidth = maxWidth;
      let imgHeight = maxWidth / aspectRatio;

      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = maxHeight * aspectRatio;
      }
      this.widthImagenUser= imgWidth;
      this.heigthImagenUser = imgHeight
      }

  }

}
