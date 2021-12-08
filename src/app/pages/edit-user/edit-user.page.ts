import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AlertController  } from '@ionic/angular';

export interface User{
  id?:string;
  usuario:string;
  correo:string;
  contrasena:string;
  ape_Pat:string;
  ape_Mat:string;
  NoTele:string;
  nombre:string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  constructor(private dataService:DataService,private alertController:AlertController) { }

  user1 = {} as User;
  
  user = {
    usuario: '',
    correo : '',
    ape_Pat: '',
    ape_Mat : '',
    NoTele:'',
    nombre:'',
    verificacionEmail:false,
    verificacionUsuario:false,
    verificacionPaterno:false,
    verificacionMaterno:false,
    verificacionTelefono:false,
  }

  alertaContra="";
  alertaUsuario="";
  alertaPaterno="";
  alertaMaterno="";
  alertaTelefono="";

  ngOnInit() {
    const idUserLogged = this.dataService.getUserUid();
    this.dataService.getUserById(idUserLogged).subscribe(res => {
      this.user1 = res;
    })
  }

  onKeyEmail(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp("^[A-Za-z0-9-@.#-$%&'*_]*$");
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
    }

    let email = new RegExp("[a-zA-Z0-9.#$%&'*_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    if(!email.test(this.user.correo)){
      this.alertaContra = "invalido";
      this.user.verificacionEmail =false;
    }else{
      this.alertaContra = "valido";
      this.user.verificacionEmail = true;
      console.log(this.alertaContra )
      
    }
  }
  
  onKeyUp(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp("^[A-Za-z? ]+$");
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
      this.user.verificacionUsuario = true;
    }

    let usuarios = new RegExp("^[A-Za-z? ]+$");
   
    if(event.target.name=="nombre"){
      if(!usuarios.test(this.user.nombre)){
        this.alertaUsuario = "invalido";
        this.user.verificacionUsuario = false;
      }else{
        this.alertaUsuario = "valido";
        this.user.verificacionUsuario = true;
        console.log(this.alertaUsuario )
      }
    }
    if(event.target.name=="ape_Pat"){
        if(!usuarios.test(this.user.ape_Pat)){
          this.alertaPaterno = "invalido";
          this.user.verificacionPaterno = false;
        }else{
          this.alertaPaterno = "valido";
          this.user.verificacionPaterno = true;
          console.log(this.alertaPaterno )
        }
    }
    if(event.target.name=="ape_Mat"){
      if(!usuarios.test(this.user.ape_Mat)){
        this.alertaMaterno = "invalido";
        this.user.verificacionMaterno = false;
      }else{
        this.alertaMaterno = "valido";
        this.user.verificacionMaterno = true;
        console.log(this.alertaMaterno )
       }
   }
 }

 onKeyTelefono(event: any){
  let newValue = event.target.value;
  console.log(newValue);
  let regExp = new RegExp("[0-9]");
  if(!regExp.test(newValue)){
    event.target.value = newValue.slice(0, -1);
  }

  let telefono = new RegExp("^[0-9]*$");
  if(!telefono.test(this.user.NoTele)){
      event.target.value = newValue.slice(0, -1);
      this.alertaTelefono = "invalido";
      this.user.verificacionTelefono =false;
  
  }else{
    this.alertaTelefono = "valido";
    
    this.user.verificacionTelefono = true;
    console.log(this.alertaTelefono )
  }
}

 async guardar(_form: NgForm){
  
  const idUserLogged = this.dataService.getUserUid();
  this.dataService.update(_form.value, idUserLogged).then( (res) =>{
  //   const alert = await this.alertController.create({
  //     header : 'Exito!!',
  //     message: 'Editado Correctamento',
  //     buttons : ['OK']
  //  });
  //  await alert.present();
   
  },async (err) =>{
    console.log(err)
  })
  
  //console.log(this.user)
 } 

}
