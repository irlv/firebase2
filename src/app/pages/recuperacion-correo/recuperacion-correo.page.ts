import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-recuperacion-correo',
  templateUrl: './recuperacion-correo.page.html',
  styleUrls: ['./recuperacion-correo.page.scss'],
})
export class RecuperacionCorreoPage implements OnInit {

  constructor(private router:Router,private dataService:DataService,private alertController:AlertController) { }
  user = {
    email : ""
  }

  ngOnInit() {
  }

  onKeyEmail(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[A-Za-z0-9@,._*-]+$');
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
    }
  }


  async save(_form: NgForm){
    this.dataService.EnviarResetPassword(this.user.email).then(async (res)=>{
      const alert = await this.alertController.create({
        header : 'Exito!!',
        message: 'Correo Enviado para restaurar su Contraseña',
        buttons : ['Aceptar']
     });
     await alert.present();
    })
    
  } 
  
}
