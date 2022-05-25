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
import { FieldDetailsFormHostDirective } from './field-details-form-host.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FieldDetailsListHostDirective } from './field-details-list-host.directive';
import { CsharpFieldDetailsListComponent } from './csharp-field-details-list/csharp-field-details-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CsharpFormComponent,
    FieldDetailsFormHostDirective,
    FieldDetailsListHostDirective,
    CsharpFieldDetailsListComponent
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
    MatButtonToggleModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
