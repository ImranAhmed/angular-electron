import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PageTitleComponent } from './../shared/components/page-title/page-title.component';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailComponent, PageTitleComponent],
            imports: [TranslateModule.forRoot(), RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set title', () => {
        const dir = fixture.debugElement.query(By.directive(PageTitleComponent));
        const dirInstance = dir.injector.get(PageTitleComponent);

        expect(dirInstance.title).toBe('PAGES.DETAIL.TITLE');
    });
});
