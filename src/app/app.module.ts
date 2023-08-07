import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { PDVService } from './services/pdv.service';
import { HttpClientModule } from '@angular/common/http';
import INotificationMessage from './models/INotificationMessage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,//!isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    PDVService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  readonly VAPID_PUBLIC_KEY = "BLjKEyVxw9XVPfhrX1HwuTOeHTcnOf5BacH6w7k7_LTTVnqX6A9S6OOpE27pZTNbcB_mrIRP73WvG_P-8aPRx0A";

  constructor(private swPush: SwPush, private update: SwUpdate, private pdvService: PDVService) {
    update.versionUpdates.subscribe(update => {
      console.log("Nova versão disponível");
    });

    this.SubscribeToPush();
    // swPush.messages.subscribe(msg =>{
    //     console.log('msg', JSON.stringify(msg));
    // });
    //this.subscribeToNotificationClicks();
  }
  private subscribeToNotificationClicks() {
    // #docregion subscribe-to-notification-clicks
    this.swPush.notificationClicks.subscribe(
      ({ action, notification }) => {
        // TODO: Do something in response to notification click.
        console.log('action', action);
        console.log('notification', notification);
      });
    // #enddocregion subscribe-to-notification-clicks
  }
  SubscribeToPush() {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(registration => {
          console.info('primeira vez');
          this.gerarNotificacoes(registration);
        });
      }
    });
  };

  gerarNotificacoes(registration: ServiceWorkerRegistration){
    setTimeout(() => {
      console.info('a cada 10s');
      this.pdvService.addPushSubscriber().subscribe(result => {
        console.info('pdv result');
        const dados: Array<INotificationMessage> = JSON.parse(result.body);

        for (let index = 0; index < dados.length; index++) {
          const element = dados[index].notification;
          console.log('inf', element);
          registration.showNotification(element.title, {
            body: element.body,
            icon: element.icon
          });
        }
      });
      this.gerarNotificacoes(registration);
    }, 10000);
  }
  // this.swPush.requestSubscription({
  //   serverPublicKey:this.VAPID_PUBLIC_KEY
  // })
  // .then(sub => {
  //   console.log('SubscribeToPush', JSON.stringify(sub));
  // })
  // .catch(err =>{
  //   console.error("Ocorreu um erro:"+ err);
  // })
}
