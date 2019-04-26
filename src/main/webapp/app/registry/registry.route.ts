import { Route } from '@angular/router';

import { RegistryComponent } from './registry.component';

export const REG_ROUTE: Route = {
    path: 'registry',
    component: RegistryComponent,
    data: {
        authorities: []
        // pageTitle: 'home.title'
    }
};
