import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PageTitleComponent } from './../shared/components/page-title/page-title.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent, PageTitleComponent],
            imports: [TranslateModule.forRoot(), RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set title', () => {
        const dir = fixture.debugElement.query(By.directive(PageTitleComponent));
        const dirInstance = dir.injector.get(PageTitleComponent);

        expect(dirInstance.title).toBe('PAGES.HOME.TITLE');
    });

    it('should contain button with link to detail page', () => {
        const btn = fixture.debugElement.query(By.css('button.btn.btn-sm.btn-outline')).nativeElement;

        expect(fixture.nativeElement.querySelectorAll('button.btn.btn-sm.btn-outline').length).toEqual(1);
        expect(btn.getAttribute('routerLink')).toEqual('/detail');
        expect(btn.innerText).toEqual('PAGES.HOME.GO_TO_DETAIL');
    });
});
