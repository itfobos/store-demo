import { SimpleGenericStore } from './simple-generic-store';
import { of, Subject, throwError } from 'rxjs';
import { DataState } from '../../common/data-state.enum';

describe('SimpleGenericStore', () => {

  it(`data is received correctly`, () => {
    const srcNumber = 18;
    const store = new SimpleGenericStore<number>(() => of(srcNumber));
    expect(store.value).toEqual(srcNumber);
  });

  it(`data is refreshed correctly`, () => {
    let producedNumber = 18;
    const store = new SimpleGenericStore<number>(() => of(producedNumber));

    producedNumber = 205;
    store.refresh();

    expect(store.value).toEqual(producedNumber);
  });

  it(`initial data state is [Loading]`, () => {
    const dataSubject = new Subject<number>();
    const store = new SimpleGenericStore<number>(() => dataSubject);
    expect(store.dataState).toEqual(DataState.Loading);
  });

  it(`data state is changed correctly from [Loading] to [Received]`, () => {
    const dataSubject = new Subject<number>();
    const store = new SimpleGenericStore<number>(() => dataSubject);
    expect(store.dataState).toEqual(DataState.Loading);

    dataSubject.next(123);
    expect(store.dataState).toEqual(DataState.Received);
  });

  it(`data state is changed correctly from [Loading] to [Error]`, () => {
    const dataSubject = new Subject<number>();
    const store = new SimpleGenericStore<number>(() => dataSubject);
    expect(store.dataState).toEqual(DataState.Loading);

    dataSubject.error('A really awful error');
    expect(store.dataState).toEqual(DataState.Error);
  });

  it(`data state is changed correctly from [Loading] to [Error]`, () => {
    const dataSubject = new Subject<number>();
    const store = new SimpleGenericStore<number>(() => dataSubject);
    expect(store.dataState).toEqual(DataState.Loading);

    dataSubject.next();
    expect(store.dataState).toEqual(DataState.NotFound);
  });

  it(`a error should be thrown if no data is provided`, () => {
    const store = new SimpleGenericStore<number>(() => throwError('a error'));

    expect(() => {
      return store.value;
    }).toThrow();
  });

  it(`data optional should be empty if no data is provided`, () => {
    const store = new SimpleGenericStore<number>(() => throwError('a error'));

    expect(store.data.isEmpty).toBeTruthy();
  });

  it(`data state events are received correctly`, () => {
    const store = new SimpleGenericStore<number>(() => of(123));
    store.dataState$.subscribe((dataState) => expect(dataState).toEqual(DataState.Received));
  });
});
