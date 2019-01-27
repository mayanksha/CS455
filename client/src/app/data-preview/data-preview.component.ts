import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Feedbacks {
	response1_avg: number;
	response2_avg: number;
	response3_avg: number;
	response4_avg: number;
	textMessages: string[];
}
@Component({
	selector: 'app-data-preview',
	templateUrl: './data-preview.component.html',
	styleUrls: ['./data-preview.component.css']
})
export class DataPreviewComponent implements OnInit {
	panelOpenState = false;
	feedbacks: Feedbacks;
	messages: string[];
	displayedColumns: string[] = ['question', 'response'];
	queries = [
		{
			question: 'Are you satisfied overall with our products?',
			response: 3
		},
		{
			question: 'Do you find our products easy to use?',
			response: 3
		},
		{
			question: 'How much impact our products have made on your daily routine?',
			response: 3
		},
		{
			question: 'Would you recommend our products to your friends and family?',
			response: 3
		}];
	constructor(private http: HttpClient) { }
	getEndPoint = 'http://localhost:9000/getFeedbacks';
	ngOnInit() {
		this.http.get(this.getEndPoint)
			.toPromise()
			.then((response: Feedbacks) => {
				for (let i = 1; i < this.queries.length; i++) {
					this.queries[i - 1].response = response[`response${i}_avg`].toFixed(1);
				}
				this.messages = response.textMessages;
				console.log(this.messages);
				console.log(this.queries);
			})
			.catch(console.error);
	}

}
