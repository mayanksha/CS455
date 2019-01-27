import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FormArray,
	FormGroup,
	FormBuilder,
	Validators,
	ValidatorFn,
	FormControl,
	NgForm,
	FormGroupDirective
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
	form: FormGroup;
	// 0 = showForm, 1 = Success, 2 = Failure
	success = 0;
	httpOptions = {
		headers : new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'http://localhost:8000/*'
		})
	};

	postEndpoint = 'http://localhost:9000/createFeedback/';
	constructor (
		private http: HttpClient,
		private fb: FormBuilder
	) {}

	/*emailFormControl = new FormControl('', [
	 *  Validators.email,
	 *  Validators.required,
	 *]);*/

	ngOnInit() {
		this.form = this.fb.group({
			response1: ['3', Validators.required],
			response2: ['3', Validators.required],
			response3: ['3', Validators.required],
			response4: ['3', Validators.required],
			textMessage: ['', Validators.maxLength(500)],
		});
	}

	onSubmit() {
		return this.http.post(this.postEndpoint, this.form.value).toPromise().then(val => {
				this.success = 1;
				console.log('Value Posted Successfully');
			}
		)
		.catch(err => {
			this.success = 2;
		});
	}
}
