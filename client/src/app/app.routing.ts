import { Routes } from '@angular/router';

const Routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canDeactivate: isAuthenticatedGuard }
]