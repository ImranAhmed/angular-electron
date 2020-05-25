import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageTitleComponent, SpinnerComponent } from './components';
import { ElectronService, LoggingService } from './services';
import { CoreService } from './services/core/core.service';

@NgModule({
    imports: [CommonModule, TranslateModule, FormsModule],
    declarations: [SpinnerComponent, PageTitleComponent],
    providers: [ElectronService, LoggingService, CoreService],
    exports: [TranslateModule, FormsModule, SpinnerComponent, PageTitleComponent],
})
export class SharedModule {}
