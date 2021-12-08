import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassdataService {
  @Output() disparadorData : EventEmitter <any> = new EventEmitter();
  constructor() { }
}
