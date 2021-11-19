import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  setCookie(name: string, value: any, daysToLive: number) {
    var cookie = name + "=" + encodeURIComponent(value);
    
    if(typeof daysToLive === "number") {
        cookie += "; max-age=" + (daysToLive*24*60*60);
        document.cookie = cookie;
    }
  }

  getCookie(name: string): any {
    let data = null;
    var cookieArr = document.cookie.split(";");
    cookieArr.forEach( element => {
      var cookiePair = element.split("=");
      if(name === cookiePair[0].trim()) {
          data = JSON.parse(decodeURIComponent(cookiePair[1]));
      }
    });
    return data;
  }

  deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  } 


}
