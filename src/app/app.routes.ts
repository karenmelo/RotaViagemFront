import { RouterModule, Routes } from '@angular/router';
import { RotasComponent } from './components/rotas/rotas.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'rotas', pathMatch: 'full' },
  { path: 'rotas', component: RotasComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  

})
export class AppRoutingModule  
 { }
