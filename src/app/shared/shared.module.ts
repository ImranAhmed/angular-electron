import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoggingService } from './services';
import { ElectronService } from './services/electron/electron.service';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule],
  declarations: [],
  providers: [
    ElectronService,
    LoggingService
  ],
  exports: [TranslateModule, FormsModule]
})
export class SharedModule { }
