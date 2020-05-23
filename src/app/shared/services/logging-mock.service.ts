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

    constructor() {
    }

    public debug(logger: any, logObject: object | string): void {
    }
    public info(logger: any, logObject: object | string): void {
    }
    public warn(logger: any, logObject: object | string): void {
    }
    public error(logger: any, logObject: object | string): void {
    }
    public fatal(logger: any, logObject: object | string): void {
    }
}
