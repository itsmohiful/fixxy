import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  _TUiFileUploadHookProps,
  _TUpUploadState,
  _TUpUploadStateInitialValue,
} from './_uiFileUploadUI.decorator';

interface IUiFileUploadAllowExtensions {
  Image: string[];
  PDF: string[];
  Excel: string[];
  Doc: string[];
  CSV: string[];
  ZIP: string[];
}

export const IUiFileUploadAllowExtensions: IUiFileUploadAllowExtensions = {
  Image: ['jpeg', 'jpg', 'png', 'gif', 'heic', 'heif'],
  PDF: ['pdf'],
  Excel: ['xlsx'],
  Doc: ['docx', 'pptx', 'doc', 'pptx'],
  CSV: ['csv'],
  ZIP: ['zip'],
};
export default function useUiFileUploadHook(props: _TUiFileUploadHookProps) {
  const uploadFileInputRef = useRef<null | HTMLInputElement>(null);
  const [getOriginalFileInfo, setOriginalFileInfo] = useState({
    name: '',
  });

  useEffect(() => {
    // console.log('originalFileName useUiFileUploadHook', props.originalFileName);
    setOriginalFileInfo((prevState) => ({
      ...prevState,
      name: props.originalFileName || '',
    }));
  }, [props.originalFileName]);

  const SwalBar = withReactContent(Swal);

  const {
    server,
    onChange,
    afterChange,
    allowFiles = ['Image', 'PDF', 'Excel', 'Doc', 'CSV'],
    maxAllowSize = Number(process.env['FILE_UPLOAD_MAX_SIZE']),
    isDemo = false,
  } = props;

  const [uploadState, setUploadState] = useState<_TUpUploadState>(
    _TUpUploadStateInitialValue
  );

  const config = {
    onUploadProgress: function (progressEvent: {
      loaded: number;
      total: number;
    }) {
      const percentCompleted = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      setUploadState((prevState) => ({
        ...prevState,
        uploadedAmount: percentCompleted,
      }));
    },
  };

  const request = (data: FormData) => {
    if (isDemo) {
      return server.get('', {
        onUploadProgress: config.onUploadProgress,
      });
    }
    return server.post('', data, config);
  };

  const makeFileUrl = (fileName: string) => {
    if (isDemo) return 'https://via.placeholder.com/300/09f/fff.png';
    return `${process.env['FILE_SERVER_URL']}/storage/api/v1/file/${fileName}?downloadable=false`;
  };

  const fileOnUpload = (e: any) => {
    const fileName = e.target.name;
    const value = e.target.files[0];
    if (uploadFileInputRef.current) {
      uploadFileInputRef.current.value = '';
    }

    if (value) {
      const nameSplit = value.name.split('.');

      // catch extension
      const ext = String(nameSplit[nameSplit?.length - 1]).toLowerCase();

      // file size convert to mb
      const sizeToMb = value.size / (1024 * 1024);

      // allow file types
      let allowFileTypes = IUiFileUploadAllowExtensions['Image'];

      if (allowFiles) {
        allowFileTypes = allowFiles.reduce((accu: string[], file) => {
          return [...accu, ...IUiFileUploadAllowExtensions[file]];
        }, []);
      }

      // check file type
      if (!allowFileTypes.some((ele) => ele === ext)) {
        const allowFileTypesString = allowFiles.join(', ');
        /*  enqueueSnackbar(`Only ${allowFileTypesString} are allowed!`, {
                          variant: 'error',
                        }); */
        SwalBar.fire({
          icon: 'error',
          title: `Only ${allowFileTypesString} are allowed!`,
          timer: 3000,
          showConfirmButton: false,
        });
        return;
      }

      // max allow MB
      if (sizeToMb > maxAllowSize) {
        if (maxAllowSize < 1) {
          // enqueueSnackbar(`File max size is ${maxAllowSize * 1000} KB`, {
          //   variant: 'error',
          // });
          SwalBar.fire({
            icon: 'error',
            title: `File max size is ${maxAllowSize * 1000} KB`,
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          // enqueueSnackbar(`File max size is ${maxAllowSize} MB`, {
          //   variant: 'error',
          // });
          SwalBar.fire({
            icon: 'error',
            title: `File max size is ${maxAllowSize} MB`,
            timer: 3000,
            showConfirmButton: false,
          });
        }
        return;
      }

      setUploadState((_prevState) => ({
        ..._TUpUploadStateInitialValue,
        uploadedAmount: 0,
        isLoading: true,
      }));

      const data = new FormData();
      data.append('file', value);
      request(data)
        .then((res) => {
          onChange && onChange(res.data.name, fileName);
          afterChange && afterChange({ data: res.data, fieldName: fileName });
          setOriginalFileInfo((prevState) => ({
            ...prevState,
            name: res.data.originalFilename,
          }));
          setUploadState((_prevState) => ({
            ..._TUpUploadStateInitialValue,
            isComplete: true,
          }));
        })
        .catch((_error: AxiosError) => {
          setUploadState((_prevState) => ({
            ..._TUpUploadStateInitialValue,
            isFailed: true,
          }));
        })
        .finally(() => {
          e.target.value = null;
        });
    }
  };

  return {
    uploadState,
    fileOnUpload,
    makeFileUrl,
    uploadFileInputRef,
    getOriginalFileInfo,
  };
}
