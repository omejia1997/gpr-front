import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import html2canvas from 'html2canvas';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { ImagenUser } from '../../../modelos/ImagenUser';

@Component({
  selector: 'app-ver-docente-informacion',
  templateUrl: './ver-docente-informacion.component.html',
  styleUrls: ['./ver-docente-informacion.component.css'],
})
export class VerDocenteInformacionComponent implements OnInit {
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
  checkInformacionDocente: boolean = true;
  checkNumeroDocumento: boolean = true;
  checkDiscapacidadEspecial: boolean = true;
  checkEnfermedadCatastrofica: boolean = true;
  numeroDocumento: string = '';
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
  provinciaIds!: string[];
  cantonIds!: string[];
  cantonIdsContacto!: string[];
  imagenUser!:ImagenUser;
  widthImagenUser!:number;
  heigthImagenUser!: number;
  @ViewChild('imageElement') imageElementRef!: ElementRef<HTMLImageElement>;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private docenteInformacionService: DocenteInformacionService,
    private dialog: MatDialog
  ) {
    this.docenteInformacionService.docenteInformacion$.subscribe((res) => {
      this.docente = res!;
      if (this.docente == null) {
        this.back();
      } else {
        this.datosDocente.idDocente = this.docente.idEspe;
      }
     });
    this.geTerritorioEcuatoriano$ =
      this.docenteInformacionService.getTerritorioEcuatoriano();
    this.gruposEtnicos$ = this.docenteInformacionService.loadGruposEtnicos();
    this.paises$ = this.docenteInformacionService.loadPaises();
    this.formacionAcademica.formacionAcademicaAdicionales = [];
    this.formacionAcademica.idiomas = [];
    this.formacionAcademica.publicaciones = [];
    this.docente.experienciaProfesionales = [];

  }

  back(){
    this.router.navigate(['listar-docentes-informacion']);
  }

  ngOnInit() {
    this.procesarDocente();
    this.cargarTerritorioEcuatoriano();
    this.cargarGruposEtnicos();
    this.cargarPaises();
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


  procesarDocente() {
    this.docente.idEspe = this.datosDocente.idDocente;
    this.docenteInformacionService
      .obtenerDocentePorIdEspe(this.docente.idEspe)
      .subscribe((data) => {
        if (data) {
          this.docente = data;
          if(this.docente.imagenUser?.urlImagen){
            //this.imagenURL = this.docente.imagenUser?.urlImagen;
            this.docenteInformacionService.obtenerImagenUser(this.docente.imagenUser?.nombreImagen)
              .subscribe((data)=>{
                this.docente.imagenUser=data;
                this.imagenUser= data;
                this.imagenURL = this.docente.imagenUser?.urlImagen;
                this.imagenURL= "data:image/jpeg;base64,"+this.docente.imagenUser.fileBase64;
                if(this.imagenUser.fileBase64){
                  this.calcularDimensionesImagen(this.imagenUser.fileBase64);
                }
              });
          // if (this.docente.imagenUser?.urlImagen){
          //   this.imagenURL = this.docente.imagenUser?.urlImagen;
          //   this.docenteInformacionService.obtenerImagenUser(this.docente.imagenUser?.nombreImagen)
          //   .subscribe((data)=>{
          //     this.imagenUser=data;
          //     if(this.imagenUser.fileBase64){
          //       this.calcularDimensionesImagen(this.imagenUser.fileBase64);
          //     }
          //   });
          }else{
            this.imagenURL =
            'https://icon-library.com/images/user-image-icon/user-image-icon-19.jpg'; //foto por defualt
          }
          if (this.docente.discapacidad)
            this.discapacidad = this.docente.discapacidad;
          if (this.docente.domicilio) {
            this.domicilio = this.docente.domicilio;
            this.cargarDomicilioCantones();
            this.cargarDomicilioParroquia();
          }
          if (this.docente.contactoEmergencia)
            this.contactoEmergencia = this.docente.contactoEmergencia;
          if (
            this.docente.contactoEmergencia &&
            this.docente.contactoEmergencia.domicilio
          ) {
            this.domicilioContacto = this.docente.contactoEmergencia.domicilio;
            this.cargarCantonContacto();
            this.cargarParroquiaContacto();
          }
          if (this.docente.informacionBancaria)
            this.informacionBancaria = this.docente.informacionBancaria;
          if (this.docente.formacionAcademica) {
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

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  }

  async generarPDF() {
    const doc = new jspdf();
    //Configuraciones
    let cantidadFilasTabla = 0;
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
    //Separador
    doc.setLineWidth(0.3); // Ancho de la línea del separador
    doc.setDrawColor(0, 0, 0); // Color de la línea del separador (negro en este caso)
    //tabla
    const options: UserOptions = {
      headStyles: { fillColor: [0, 128, 255] }, // Tipo correcto para fillColor (arreglo de números)
      bodyStyles: { textColor: [0, 0, 0] }, // Tipo correcto para textColor (arreglo de números)
      alternateRowStyles: { fillColor: [230, 230, 230] }, // Tipo correcto para fillColor (arreglo de números)
    };

    doc.setFont('Roboto-Regular');
    doc.setFontSize(18);
    let titulo = 'INFORMACIÓN PERSONAL';
    let tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;

    let x = (paginaWidth - tituloWidth) / 2;
    doc.text(titulo, x, 10);
    //doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Tipo de Documento:', columnX1 + 10, 20);
    doc.text(this.docente.tipoDocumento?this.docente.tipoDocumento:'', columnX2 + 10, 20);
    doc.text('Nº de Documento:', columnX1 + 10, 25);
    doc.text(this.docente.numeroDocumento?this.docente.numeroDocumento:'', columnX2 + 10, 25);
    doc.text('Apellidos y Nombres:', columnX1 + 10, 30);
    doc.text(this.docente.nombreCompleto?this.docente.nombreCompleto:'', columnX2 + 10, 30);
    doc.text('Fecha de Nacimiento:', columnX1 + 10, 35);
    doc.text(
      this.docente.fechaNacimiento?this.docente.fechaNacimiento.toString()! +
        '        ' +
        this.docente.edad +
        ' AÑOS':'',
      columnX2 + 10,
      35
    );
    doc.text('Género:', columnX1 + 10, 40);
    doc.text(this.docente.genero?this.docente.genero:'', columnX2 + 10, 40);
    doc.text('Estado Civil:', columnX1 + 10, 45);
    doc.text(this.docente.estadoCivil?this.docente.estadoCivil:'', columnX2 + 10, 45);
    doc.text('Nacionalidad:', columnX1 + 10, 50);
    doc.text(this.docente.nacionalidad?this.docente.nacionalidad:'', columnX2 + 10, 50);
    doc.text('En caso de extranjero,', columnX1 + 10, 55);
    doc.text('indicar años de residencia:', columnX1 + 10, 60);
    doc.text(this.docente.aniosResidencia?this.docente.aniosResidencia.toString():'', columnX2 + 10, 55);
    doc.text('Auto identificación étnica:', columnX3 + 10, 55);
    doc.text(this.docente.etnia?this.docente.etnia:'', columnX4 + 10, 55);
    doc.text('Correo electrónico principal:', columnX1 + 10, 65);
    doc.text(this.docente.correoPrincipal?this.docente.correoPrincipal:'', columnX2 + 10, 65);
    doc.text('Correo electrónico alternativo:', columnX1 + 10, 70);
    doc.text(this.docente.correoAlternativo?this.docente.correoAlternativo:'', columnX2 + 10, 70);
    doc.text('En caso de ser indígena,', columnX3 + 10, 60);
    doc.text('indique el grupo étnico:', columnX3 + 10, 65);
    doc.text(this.docente.grupoEtnico?this.docente.grupoEtnico:'', columnX4 + 10, 60);
    doc.text('Tipo de Sangre:', columnX3 + 10, 70);
    doc.text(this.docente.tipoSangre?this.docente.tipoSangre:'', columnX4 + 10, 70);

    //ImagenUser
    console.log(this.imagenUser)
    if(this.imagenUser?.fileBase64){
      let anchoDisponible = (200-(columnX3+10));
      let coordenadaX = (anchoDisponible-this.widthImagenUser)/2;
      coordenadaX = columnX3+10+coordenadaX;
      doc.addImage(this.imagenUser.fileBase64, 'JPEG',  coordenadaX , 12,this.widthImagenUser , this.heigthImagenUser)
    }

    doc.line(10, 75, 200, 75); // Coordenadas del separador (x1, y1, x2, y2)

    doc.text(
      'Información adicional de discapacidad y/o enfermedad catastrófica',
      columnX1 + 10,
      80
    );

    doc.text('Discapacidad Especial:', columnX1 + 10, 85);
    doc.text(this.discapacidad.discapacidadEspecial?this.discapacidad.discapacidadEspecial:'', columnX2 + 10, 85);
    doc.text('Discapacidad Especial:', columnX1 + 10, 90);
    doc.text(this.discapacidad.tipoDiscapacidad?this.discapacidad.tipoDiscapacidad:'', columnX2 + 10, 90);
    doc.text('% de discapacidad:', columnX1 + 10, 95);
    doc.text(
      this.discapacidad.porcentajeDiscapacidad?this.discapacidad.porcentajeDiscapacidad.toString():'',
      columnX2 + 10,
      95
    );
    doc.text('No. Carnet M.S.P.:', columnX1 + 10, 100);
    doc.text(this.discapacidad.numeroCarnet?this.discapacidad.numeroCarnet:'', columnX2 + 10, 100);

    doc.text('Enfermedad Catastrófica:', columnX3 + 10, 85);
    doc.text(this.discapacidad.enfermedadCatastrofica?this.discapacidad.enfermedadCatastrofica:'', columnX4 + 10, 85);
    doc.text('Tipo de Enfermedad Catastrófica:', columnX3 + 10, 90);
    doc.text(this.discapacidad.tipoEnfermedadCatastrofica?this.discapacidad.tipoEnfermedadCatastrofica:'', columnX3 + 20, 95);

    doc.line(10, 105, 200, 105); // Coordenadas del separador (x1, y1, x2, y2)

    doc.text('Dirección domiciliaria permanente', columnX1 + 10, 110);

    doc.text('Provincia:', columnX1 + 10, 115);
    doc.text(this.domicilio.provincia?
      this.provincias[this.domicilio.provincia].provincia:'',
      columnX2 + 10,
      115
    );
    doc.text('Parroquia:', columnX1 + 10, 120);
    doc.text(this.domicilio.parroquia?this.domicilio.parroquia:'', columnX2 + 10, 120);
    doc.text('Calle Principal:', columnX1 + 10, 125);
    doc.text(this.domicilio.callePrincipal?this.domicilio.callePrincipal:'', columnX2 + 10, 125);
    doc.text('Calle Secundaria:', columnX1 + 10, 130);
    doc.text(this.domicilio.calleSecundaria?this.domicilio.calleSecundaria:'', columnX2 + 10, 130);
    doc.text('Referencia:', columnX1 + 10, 135);
    doc.text(this.domicilio.referencia?this.domicilio.referencia:'', columnX2 + 10, 135);
    doc.text('Teléfono domicilio:', columnX1 + 10, 140);
    doc.text(this.domicilio.telefonoDomicilio?this.domicilio.telefonoDomicilio:'', columnX2 + 10, 140);
    doc.text('Teléfono trabajo:', columnX1 + 10, 145);
    doc.text(this.docente.telefonoTrabajo?this.docente.telefonoTrabajo:'', columnX2 + 10, 145);

    doc.text('Cantón:', columnX3 + 10, 115);
    doc.text(this.domicilio.canton?this.cantones[this.domicilio.canton!].canton:'', columnX4 + 10, 115);
    doc.text('Número de Domicilio:', columnX3 + 10, 120);
    doc.text(this.domicilio.numeroDomicilio?this.domicilio.numeroDomicilio:'', columnX4 + 10, 120);
    doc.text('Teléfono celular:', columnX3 + 10, 125);
    doc.text(this.domicilio.telefonoCelular?this.domicilio.telefonoCelular:'', columnX4 + 10, 125);
    doc.text('Extensión:', columnX3 + 10, 145);
    doc.text(this.docente.extension?this.docente.extension:'', columnX4 + 10, 145);

    doc.line(10, 150, 200, 150); // Coordenadas del separador (x1, y1, x2, y2)

    doc.text('Contacto de emergencia', columnX1 + 10, 155);

    doc.text('Apellidos y Nombres:', columnX1 + 10, 160);
    doc.text(this.contactoEmergencia.nombresCompletos?this.contactoEmergencia.nombresCompletos:'', columnX2 + 10, 160);
    doc.text('Tipo de Documento:', columnX1 + 10, 165);
    doc.text(this.contactoEmergencia.tipoDocumento?this.contactoEmergencia.tipoDocumento:'', columnX2 + 10, 165);
    doc.text('Parentesco:', columnX1 + 10, 170);
    doc.text(this.contactoEmergencia.parentesco?this.contactoEmergencia.parentesco:'', columnX2 + 10, 170);

    doc.text('Nº de Documento:', columnX3 + 10, 165);
    doc.text(this.contactoEmergencia.numeroDocumento?this.contactoEmergencia.numeroDocumento:'', columnX4 + 10, 165);
    // Otra información
    doc.text('Dirección domiciliaria del Contacto', columnX1 + 10, 175);

    doc.text('Provincia:', columnX1 + 10, 180);
    doc.text(this.domicilioContacto.provincia?
      this.provincias[this.domicilioContacto.provincia!].provincia!:'',
      columnX2 + 10,
      180
    );
    doc.text('Parroquia:', columnX1 + 10, 185);
    doc.text(this.domicilioContacto.parroquia?this.domicilioContacto.parroquia:'', columnX2 + 10, 185);
    doc.text('Calle Principal:', columnX1 + 10, 190);
    doc.text(this.domicilioContacto.callePrincipal?this.domicilioContacto.callePrincipal:'', columnX2 + 10, 190);
    doc.text('Calle Secundaria:', columnX1 + 10, 195);
    doc.text(this.domicilioContacto.calleSecundaria?this.domicilioContacto.calleSecundaria:'', columnX2 + 10, 195);
    doc.text('Referencia:', columnX1 + 10, 200);
    doc.text(this.domicilioContacto.referencia?this.domicilioContacto.referencia:'', columnX2 + 10, 200);
    doc.text('Teléfono domicilio:', columnX1 + 10, 205);
    doc.text(this.domicilioContacto.telefonoDomicilio?this.domicilioContacto.telefonoDomicilio:'', columnX2 + 10, 205);

    doc.text('Cantón:', columnX3 + 10, 180);
    doc.text(this.domicilioContacto.canton?
      this.cantones[this.domicilioContacto.canton].canton:'',
      columnX4 + 10,
      180
    );
    doc.text('Número de Domicilio:', columnX3 + 10, 185);
    doc.text(this.domicilioContacto.numeroDomicilio?this.domicilioContacto.numeroDomicilio:'', columnX4 + 10, 185);
    doc.text('Teléfono celular:', columnX3 + 10, 190);
    doc.text(this.domicilioContacto.telefonoCelular?this.domicilioContacto.telefonoCelular:'', columnX4 + 10, 190);

    doc.line(10, 210, 200, 210); // Coordenadas del separador (x1, y1, x2, y2)

    doc.text('Información bancaria', columnX1 + 10, 215);

    doc.text('Nombre Institución Financiera:', columnX1 + 10, 220);
    doc.text(
      this.informacionBancaria.nombreinstitucionFinanciera?this.informacionBancaria.nombreinstitucionFinanciera:'',
      columnX2 + 10,
      220
    );
    doc.text('Tipo de cuenta:', columnX1 + 10, 225);
    doc.text(this.informacionBancaria.tipoCuenta?this.informacionBancaria.tipoCuenta:'', columnX2 + 10, 225);

    doc.text('Tipo de Institución Financiera:', columnX3 + 10, 220);
    doc.text(
      this.informacionBancaria.tipoinstitucionFinanciera?this.informacionBancaria.tipoinstitucionFinanciera:'',
      columnX4 + 10,
      220
    );
    doc.text('Nº de Cuenta:', columnX3 + 10, 225);
    doc.text(this.informacionBancaria.numeroCuenta?this.informacionBancaria.numeroCuenta:'', columnX4 + 10, 225);

    doc.line(10, 230, 200, 230);

    //Pagina 2
    doc.addPage();
    doc.setFontSize(18);
    titulo = 'FORMACIÓN ACADÉMICA Y PUBLICACIONES';
    tituloWidth =
      (doc.getStringUnitWidth(titulo) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    x = (paginaWidth - tituloWidth) / 2;
    doc.text(titulo, x, 10);

    doc.setFontSize(8);
    doc.text('Nivel de Instrucción:', columnX1 + 10, 20);
    doc.text('(máximo nivel alcanzado)', columnX1 + 10, 25);
    doc.text(this.formacionAcademica.nivelInstruccion?this.formacionAcademica.nivelInstruccion:'', columnX2 + 10, 20);
    doc.text('Título Obtenido:', columnX1 + 10, 30);
    doc.text(this.formacionAcademica.tituloObtenido?this.formacionAcademica.tituloObtenido:'', columnX2 + 10, 30);
    doc.text('Tiempo de Estudio:', columnX1 + 10, 35);
    doc.text(this.formacionAcademica.tiempoEstudio?
      this.formacionAcademica.tiempoEstudio + ' AÑOS ':'',
      columnX2 + 10,
      35
    );
    doc.text('Nº de Registro SENESCYT', columnX1 + 10, 40);
    doc.text(this.formacionAcademica.numeroRegistroSenescyt?
      this.formacionAcademica.numeroRegistroSenescyt:'',
      columnX2 + 10,
      40
    );
    doc.text('País:', columnX1 + 10, 45);
    doc.text(this.formacionAcademica.pais?this.formacionAcademica.pais:'', columnX2 + 10, 45);

    doc.text('Institución:', columnX3 + 10, 20);
    doc.text(this.formacionAcademica.institucion?this.formacionAcademica.institucion:'', columnX4 + 10, 20);
    doc.text('Fecha de Registro Senescyt:', columnX3 + 10, 35);
    doc.text(this.formacionAcademica.fechaRegistroSenescyt?
      this.formacionAcademica.fechaRegistroSenescyt.toString():'',
      columnX4 + 10,
      35
    );
    doc.text('Fecha de Graduación:', columnX3 + 10, 40);
    doc.text(this.formacionAcademica.fechaGraduacion?
      this.formacionAcademica.fechaGraduacion?.toString():'',
      columnX4 + 10,
      40
    );

    doc.line(10, 50, 200, 50);
    doc.text('Formación académica adicional:', columnX1 + 10, 55);
    let columns;
    let posicionYFinalTabla=60;
    if (this.formacionAcademica.formacionAcademicaAdicionales) {
      columns = [
        { header: 'Nivel de Instrucción', dataKey: 'nivelInstruccion' },
        { header: 'Institución', dataKey: 'institucion' },
        { header: 'Título Obtenido', dataKey: 'tituloObtenido' },
        { header: 'Nº. SENESCYT', dataKey: 'numeroSenescyt' },
        {
          header: 'Fecha de Registro Senescyt',
          dataKey: 'fechaRegistroSenescyt',
        },
        { header: 'Fecha de Graduación', dataKey: 'fechaGraduacion' },
        { header: 'País', dataKey: 'pais' },
        { header: 'Tiempo de Estudio en Años', dataKey: 'tiempoEstudio' },
      ];
      const tableRows =
        this.formacionAcademica.formacionAcademicaAdicionales.map((item) => [
          item.nivelInstruccion ? item.nivelInstruccion : '',
          item.institucion ? item.institucion : '',
          item.tituloObtenido ? item.tituloObtenido : '',
          item.numeroSenescyt ? item.numeroSenescyt : '',
          item.fechaRegistroSenescyt ? item.fechaRegistroSenescyt.toString() : '',
          item.fechaGraduacion ? item.fechaGraduacion.toString() : '',
          item.pais ? item.pais : '',
          item.tiempoEstudio ? item.tiempoEstudio.toString() : '',
        ]);

      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body: tableRows,
        startY: posicionYFinalTabla,
        theme: 'grid', // Estilo de la tabla ('striped', 'grid', 'plain')
        columns, // Configuraciones de columnas
        ...options, // Opciones de formato y estilo (opcional)
      });

      posicionYFinalTabla= this.calcularAlturaTabla(tableRows.length, 12, posicionYFinalTabla);

    }
    doc.text('Idiomas:', columnX1 + 10, posicionYFinalTabla+10);
    posicionYFinalTabla += 15;
    if (this.formacionAcademica.idiomas) {
      columns = [
        { header: 'Idioma', dataKey: 'idioma' },
        { header: 'Hablado %', dataKey: 'porcentajeHablado' },
        { header: 'Escrito %', dataKey: 'porcentajeEscrito' },
        { header: 'Comprensión %', dataKey: 'porcentajeComprension' }
      ];
      const tableRows =
        this.formacionAcademica.idiomas.map((item) => [
          item.idioma ? item.idioma : '',
          item.porcentajeHablado ? item.porcentajeHablado.toString() : '',
          item.porcentajeEscrito ? item.porcentajeEscrito.toString() : '',
          item.porcentajeComprension ? item.porcentajeComprension.toString() : '',
        ]);

      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body: tableRows,
        startY: posicionYFinalTabla,
        theme: 'grid',
        columns,
        ...options,
      });
      posicionYFinalTabla= this.calcularAlturaTabla(tableRows.length, 8, posicionYFinalTabla);
    }

    doc.text('Publicaciones:', columnX1 + 10, posicionYFinalTabla);
    posicionYFinalTabla += 5;
    if (this.formacionAcademica.publicaciones) {
      columns = [
        { header: 'ISSN/ISBN', dataKey: 'codigoPublicacion' },
        { header: 'Tipo de Investigación', dataKey: 'tipoInvestigacion' },
        { header: 'Publicador', dataKey: 'publicador' },
        { header: 'Participación', dataKey: 'participacion' },
        { header: 'Idioma', dataKey: 'idioma' },
        { header: 'Estado de Publicación', dataKey: 'estadoPublicacion' },
        { header: 'Fecha de Publicación', dataKey: 'fechaPublicacion' },
        { header: 'N° Volumen', dataKey: 'volumenPublicacion' },
      ];
      const tableRows =
        this.formacionAcademica.publicaciones.map((item) => [
          item.codigoPublicacion ? item.codigoPublicacion : '',
          item.tipoInvestigacion ? item.tipoInvestigacion : '',
          item.publicador ? item.publicador : '',
          item.participacion ? item.participacion : '',
          item.idioma ? item.idioma : '',
          item.estadoPublicacion ? item.estadoPublicacion : '',
          item.fechaPublicacion ? item.fechaPublicacion.toString() : '',
          item.volumenPublicacion ? item.volumenPublicacion.toString() : ''
        ]);

      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body:  tableRows,
        startY: posicionYFinalTabla,
        theme: 'grid',
        columns,
        ...options,
      });
      posicionYFinalTabla= this.calcularAlturaTabla(tableRows.length, 12, posicionYFinalTabla);

      posicionYFinalTabla+=10;
      columns = [
        { header: 'ISSN/ISBN', dataKey: 'codigoPublicacion' },
        { header: 'Título Completo', dataKey: 'tituloCompleto' },
        { header: 'DOI', dataKey: 'doi' },
        { header: 'Revisión de Pares', dataKey: 'revisionPares' }
      ];
      const tableRows2 =
        this.formacionAcademica.publicaciones.map((item) => [
          item.codigoPublicacion ? item.codigoPublicacion : '',
          item.tituloCompleto ? item.tituloCompleto : '',
          item.doi ? item.doi : '',
          item.revisionPares ? item.revisionPares : ''
        ]);
      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body:  tableRows2,
        startY: posicionYFinalTabla,
        theme: 'grid',
        columns,
        ...options,
      });
      posicionYFinalTabla= this.calcularAlturaTabla(tableRows2.length, 12, posicionYFinalTabla);
    }

    //Pagina 3
    doc.addPage();
    doc.setFontSize(18);
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
      doc.text('Institución:', columnX1 + 10, altura);
      doc.text(experiencia.nombreInstitucion!, columnX2, altura);
      altura+=5;
      doc.text('Puesto:', columnX1 + 10, altura);
      doc.text(experiencia.puesto!, columnX2 , altura);
      altura+=5;
      doc.text('Unidad administrativa:', columnX1 + 10, altura);
      doc.text(experiencia.unidadAdministrativa!, columnX2 , altura);
      altura+=5;
      doc.text('Tipo de Institución:', columnX1 + 10, altura);
      doc.text(experiencia.tipoInstitucion!, columnX2 , altura);
      doc.text('Modalidad de contratación:', columnX3 + 10, altura);
      doc.text(experiencia.modalidadContratacion!, columnX4 , altura);
      altura+=5;
      doc.text('Fecha de ingreso:', columnX1 + 10, altura);
      doc.text(experiencia.fechaIngreso?.toString()!, columnX2 , altura);
      doc.text('Fecha de Salida:', columnX3 + 10, altura);
      doc.text(experiencia.fechaSalida?.toString()!, columnX4 , altura);
      altura+=5;
      doc.text('Motivo de salida laboral:', columnX1 + 10, altura);
      doc.text(experiencia.motivoSalidaLaboral!, columnX2 , altura);
      altura+=5;
      doc.text('País:', columnX1 + 10, altura);
      doc.text(experiencia.pais!, columnX2 , altura);
      doc.text('Provincia:', columnX3 + 10, altura);
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


  calcularAlturaTabla(filas: number, tamañoFuente: number, margenSuperior: number) {
    const alturaFila = tamañoFuente * 1.2; // Ajusta este valor según el tamaño de fuente que estés usando
    const espacioEntreFilas = 2; // Ajusta este valor según el espaciado que desees entre filas

    // Calcula la altura total de la tabla (incluyendo las filas y el espacio entre ellas)
    const alturaTotalTabla = filas * (alturaFila + espacioEntreFilas);

    // Calcula la posición Y donde termina la tabla
    const finEjeYTabla = margenSuperior + alturaTotalTabla;

    return finEjeYTabla;
  }
}
