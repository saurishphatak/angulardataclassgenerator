import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatExpansionModule } from "@angular/material/expansion";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CsharpFormComponent } from './csharp-form/csharp-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CsharpFieldDetailsListComponent } from './csharp-field-details-list/csharp-field-details-list.component';
import { ClassDetailsFormHostDirective } from './Directives/class-details-form-host.directive';
import { CsharpClassDetailsFormComponent } from './csharp-class-details-form/csharp-class-details-form.component';
import { FieldDetailsFormHostDirective } from './Directives/field-details-form-host.directive';
import { FieldDetailsListHostDirective } from './Directives/field-details-list-host.directive';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
@NgModule({
  declarations: [
    AppComponent,
    CsharpFormComponent,
    FieldDetailsFormHostDirective,
    FieldDetailsListHostDirective,
    CsharpFieldDetailsListComponent,
    ClassDetailsFormHostDirective,
    CsharpClassDetailsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
