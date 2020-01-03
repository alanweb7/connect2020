import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContatoCodePage } from './contato-code.page';

describe('ContatoCodePage', () => {
  let component: ContatoCodePage;
  let fixture: ComponentFixture<ContatoCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
