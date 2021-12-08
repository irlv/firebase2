import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,sendEmailVerification, 
  signInWithEmailAndPassword,sendPasswordResetEmail } from '@angular/fire/auth';
  import { Observable} from 'rxjs';


  import { Firestore, docData, setDoc, doc, updateDoc, collection, where, onSnapshot,collectionData }
   from '@angular/fire/firestore';
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

  export interface Carousel {
    id?: string;
    url: string;
  }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private auth: Auth,private fire: Firestore,) { }


  Login(user: User) {
    return signInWithEmailAndPassword(this.auth, user.correo, user.contrasena);
  }

  Logout(): Promise<void> {
    return this.auth.signOut();
  }

  async register(user: User): Promise<any> {
    console.log(user.correo+" "+user.contrasena)
    const credential = await createUserWithEmailAndPassword(this.auth, user.correo, user.contrasena);
    const uid = credential.user.uid;
    const userRef = doc(this.fire, `notes/${uid}`);
    return setDoc(userRef, { usuario: user.usuario, email: user.correo, nombre: '', ape_Pat: '', ape_Mat: '', NoTele: '' });
  }

  userVerifiedMail(){
    return this.auth.currentUser.emailVerified;
  }
  async sendEmailToVerification(){
    return await sendEmailVerification(this.auth.currentUser)
  }

  async update(user: User, id): Promise<any> {
    console.log(user)
    const userRef = doc(this.fire, `notes/${id}`);
    return await updateDoc(userRef, { nombre: user.nombre, ape_Pat: user.ape_Pat, ape_Mat: user.ape_Mat, NoTele: user.NoTele })
  }

  getUserUid() {
    return this.auth.currentUser.uid;
  }

  getUserById(id): Observable<User> {
    const userDocRef = doc(this.fire, `notes/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>
  }

  async EnviarResetPassword(email){
    return await sendPasswordResetEmail(this.auth, email);
  }

  getUrl(){
    const ref = collection(this.fire, 'carrusel');
    return collectionData(ref, {idField: 'id'}) as Observable<Carousel[]>;
  }

  
}
