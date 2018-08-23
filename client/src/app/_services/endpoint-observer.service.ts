import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ServiceTargetsService} from './service-targets.service';
import {EndpointPushNotificationBody} from '@TypeForge/sockets/enpoint-observer.socket';
import {isEqual as _isEqual} from 'lodash';
import * as SocketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class EndpointObserverService {
  private endpointObserverSocket: SocketIO.Socket;
  private endpointPushNotification: Subject<EndpointPushNotificationBody> = new Subject<EndpointPushNotificationBody>();

  constructor(
    private _ServiceTargetsService: ServiceTargetsService
  ) { }

  private initEnpointObserverSocket() {
    const namespace = this._ServiceTargetsService.TF_API_URL + '/endpoint-observer';
    this.endpointObserverSocket = SocketIO(namespace, { secure: true });
  }

  /**
   *
   * @param {string} endpoint The endpoint to observe changes on.
   */
  endpointObserver = (endpoint: EndpointPushNotificationBody): Observable<EndpointPushNotificationBody> => {
    return this.observeEndpointPushNotification().pipe(
      filter(notification => _isEqual(notification, endpoint))
    );
  }

  setEndpointPushNotification = (notification: EndpointPushNotificationBody) => {
    this.endpointPushNotification.next(notification);
  }

  observeEndpointPushNotification = (): Observable<EndpointPushNotificationBody> => {
    return this.endpointPushNotification.asObservable();
  }
}
