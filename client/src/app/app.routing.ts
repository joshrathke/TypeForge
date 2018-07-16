import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const AppRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'gateway', loadChildren: './gateway/gateway.module#GatewayModule', /* canDeactivate: isAuthenticatedGuard */ }
];

// Export The App Routing Module
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);