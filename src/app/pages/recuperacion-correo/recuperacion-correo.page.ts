import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion-correo',
  templateUrl: './recuperacion-correo.page.html',
  styleUrls: ['./recuperacion-correo.page.scss'],
})
export class RecuperacionCorreoPage implements OnInit {

  constructor(private router:Router) { }
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
    this.router.navigate(['']);
  } 
  
}
