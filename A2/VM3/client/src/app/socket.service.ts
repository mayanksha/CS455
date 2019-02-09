import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class SocketService {

	// Our socket connection
	ws_url = 'http://localhost:11002';
	private socket;
	public initSocket(): void {
		this.socket = socketIo(this.ws_url);
	}
	public getPing(data): void {
		this.socket.emit('getPing', data);
		console.log(data);
	}

	public onPingEvent(): Observable<any> {
		return new Observable<any>(observer => {
			this.socket.on('pingICMP', (data: ArrayBuffer) => {
					return observer.next(data);
				});
		});
	}
	public onEvent(event: any): Observable<any> {
		return new Observable<Event>(observer => {
			this.socket.on(event, () => observer.next());
		});
	}
	public quitPing(): Observable<any> {
		return new Observable<Event>(observer => {
			this.socket.on('quitPing', () => observer.next());
		});
	}
	constructor() { }
}
