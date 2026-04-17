import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { InventoryListPage } from './pages/inventory-list/inventory-list.page';
import { AddItemPage } from './pages/add-item/add-item.page';
import { UpdateItemPage } from './pages/update-item/update-item.page';
import { PrivacyPage } from './pages/privacy/privacy.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory-list',
    pathMatch: 'full'
  },
  {
    path: 'inventory-list',
    component: InventoryListPage
  },
  {
    path: 'add-item',
    component: AddItemPage
  },
  {
    path: 'update-item',
    component: UpdateItemPage
  },
  {
    path: 'privacy',
    component: PrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}