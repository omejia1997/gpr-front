import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, AbstractControl } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listar-tareas-revisar',
  templateUrl: './listar-tareas-revisar.html',
  styleUrls: ['./listar-tareas-revisar.component.css']
})

export class ListarTareasRevisarComponent implements OnInit {
  //getTareasDocente$: Observable<TareaDocente[]>;
  //tareasDocente: TareaDocente[] = [];
  tareasDocente: any[] | undefined = [];
  cedulaDocenteRevisor: any;
  dataTable: any | null;//[] = [];
  data: any;
  //sum:number=0;

  //
  displayedColumns: string[] = ['id', 'revisor', 'proceso', 'proyecto', 'tarea', 'tipoTarea', 'tareaIndicadors', 'prioridad', 'peso', 'fechaInicio', 'fechaVencimiento', 'responsable', 'pdf'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource: any;

  readonly formControl: AbstractControl;
  //

  constructor(
    private tareaService: TareaService,
    //
    formBuilder: FormBuilder
  ) {
    //this.getTareasDocente$ = this.tareaService.obtenerTodasTareasRevisar();
    //
    /*this.tareaService.tareasDocente$.subscribe((res) => {
      this.tareasDocente = res;
      console.log(this.tareasDocente);
      
      
    });*/
    if (localStorage.getItem('dataTable') != null) {
      this.data = localStorage.getItem('dataTable');
      this.dataTable = JSON.parse(this.data);
      this.dataSource = new MatTableDataSource(this.dataTable);
    }


    //this.getTareas();

    this.dataSource.filterPredicate = ((data, filter) => {
      const a = !filter.id || data.id === filter.id;
      const b = !filter.revisor || data.revisor.toLowerCase().includes(filter.revisor);
      const c = !filter.proceso || data.proceso.toLowerCase().includes(filter.proceso);
      const d = !filter.proyecto || data.proyecto.toLowerCase().includes(filter.proyecto);
      const e = !filter.tarea || data.tarea.toLowerCase().includes(filter.tarea);
      const f = !filter.prioridad || data.prioridad.toLowerCase().includes(filter.prioridad);
      const g = !filter.peso || data.peso.toLowerCase().includes(filter.peso);
      const h = !filter.fechaInicio || data.revisor.fechaInicio().includes(filter.fechaInicio);
      const i = !filter.fechaVencimiento || data.fechaVencimiento.toLowerCase().includes(filter.fechaVencimiento);
      const j = !filter.responsable || data.responsable.toLowerCase().includes(filter.responsable);
      const k = !filter.tipoTarea || data.tipoTarea.toLowerCase().includes(filter.tipoTarea);
      return a && b && c && d && e && f && g && h && i && j && k;
    }) as (PeriodicElement: any, string: any) => boolean;

    this.formControl = formBuilder.group({
      id: '',
      revisor: '',
      proceso: '',
      proyecto: '',
      tarea: '',
      tipoTarea: '',
      prioridad: '',
      peso: '',
      fechaInicio: '',
      fechaVencimiento: '',
      responsable: ''
    })
    this.formControl.valueChanges.subscribe(value => {
      const filter = {
        ...value, revisor: value.revisor.trim().toLowerCase(), proceso: value.proceso.trim().toLowerCase(),
        proyecto: value.proyecto.trim().toLowerCase(), tarea: value.tarea.trim().toLowerCase(),
        tipoTarea: value.tipoTarea.trim().toLowerCase(), prioridad: value.prioridad.trim().toLowerCase(),
        peso: value.peso.trim().toLowerCase(), responsable: value.responsable.trim().toLowerCase()
      } as string;
      this.dataSource.filter = filter;
    });
  }

  ngOnInit(): void {
  }

  convertirDataPdf() {
    /*
    var doc = new jspdf('landscape', 'pt', 'a4');
    var margin =10;
    var scale = (doc.internal.pageSize.width-margin*2)/document.body.scrollWidth;
    const DATA = document.getElementById('dataPdf');
    if(DATA)
      doc.html(DATA,{
        x:margin,
        y:margin,
        html2canvas:{
          scale:scale,
        },
        callback:function(doc){
          doc.output('dataurlnewwindow',{filename:'dataPdf.pdf'})
        }
      })
    */
    const DATA = document.getElementById('dataPdf');
    const doc = new jspdf('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    if (DATA) {
      html2canvas(DATA, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${formatDate(new Date(), 'yyyy/MM/dd', 'en')}_reporteTarea.pdf`);
      });
    }
    /*var data = document.getElementById("dataPdf");
    if(data)
      html2canvas(data).then(canvas=>{
        var imgWidth = 208;
        var imgHeigth = canvas.height * imgWidth / canvas.width;
        let pdf = new jspdf('p','mm','a4');
        var position =0;
        pdf.save('Data.pdf');
      })*/
  }
}
