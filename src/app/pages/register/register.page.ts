import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( private router:Router,private dataService:DataService) { }
  user = {
    usuario: '',
    correo : '',
    contrasena: '',
    contrasenaVerif : '',
    verificacionEmail:false,
    verificacionUsuario:false,
    verificacionContra:false,
    verificacionContraVefi:false,
  }
  alertaUsuario="";
  alertaContra="";
  alertaPassword="";
  alertaPasswordVeri="";

  ngOnInit() {
    
  }

  onKeyCorreo(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp("^[A-Za-z0-9-@.#-$%&'*_]*$");
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
    }
    let email = new RegExp("[a-zA-Z0-9.#$%&'*_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    if(!email.test(this.user.correo)){
      
      this.user.verificacionEmail =false;
    }else{
  
      console.log("Hola5")
      this.user.verificacionEmail = true;
    }
  }

  onKeyUp(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[A-Za-z0-9? ]+$');
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
    }
    let usuarios = new RegExp("^[A-Za-z0-9]*$");
    if(!usuarios.test(this.user.usuario)){
      
      this.user.verificacionUsuario = false;
    }else{
      
      this.user.verificacionUsuario = true;
      console.log("Hola9")
    }
  }


  onKeyPassword(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[A-Za-z0-9*#&$%]*$');
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
    }

    let password = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[*#&$%])");

    if(event.target.name=="contrasena"){
      if(!password.test(this.user.contrasena)){
        this.user.verificacionContra = false;
      }else{
        console.log("Hola")
        this.user.verificacionContra = true;
      }
    }
    if(event.target.name=="contrasenaVerif"){
      if(!password.test(this.user.contrasenaVerif)){
        this.user.verificacionContraVefi = false;
      }else{
        console.log("Hola3")
        this.user.verificacionContraVefi = true;
      }
    }
    
  }


  async guardar(_form: NgForm){

    if(this.user.contrasena == this.user.contrasenaVerif){
      if(this.user.contrasena.length>=8 && this.user.contrasenaVerif.length>=8 && this.user.usuario.length>=8){
        console.log(_form.value)
        this.dataService.register(_form.value).then((res)=>{
          this.dataService.sendEmailToVerification();
          this.dataService.Logout();
          alert("Agregado")
          //console.log(this.user)
          this.router.navigate(['/home']);
        }).catch(err=>console.log('Error'+ err))
        
      }else{
        alert("Tamaño de caracteres menores")
      }
      
    }else{
      alert("las contraseñas no concuerda")
    }
  } 

}
