import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserPageRoutingModule } from './edit-user-routing.module';

import { EditUserPage } from './edit-user.page';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    EditUserPageRoutingModule
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
