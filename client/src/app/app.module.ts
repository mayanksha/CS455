import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
	MatIconModule,
	MatToolbarModule,
	MatButtonModule,
	MatAutocompleteModule,
	MatInputModule,
	MatGridListModule,
	MatExpansionModule,
	MatCardModule,
	MatMenuModule,
	MatSidenavModule,
	MatSelectModule,
	MatRadioModule,
	MatDialogModule,
	MatProgressSpinnerModule,
	MatBadgeModule,
	MatSnackBarModule,
	MatCheckboxModule,
	MatTableModule,
	MatDividerModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*import { ErrorStateMatcher } from '@angular/material/core';*/
import { ReviewComponent } from './review/review.component';
import { DataPreviewComponent } from './data-preview/data-preview.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
	declarations: [
		AppComponent,
		ReviewComponent,
		DataPreviewComponent,
		TopbarComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatInputModule,
		FormsModule,
		MatGridListModule,
		MatExpansionModule,
		MatCardModule,
		MatMenuModule,
		MatSidenavModule,
		MatSelectModule,
		MatRadioModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatBadgeModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatTableModule,
		MatDividerModule
	],
	exports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatInputModule,
		FormsModule,
		MatGridListModule,
		MatExpansionModule,
		MatCardModule,
		MatMenuModule,
		MatSidenavModule,
		MatSelectModule,
		MatRadioModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatBadgeModule,
		MatCheckboxModule,
		MatSnackBarModule
	],
	providers: [
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
