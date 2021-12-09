import { Component, OnInit } from '@angular/core';
import { PassdataService } from 'src/app/services/passdata.service';
import { BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  dataQr={
    url:'',
    name:'',
  }
  
  show=false;

  constructor(private passdata : PassdataService,private barcodeScanner: BarcodeScanner,private dataService:DataService,private router:Router) { }

  ngOnInit() {
    this.passdata.disparadorData.subscribe( data =>{
      this.show = true;
      this.dataQr.url = data.url;
      this.dataQr.name = data.name;
    })
  }

  openScanner(){
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      const dataSplit = ''+barcodeData["text"];
      const myArray = dataSplit.split(',');
      this.dataQr.url = myArray[0];
      this.dataQr.name = myArray[1];
      this.show = true;
    }).catch(err => {
      alert("Error")
    });
  }

  signOut() {
    this.dataService.Logout().then(() => {
      this.router.navigateByUrl('/', {replaceUrl: true});
    });
    
  }


}
