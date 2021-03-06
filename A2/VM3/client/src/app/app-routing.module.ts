import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPreviewComponent } from './data-preview/data-preview.component';
const routes: Routes = [
	{
		path: '',
		component: DataPreviewComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	providers: [],
	exports: [RouterModule]
})

export class AppRoutingModule {}
