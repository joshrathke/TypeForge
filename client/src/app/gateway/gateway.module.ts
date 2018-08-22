import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { GatewayComponent } from './gateway.component';
import { GatewayRouting } from './gateway.routing';
import { LoginComponent } from './_components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GatewayRouting,
    ReactiveFormsModule,
    /** Angular Flex Layout Module */
    FlexLayoutModule,
    /** Angular Material Module */
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  declarations: [
    GatewayComponent,
    LoginComponent
  ]
})
export class GatewayModule { }
