import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GatewayComponent } from './gateway.component';
import { LoginComponent } from './_components/login/login.component';

const GatewayRoutes: Routes = [
    {
        path: '',
        component: GatewayComponent,
        children: [

            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];

// Export the Gateway Routing Module
export const GatewayRouting: ModuleWithProviders = RouterModule.forChild(GatewayRoutes);
