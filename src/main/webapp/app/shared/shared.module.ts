import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    VpltreeviewapplicationSharedLibsModule,
    VpltreeviewapplicationSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';

import { VpltreeviewapplicationMaterialModule } from '../VpltreeviewapplicationMaterial.module';

@NgModule({
    imports: [VpltreeviewapplicationSharedLibsModule, VpltreeviewapplicationSharedCommonModule, VpltreeviewapplicationMaterialModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        VpltreeviewapplicationSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        VpltreeviewapplicationMaterialModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VpltreeviewapplicationSharedModule {
    static forRoot() {
        return {
            ngModule: VpltreeviewapplicationSharedModule
        };
    }
}
