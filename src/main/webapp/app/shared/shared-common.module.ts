import { NgModule } from '@angular/core';

import { VpltreeviewapplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [VpltreeviewapplicationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [VpltreeviewapplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class VpltreeviewapplicationSharedCommonModule {}
