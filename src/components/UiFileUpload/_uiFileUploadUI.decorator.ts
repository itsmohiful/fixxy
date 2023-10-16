import { AxiosInstance } from 'axios';
import { IUImageAllowProps } from './index';

export type _TUiFileUploadHookProps = {
  server: AxiosInstance;
  onChange?: (fileName: string, inputName: string) => void;
  afterChange?: (event: any) => void;
  isDemo?: boolean;
  allowFiles?: IUImageAllowProps[];
  maxAllowSize?: number;
  originalFileName?: string | string[];
};

export type _TUpUploadState = {
  isComplete: boolean;
  isLoading: boolean;
  uploadedAmount: number;
  isFailed: boolean;
};

export const _TUpUploadStateInitialValue = {
  isComplete: false,
  isLoading: false,
  uploadedAmount: 0,
  isFailed: false,
};
