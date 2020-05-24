/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-console: 0 */
import { Injectable } from '@angular/core';

import { application } from '../../../../environments/application';
import { environment } from '../../../../environments/environment';
import { ClassUtilities } from '../../helpers/class-utilities';

const getLogLevel = (logLevel: string): number => {
    switch (logLevel) {
        case 'ALL':
            return 1;
        case 'DEBUG':
            return 2000;
        case 'INFO':
            return 3000;
        case 'WARN':
            return 4000;
        case 'ERROR':
            return 5000;
        case 'FATAL':
            return 6000;
        case 'OFF':
            return 0;
        default:
            return 1;
    }
};

export interface LoggingServiceInterface {
    debug(logObject: object, e?: any): void;
    info(logObject: object, e?: any): void;
    warn(logObject: object, e?: any): void;
    error(logObject: object, e?: any): void;
    fatal(logObject: object, e?: any): void;
}

@Injectable()
export class LoggingService implements LoggingServiceInterface {
    debugLevel: number;
    infoLevel: number;
    warnLevel: number;
    errorLevel: number;
    fatalLevel: number;

    constructor() {
        this.configure();
    }

    public debug(logger: any, logObject: object | string): void {
        this.log(logger, this.debugLevel, logObject);
    }
    public info(logger: any, logObject: object | string): void {
        this.log(logger, this.infoLevel, logObject);
    }
    public warn(logger: any, logObject: object | string): void {
        this.log(logger, this.warnLevel, logObject);
    }
    public error(logger: any, logObject: object | string): void {
        this.log(logger, this.errorLevel, logObject);
    }
    public fatal(logger: any, logObject: object | string): void {
        this.log(logger, this.fatalLevel, logObject);
    }

    private configure(): void {
        this.debugLevel = getLogLevel('DEBUG');
        this.infoLevel = getLogLevel('INFO');
        this.warnLevel = getLogLevel('WARN');
        this.errorLevel = getLogLevel('ERROR');
        this.fatalLevel = getLogLevel('FATAL');
    }

    private readonly getLoggerName = (logger: any): string => {
        let loggerName = '';
        if (logger) {
            if (typeof logger === 'string') {
                loggerName = logger;
            } else {
                loggerName = ClassUtilities.getClassNameFor(logger);
            }
        }
        return loggerName;
    };

    private readonly log = (logger: any, level: number, logObject: any): void => {
        const loggerName = this.getLoggerName(logger);
        if (typeof logObject === 'string') {
            logObject = `${loggerName}: ${logObject}; (appVersion: ${application.version}, clientUrl: ${location.href})`;
        } else if (typeof logObject === 'object') {
            logObject = `${loggerName}: ${JSON.stringify(logObject)}; (appVersion: ${application.version}, clientUrl: ${
                location.href
            })`;
        }
        const logLevel = getLogLevel(environment.logLevel);
        if (logLevel === 0 || level < logLevel) {
            return;
        }
        switch (level) {
            case this.debugLevel:
            case this.infoLevel:
                console.log(`${logObject}`);
                break;
            case this.warnLevel:
                console.warn(`${logObject}`);
                break;
            case this.errorLevel:
            case this.fatalLevel:
                console.error(`${logObject}`);
                break;
        }
    };
}
