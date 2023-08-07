import { Component } from '@angular/core';
import { SwPush, SwUpdate, VersionEvent } from '@angular/service-worker';
import { PDVService } from './services/pdv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-pwa';
  /**
   *
   */
  ngOnInit() {

  }
  // readonly VAPID_PUBLIC_KEY = "BLjKEyVxw9XVPfhrX1HwuTOeHTcnOf5BacH6w7k7_LTTVnqX6A9S6OOpE27pZTNbcB_mrIRP73WvG_P-8aPRx0A";
  // constructor(
  //   private swPush: SwPush,
  //   private swUpdate: SwUpdate,
  //   private pdvService: PDVService
  //   ) {
  //     this.subscribeClientesPDV();
  //     swPush.messages.subscribe(msg =>{
  //       console.log(JSON.stringify(msg));
  //     });
  //   }

  //   ngOnInit() {

  //     if (this.swUpdate.isEnabled) {

  //         this.swUpdate.versionUpdates.subscribe((version:VersionEvent) => {
  //             console.log('Version ', version);
  //             if (confirm("New version available. Load New Version?")) {
  //                 window.location.reload();
  //             }

  //         });

  //     }
  //   }

    // subscribeClientesPDV() {

    //     this.swPush.requestSubscription({
    //         serverPublicKey: this.VAPID_PUBLIC_KEY
    //     })
    //     .then(sub => {
    //       this.pdvService.addPushSubscriber(sub).subscribe()
    //       console.log(JSON.stringify(sub));
    //     })
    //     .catch(err => console.error("Could not subscribe to notifications", err));
    // }
}
