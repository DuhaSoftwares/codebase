import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogHandlerService } from './services/log-handler.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeftSideMenuComponent } from './components/internal/left-side-menu/left-side-menu.component';
import { RightSideMenuComponent } from './components/internal/right-side-menu/right-side-menu.component';
import { TopNavComponent } from './components/internal/top-nav/top-nav.component';
import { SpinnerComponent } from './components/internal/spinner/spinner.component';
import { FooterComponent } from './components/internal/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LeftSideMenuComponent,
    RightSideMenuComponent,
    TopNavComponent,
    SpinnerComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: LogHandlerService
    },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
