import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login-component/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUnitsComponent } from './list-units/list-units.component';
import { TokenInterceptor } from './services/tokenInterceptor';
import { UnitComponent } from './unit/unit.component';
import { AlertComponent } from './alert/alert.component';
import { FilterPipe } from './utilities/filter.pipe';
import { SortByPipe } from './utilities/sortby.pipe';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { SummaryPipe } from './utilities/summary.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUnitsComponent,
    UnitComponent,
    AlertComponent,
    FilterPipe,
    SortByPipe,
    SummaryPipe,
    ReviewDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InfiniteScrollModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent},
      { path: 'listUnits', component: ListUnitsComponent}
    ])
  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
