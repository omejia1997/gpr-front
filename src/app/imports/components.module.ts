import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RadioButtonModule,
    InputSwitchModule,
    ButtonModule,
    SplitButtonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})

export class ComponentsModule {}
