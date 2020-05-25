import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageTitleComponent, SpinnerComponent } from './components';

@NgModule({
    imports: [CommonModule, TranslateModule, FormsModule],
    declarations: [SpinnerComponent, PageTitleComponent],
    exports: [TranslateModule, FormsModule, SpinnerComponent, PageTitleComponent],
})
export class SharedModule {}
