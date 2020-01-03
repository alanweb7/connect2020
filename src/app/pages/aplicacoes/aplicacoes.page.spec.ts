import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AplicacoesPage } from './aplicacoes.page';

describe('AplicacoesPage', () => {
  let component: AplicacoesPage;
  let fixture: ComponentFixture<AplicacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AplicacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
