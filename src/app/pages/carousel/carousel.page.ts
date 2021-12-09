import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { PassdataService } from 'src/app/services/passdata.service';
import { BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.page.html',
  styleUrls: ['./carousel.page.scss'],
})

export class CarouselPage implements OnInit {
  img=[];
  @Input() dataQr={
    url:'',
    name:'',
  }

  show=false;
  constructor(private dataService:DataService,
    private barcodeScanner: BarcodeScanner,private passdata : PassdataService,private router:Router) { 
    this.dataService.getUrl().subscribe(res =>{
      this.img = res;
      console.log(res);
    })
  }
  @ViewChild('slides', { read: true, static: false }) ionSlides: IonSlides;

  ngOnInit() {
  }
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  signOut() {
    this.dataService.Logout().then(() => {
      this.router.navigateByUrl('/', {replaceUrl: true});
    });
    
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

      // this.show = true;

      this.passdata.disparadorData.emit(this.dataQr)
      this.router.navigateByUrl('/tabs/products', {replaceUrl: true});
    }
    ).catch(err => {
      alert("Algio salio mal")
    });

    

  }
  

}
