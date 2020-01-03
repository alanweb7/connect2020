import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentoCodePage } from './documento-code.page';

describe('DocumentoCodePage', () => {
  let component: DocumentoCodePage;
  let fixture: ComponentFixture<DocumentoCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentoCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
