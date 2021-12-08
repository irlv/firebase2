import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  user = {
    usario: '',
    contrasena: '',
    correo : '',
    verificacionContra : false,
    verificacionEmail:false,
  }


  constructor(private router:Router, private dataService:DataService) {}

  onKeyUp(event: any){
    let newValue = event.target.value;
    console.log(newValue);
 
    let regExp = new RegExp('^[A-Za-z0-9? ]+$');
 
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
      
    }

    

  }
  alertaContra="";
  alertaPassword="";

  onKeyContra(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[A-Za-z0-9*#&$%]*$');
    
    if(!regExp.test(newValue)){
      
      event.target.value = newValue.slice(0, -1);
      
    }

    let password = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[*#&$%])");
    if(!password.test(this.user.contrasena)){
      this.alertaPassword = "invalido";
      this.user.verificacionContra = false
      
    }else{
      this.alertaPassword = "valido";
      this.user.verificacionContra = true
     
    }
  }

  onKeyCorreo(event: any){
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp("^[A-Za-z0-9-@.#-$%&'*_]*$");
    if(!regExp.test(newValue)){
      event.target.value = newValue.slice(0, -1);
    }
    let email = new RegExp("[a-zA-Z0-9.#$%&'*_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    if(!email.test(this.user.usario)){
      
      this.user.verificacionEmail =false;
    }else{
  
      console.log("Hola5")
      this.user.verificacionEmail = true;
    }
  }

  async onSubmit(_form: NgForm) {
    //console.log(this.user);
    //console.log(this.user.usario.length)
    if(this.user.correo.length<8 || this.user.contrasena.length<8){
      alert("No cumple llena bien los Datos")
      
    }else{
      alert(this.user.usario + ' : ' + this.user.contrasena)
      console.log(_form.value)
     this.dataService.Login(_form.value).then((res)=>{
       if(this.dataService.userVerifiedMail()){
        this.router.navigate(['/tabs/carousel']);
       }else{
        this.dataService.sendEmailToVerification();
        this.dataService.Logout();
       }
     })
     
      
    }
 
    
   
  }



}
