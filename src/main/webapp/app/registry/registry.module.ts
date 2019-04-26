import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VpltreeviewapplicationSharedModule } from 'app/shared';
import { RegistryComponent } from './registry.component';
import { REG_ROUTE } from './registry.route';

@NgModule({
    imports: [VpltreeviewapplicationSharedModule, RouterModule.forChild([REG_ROUTE])],
    declarations: [RegistryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VpltreeviewapplicationRegModule {}
