import { HttpHeaders } from "@angular/common/http";
import INotificationMessage from "./INotificationMessage";

export default interface IResponse {
  method: string;
  url: string;
  body: string;
  headers: HttpHeaders;
}
