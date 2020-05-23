import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components';
import { LoggingService } from './services';
import { ElectronService } from './services/electron/electron.service';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, FormsModule],
  providers: [
    ElectronService,
    LoggingService
  ]
})
export class SharedModule { }
