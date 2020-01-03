import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuCodePage } from './menu-code.page';

describe('MenuCodePage', () => {
  let component: MenuCodePage;
  let fixture: ComponentFixture<MenuCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
