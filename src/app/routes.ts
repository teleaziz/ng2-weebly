import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import { DashboardPageComponent } from './core/containers/dashboard-page';
import { DashboardGuard } from './core/services/dashboard.guard'

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard],
    component: DashboardPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
