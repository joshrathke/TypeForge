import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceTargetsService {

  /**
   * TypeForge API Constants
   * These can be converted into observable representations to provide more
   * flexible configurations in terms of being pointed at different targets. For
   * the most part though, this core api configuration should target the same server
   * that the client is being served from.
   */
  TF_API_PROTOCOL = location.protocol;
  TF_API_HOSTNAME = location.hostname;
  TF_API_PORT = isDevMode() ? 3001 : location.port;
  TF_API_URL = this.TF_API_PROTOCOL + '//' + this.TF_API_HOSTNAME + ':' + this.TF_API_PORT;

}
