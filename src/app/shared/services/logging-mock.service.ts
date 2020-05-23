/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';

import { LoggingServiceInterface } from './logging.service';


@Injectable()
export class LoggingMockService implements LoggingServiceInterface {

    public loggerName: string;
    traceLevel: number;
    debugLevel: number;
    infoLevel: number;
    warnLevel: number;
    errorLevel: number;
    fatalLevel: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public debug(logger: any, logObject: object | string): void {
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public info(logger: any, logObject: object | string): void {
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public warn(logger: any, logObject: object | string): void {
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public error(logger: any, logObject: object | string): void {
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public fatal(logger: any, logObject: object | string): void {
    }
}
