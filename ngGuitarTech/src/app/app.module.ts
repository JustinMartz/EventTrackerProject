import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UpdateGuitarComponent } from './components/update-guitar/update-guitar.component';
import { GuitarDetailComponent } from './components/guitar-detail/guitar-detail.component';
import { CreateGuitarComponent } from './components/create-guitar/create-guitar.component';
import { SetupDetailComponent } from './components/setup-detail/setup-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpdateGuitarComponent,
    GuitarDetailComponent,
    CreateGuitarComponent,
    SetupDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
