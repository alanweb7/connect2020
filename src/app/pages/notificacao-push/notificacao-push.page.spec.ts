import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificacaoPushPage } from './notificacao-push.page';

describe('NotificacaoPushPage', () => {
  let component: NotificacaoPushPage;
  let fixture: ComponentFixture<NotificacaoPushPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacaoPushPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacaoPushPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
