import { Component, Injectable, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})



export class HomeComponent implements OnInit {

  feedbacks: any[] = [];
  results: any[] = [];
  constructor() { 

    this.feedbacks = ["Le système est trop lent ", "Le top! Un exemple d'excellence.", "C'est quoi ce bordel !"]; 
    this.results = [
      [{score: 0.535632, tone_id: "anger", tone_name: "Colère"}],
      [{score: 0.633569, tone_id: "anger", tone_name: "Colère"},
       {score: 0.506763, tone_id: "analytical", tone_name: "Analytique"}],
      [{score: 0.895438, tone_id: "joy", tone_name: "Joie"}]  
    ];
  }



  ngOnInit(): void {
   

  }

}
