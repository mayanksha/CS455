import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import * as io from 'socket.io-client';
import { FormArray,
	FormGroup,
	FormBuilder,
	Validators,
	ValidatorFn,
	FormControl,
	NgForm,
	FormGroupDirective
} from '@angular/forms';
enum Event {
	CONNECT = 'connect',
	DISCONNECT = 'disconnect'
}
@Component({
	selector: 'app-data-preview',
	templateUrl: './data-preview.component.html',
	styleUrls: ['./data-preview.component.css']
})
export class DataPreviewComponent implements OnInit {
	vm1 = 'http://172.20.0.2:9000';
	vm2 = 'http://172.20.0.3:9000';
	vm3 = 'http://172.20.0.4:9000';
	form: FormGroup;
	interval = 1;
	vm1_refresher: any[] = [];
	vm2_refresher: any[] = [];
	VM_config: any[] = [];

	vm1_rand: number;
	vm2_rand: number;

	vm1_ping: string;
	vm2_ping: string;
	ioConnection: any;
	vm1_lastPingTime: number;
	vm2_lastPingTime: number;
	private initIoConnection(): void {
		this.socketService.initSocket();

		this.ioConnection = this.socketService.onPingEvent()
		.subscribe((pingReply: any) => {
			if (typeof pingReply === 'string') {
				const curr_time = new Date().getTime();
				if (curr_time - this.vm1_lastPingTime >= this.interval * 1000 + 3000) {
					this.vm1_ping = null;
				}
				if (curr_time - this.vm2_lastPingTime >= this.interval * 1000 + 3000) {
					this.vm2_ping = null;
				}
				if (pingReply.search(this.VM_config[0].IP) > 0) {
					if (pingReply.search('Unreachable') > 0) {
						this.vm1_ping = null;
					} else {
						this.vm1_lastPingTime = new Date().getTime();
					this.vm1_ping = pingReply.replace(/.*time=(.*)/, '$1');
					}
				}
				if (pingReply.search(this.VM_config[1].IP) > 0) {
					if (pingReply.search('Unreachable') > 0) {
						this.vm2_ping = null;
					} else {
						this.vm2_lastPingTime = new Date().getTime();
						this.vm2_ping = pingReply.replace(/.*time=(.*)/, '$1');
					}
				}
			}
		});

		this.socketService.onEvent(Event.CONNECT)
		.subscribe(() => {
			// Once connected to server, send the interval to start pinging the VMs
		});

		this.socketService.onEvent(Event.DISCONNECT)
		.subscribe(() => {
			this.socketService.stopPing();
			console.log('disconnected');
			this.vm1_ping = null;
			this.vm2_ping = null;
		});
	}
	public onSubmit() {
		this.socketService.stopPing();
		this.interval = this.form.value.interval;
		this.startVM1ServicePing();
		this.startVM2ServicePing();
		this.socketService.getPing({
			interval: this.interval
		});
	}
	public stop_vm1_refresher() {
		this.vm1_rand = null;
		this.vm1_refresher.forEach((interval) => clearInterval(interval));
	}
	public stop_vm2_refresher() {
		this.vm2_rand = null;
		this.vm2_refresher.forEach((interval) => clearInterval(interval));
	}
	ngOnInit() {
		this.form = this.fb.group({
			interval: ['', [ Validators.required, Validators.min(0.2) ]],
		});
		this.fetchVMIPs();
		this.initIoConnection();
	}
	constructor(
		private http: HttpClient,
		private fb: FormBuilder,
		private socketService: SocketService
	) { }
	private fetchVMIPs() {
		this.http.get(`${this.vm3}/getIP`)
			.toPromise()
			.then((data: any) => {
				console.log(data);
				this.VM_config = data.config;
			})
			.catch((err) => {
				alert('Couldn\'t connect to VM3 to fetch IP Addresses of VM1 and VM2');
				console.error(err);
			});
	}
	private startVM1ServicePing() {
		this.vm1_refresher.forEach((interval) => clearInterval(interval));
		const r1 = setInterval(() => {
			this.http.get(this.vm1)
				.pipe(
					timeout(1000),
					catchError(err => {
						this.vm1_rand = null;
						return Promise.reject(err);
					})
				)
				.subscribe(
					(val: any) => {
						console.log(val);
						this.vm1_rand = val.randVal;
					},
					(error) => {
						this.vm1_rand = null;
						/*console.error(error);*/
					});
		}, this.interval * 1000);
		this.vm1_refresher.push(r1);
	}

	private startVM2ServicePing() {
		this.vm2_refresher.forEach((interval) => clearInterval(interval));

		const r2 = setInterval(() => {
			this.http.get(this.vm2)
				.pipe(
					timeout(1000),
					catchError(err => {
						this.vm2_rand = null;
						throw err;
					})
				)
				.subscribe(
					(val: any) => {
						console.log(val);
						this.vm2_rand = val.randVal;
					},
					(error) => {
						this.vm2_rand = null;
						console.error(error);
					});
		}, this.interval * 1000);
		this.vm2_refresher.push(r2);
	}
}
