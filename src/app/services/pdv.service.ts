import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { EMPTY, Observable, firstValueFrom } from "rxjs";
import IResponse from "../models/IResponse";




@Injectable()
export class PDVService {

    constructor(private http: HttpClient) {

    }

    addPushSubscriber() {
        return this.http.post<IResponse>('https://mocktarget.apigee.net/echo', [{
          "notification": {
            "title": "Crédito Pessoal",
            "body": "Wilson Donizetti elegível ao Crédito Pessoal está no PDV U00000029",
            "icon": "assets/icons/icon-crf-72x72.png"
          }
        },
        {
          "notification": {
            "title": "Crédito Consignado",
            "body": "Ana Maria elegível ao Crédito Consignado está no PDV U00000001",
            "icon": "assets/icons/icon-crf-72x72.png"
          }
        },
        {
          "notification": {
            "title": "Cartão Carrefour",
            "body": "Julia elegível ao Cartão Carrefour está no PDV U00000015",
            "icon": "assets/icons/icon-cartao-carrefour-72x72.png"
          }
        }]);
    }
}
