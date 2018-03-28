import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';

import { CoreModule } from './core/core.module';

import { routes } from './routes';
import { reducers, metaReducers } from './reducers';
import { SearchEffects } from './core/effects/search.effects';
import { LayoutEffects } from './core/effects/layout.effects';

import { AppComponent } from './core/containers/app';
import { environment } from '../environments/environment';
import { ProductsService } from './core/services/products.service';
import { DashboardGuard } from './core/services/dashboard.guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),


    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([SearchEffects, LayoutEffects]),

    CoreModule.forRoot(),
  ],
  providers: [ProductsService, DashboardGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
