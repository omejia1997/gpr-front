import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home-vinculacion.component.html',
  styleUrls: ['./home-vinculacion.component.css'],

})



export class HomeVinculacionComponent implements OnInit {

  images: string[] = [
    'https://www.espe.edu.ec/wp-content/uploads/slider/cache/1df7ba634766f535589faa0e3e58f0d6/ESPE-Matriz-Sangolqui.png',
    'https://supercomputacion.espe.edu.ec/wp-content/uploads/2015/03/PANORAMICA-ESPE.jpg',
    'https://mecanica.espe.edu.ec/wp-content/uploads/2018/10/cropped-espe_portada-2.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/37/ESPE_campus_sangolqui.JPG'
  ];
  currentIndex = 0;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000);
   }

}
