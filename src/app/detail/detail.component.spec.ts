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

    it('should contain button with link to home page', () => {
        const btn = fixture.debugElement.query(By.css('button.btn.btn-sm.btn-outline')).nativeElement;

        expect(fixture.nativeElement.querySelectorAll('button.btn.btn-sm.btn-outline').length).toEqual(1);
        expect(btn.getAttribute('routerLink')).toEqual('/');
        expect(btn.innerText).toEqual('PAGES.DETAIL.BACK_TO_HOME');
    });
});
