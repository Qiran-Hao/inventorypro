import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Pages
import { AddItemPage } from './pages/add-item/add-item.page';
import { InventoryListPage } from './pages/inventory-list/inventory-list.page';
import { UpdateItemPage } from './pages/update-item/update-item.page';
import { PrivacyPage } from './pages/privacy/privacy.page';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AddItemPage,
    InventoryListPage,
    UpdateItemPage,
    PrivacyPage
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
