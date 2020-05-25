import { ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../../../environments/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logger(reducer: ActionReducer<any>): any {
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];
