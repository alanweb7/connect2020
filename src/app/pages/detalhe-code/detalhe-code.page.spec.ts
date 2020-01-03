import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalheCodePage } from './detalhe-code.page';

describe('DetalheCodePage', () => {
  let component: DetalheCodePage;
  let fixture: ComponentFixture<DetalheCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
