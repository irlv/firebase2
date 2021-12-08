import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'carousel',
        loadChildren: () => import('../carousel/carousel.module').then( m => m.CarouselPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
      },{
        path: 'edit-user',
        loadChildren: () => import('../edit-user/edit-user.module').then( m => m.EditUserPageModule)
      },  {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
