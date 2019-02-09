import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { DataPreviewComponent } from './data-preview/data-preview.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
	declarations: [
		AppComponent,
		DataPreviewComponent,
		TopbarComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		FlexLayoutModule,
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
		SocketService
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
