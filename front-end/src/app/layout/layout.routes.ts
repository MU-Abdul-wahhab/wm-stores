import { Routes } from '@angular/router';

import {HomeComponent} from '../features/home/home.component';
import {CartComponent} from '../features/carts/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'cart', component: CartComponent},
            // { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];
