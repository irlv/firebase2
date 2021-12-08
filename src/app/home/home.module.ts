import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSliderModule,
    MatInputModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
