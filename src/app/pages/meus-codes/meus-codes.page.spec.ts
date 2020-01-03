import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeusCodesPage } from './meus-codes.page';

describe('MeusCodesPage', () => {
  let component: MeusCodesPage;
  let fixture: ComponentFixture<MeusCodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusCodesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusCodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
