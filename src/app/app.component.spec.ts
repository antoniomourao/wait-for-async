import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component Unit Testing', () => {
  let component: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('RQ01 - should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`RQ02 - should have as title 'wait-for-async'`, () => {
    expect(component.title).toEqual('wait-for-async');
  });

  it('RQ03 - should render title', () => {
    // triggers a change detection cycle for the component
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome wait-for-async'
    );
  });

  it('RQ04 - should increment and decrement value', fakeAsync(() => {
    component.increment();
    flush();
    expect(component.value).toEqual(1);

    component.decrement();
    flush();
    expect(component.value).toEqual(0);
  }));

  it('RQ05 - should increment value in template', fakeAsync(() => {
    fixture.detectChanges();
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();
    const value = debugElement.query(By.css('h2')).nativeElement.innerHTML;

    expect(value).toEqual('1');
  }));

  it('RQ06 - should stop at 0 and show minimum message', fakeAsync(() => {
    debugElement
      .query(By.css('button.decrement'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();

    const message = debugElement.query(By.css('p.message')).nativeElement
      .innerHTML;

    expect(component.value).toEqual(0);
    expect(message).toContain('Minimum');
  }));

  it('RQ07 - should stop at 5 and show maximum message', fakeAsync(() => {
    fixture.componentInstance.value = 5;
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();
    const message = debugElement.query(By.css('p.message')).nativeElement
      .innerHTML;

    expect(component.value).toEqual(5);
    expect(message).toContain('Maximum');
  }));

  it('RQ08 - should display Async title', waitForAsync(() => {
    fixture.debugElement
      .query(By.css('.set-title'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const value = fixture.debugElement.query(By.css('h1')).nativeElement
        .innerHTML;
      expect(value).toEqual('Welcome Async Title!');
    });
  }));

  it('RQ08 - should display Async title', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('.set-title'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();
    const value = fixture.debugElement.query(By.css('h1')).nativeElement
      .innerHTML;
    expect(value).toEqual('Welcome Async Title!');
  }));

  it('RQ09 - should display Async title with settimeout', waitForAsync(() => {
    fixture.debugElement
      .query(By.css('.set-title-with-settimeout'))
      .triggerEventHandler('click', null);

    //
    // Test FAILS with waitForAsync
    //
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const value = fixture.debugElement.query(By.css('h1')).nativeElement
        .innerHTML;
      expect(value).not.toEqual('Welcome Async Title!');
    });
  }));

  it('RQ09 - should display Async title with settimeout', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('.set-title-with-settimeout'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();
    const value = fixture.debugElement.query(By.css('h1')).nativeElement
      .innerHTML;
    expect(value).toEqual('Welcome Async Title!');
  }));

});
