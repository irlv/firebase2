import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadCodePageRoutingModule } from './read-code-routing.module';

import { ReadCodePage } from './read-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadCodePageRoutingModule
  ],
  declarations: [ReadCodePage]
})
export class ReadCodePageModule {}
