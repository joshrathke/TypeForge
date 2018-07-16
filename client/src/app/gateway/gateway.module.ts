import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatInputModule } from '@angular/material';
import { GatewayComponent } from './gateway.component';
import { GatewayRouting } from './gateway.routing';
import { LoginComponent } from './_components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    GatewayRouting,
    /** Angular Flex Layout Module */
    FlexLayoutModule,
    /** Angular Material Module */
    MatCardModule,
    MatInputModule,
  ],
  declarations: [
    GatewayComponent,
    LoginComponent
  ]
})
export class GatewayModule { }
