import * as winston from 'winston';

import { CloudWatch, CloudWatchLogs } from 'aws-sdk';

interface CloudWatchIntegration {
  upload(aws: CloudWatchLogs, groupName: string, streamName: string, cb: ((err: Error, data: any) => void)): void;
  getToken(aws: CloudWatchLogs, groupName: string, streamName: string, cb: ((err: Error, data: string) => void)): void;
  ensureGroupPresent(aws: CloudWatchLogs, name: string, cb: ((err: Error, data: boolean) => void)): void;
  getStream(aws: CloudWatchLogs, groupName: string, streamName: string, cb: ((err: Error, data: CloudWatchLogs.Types.DescribeLogStreamsResponse) => void)): void;
  ignoreInProgress(cb: ((err: Error, data: boolean) => void)): void;
}

declare namespace winston {

  export interface CloudwatchTransportOptions {
    level?: string;
    logGroupName?: string | (() => string);
    logStreamName?: string | (() => string);
    awsAccessKeyId?: string;
    awsSecretKey?: string;
    awsRegion?: string;
    awsOptions?: CloudWatch.Types.ClientConfiguration;
    jsonMessage?: boolean;
    messageFormatter?: winston.LogMethod;
    proxyServer?: string;
    uploadRate?: number;
    errorHandler?: ((err: Error) => void);
  }

  export type TransportOptions = winston.TransportOptions | CloudwatchTransportOptions;

  export interface CloudwatchTransportInstance extends winston.TransportInstance {


    new(options?: CloudwatchTransportOptions): CloudwatchTransportInstance;
  }

  export interface Transports {
    CloudWatch: CloudwatchTransportInstance
  }
}