import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IncrementDecrementService } from './services/increment-decrement.service';

describe('Component Unit Testing', () => {
  let component: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcomeComponent, RouterTestingModule],
      providers: [IncrementDecrementService],
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

  it('RQ01 - should create the app', () => {
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
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();

    const element = debugElement.query(By.css('h2'));
    expect(element).toBeDefined();

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

  it('RQ07 - should stop at 15 and show maximum message', fakeAsync(() => {
    fixture.componentInstance.value = 15;
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();

    const message = debugElement.query(By.css('p.message')).nativeElement
      .innerHTML;

    expect(component.value).toEqual(15);
    expect(message).toContain('Maximum');
  }));

  it('RQ08 - should display Async title', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);

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
    const fixture = TestBed.createComponent(AppComponent);

    fixture.debugElement
      .query(By.css('.set-title'))
      .triggerEventHandler('click', null);

    flush();
    fixture.detectChanges();
    const value = fixture.debugElement.query(By.css('h1')).nativeElement
      .innerHTML;
    expect(value).toEqual('Welcome Async Title!');
  }));
});
