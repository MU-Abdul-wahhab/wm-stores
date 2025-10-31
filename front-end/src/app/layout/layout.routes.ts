import { Routes } from '@angular/router';

import {HomeComponent} from '../features/home/home.component';
import {CartComponent} from '../features/carts/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Evara - Home' },
            { path: 'cart', component: CartComponent, title: 'Evara - Cart'},
            // { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];
