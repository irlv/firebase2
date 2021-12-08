import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperacionCorreoPageRoutingModule } from './recuperacion-correo-routing.module';

import { RecuperacionCorreoPage } from './recuperacion-correo.page';
import {MatInputModule} from '@angular/material/input'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperacionCorreoPageRoutingModule,
    MatInputModule
  ],
  declarations: [RecuperacionCorreoPage]
})
export class RecuperacionCorreoPageModule {}
