import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AlertTemplatesState } from './alert-templates.state';
import { AlertTemplatesAction } from './alert-templates.actions';

describe('AlertTemplates actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AlertTemplatesState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new AlertTemplatesAction('item-1'));
    store
      .select((state) => state.alertTemplates.items)
      .subscribe((items: string[]) => {
        expect(items).toEqual(jasmine.objectContaining(['item-1']));
      });
  });
});
