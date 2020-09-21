import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Function, isNotNullOrUndefined, Optional, Producer } from '@eastbanctech/ts-optional';
import { DataState } from './data-state.enum';

export interface GenericStore<T> {
  readonly data: Optional<T>;
  readonly value: T;
  readonly dataState$: Observable<DataState>;
  readonly dataState: DataState;

  refresh(): void;
}

export class SimpleGenericStore<T> implements GenericStore<T> {
  protected readonly dataStateSubject: BehaviorSubject<DataState> = new BehaviorSubject<DataState>(DataState.NotRequested);
  protected dataInternal: Optional<T> = Optional.empty();

  private releaseSubscription = new Subscription();

  constructor(private readonly dataProducer: Producer<Observable<T>>,
              private readonly dataIsNotEmptyCheck: Function<T, boolean> = isNotNullOrUndefined) {
    this.refresh();
  }

  public refresh(): void {
    this.dataStateSubject.next(DataState.Loading);
    this.dataInternal = Optional.empty();
    this.releaseSubscription = new Subscription();

    const dataProducerSubscription = this.dataProducer().subscribe(
        (value: T) => {
          if (this.dataIsNotEmptyCheck(value)) {
            this.dataInternal = Optional.of(value);
            this.dataStateSubject.next(DataState.Received);
          } else {
            this.dataStateSubject.next(DataState.NotFound);
          }

          this.releaseSubscription.unsubscribe();
        },
        // tslint:disable-next-line:no-any
        (error: any) => {
          console.error(error);
          this.dataStateSubject.next(DataState.Error);
          this.releaseSubscription.unsubscribe();
        }
    );

    this.releaseSubscription.add(dataProducerSubscription);
  }

  public get data(): Optional<T> {
    return this.dataInternal;
  }

  public get value(): T {
    return this.dataInternal.orElseThrow(() => new Error('No any data allowed'));
  }

  get dataState$(): Observable<DataState> {
    return this.dataStateSubject;
  }

  public get dataState(): DataState {
    return this.dataStateSubject.value;
  }
}
