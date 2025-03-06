import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component'; // Nuevo componente
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './features/tasks/tasks.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    MainComponent, // Declarar el nuevo componente
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TasksModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [MainComponent], // Usar el nuevo componente como bootstrap
})
export class AppModule {}
