import Add from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Delete from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import FileCopyOutlined from "@mui/icons-material/FileCopyOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Wallpaper from "@mui/icons-material/Wallpaper";
import { FormLabel } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { AxiosInstance } from "axios";
import * as React from "react";
import useUiFileUploadHook from "./_uiFileUploadUI.hook";
import {
  _uiFileProfilePicUploadStyle,
  _uiFileUploadProgressBox,
  _uiFileUploadStyle,
  _uiFileUploadTickIconStyle,
} from "./_uiFileUploadUI.style";

export type IUImageAllowProps =
  | "Image"
  | "PDF"
  | "Excel"
  | "Doc"
  | "CSV"
  | "ZIP";

export type IUiFileUploadType = "Default" | "ProfilePic";

export interface IUiFileUploadProps {
  title?: React.ReactNode;
  placeholder?: React.ReactNode;
  originalFileName?: string | string[];
  required?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  value?: string;
  onChange?: (fileName: string, inputName: string) => void;
  afterChange?: (event: any) => void;
  fileOnRemove?: (fileName: string, inputName: string) => void;
  afterDelete?: (data: { value: string; name: string }) => void;
  name?: string;
  className?: string;
  server: AxiosInstance;
  allowFiles?: IUImageAllowProps[];
  maxAllowSize?: number;
  isDemo?: boolean;
  isFocus?: boolean;
  lang?: "en" | "bn";
  type?: IUiFileUploadType;
}

export function UiFileUpload(props: IUiFileUploadProps) {
  const {
    title,
    error,
    sx = {},
    value,
    onChange,
    afterChange,
    className,
    name,
    helperText,
    fileOnRemove,
    afterDelete,
    server,
    maxAllowSize,
    allowFiles,
    required,
    isDemo = false,
    placeholder,
    // isFocus = true,
    type = "Default",
  } = props;
  const {
    uploadState,
    fileOnUpload,
    makeFileUrl,
    uploadFileInputRef,
    getOriginalFileInfo,
  } = useUiFileUploadHook({
    server,
    onChange,
    afterChange,
    isDemo,
    allowFiles,
    maxAllowSize,
    originalFileName: props.originalFileName,
  });

  let boxSx: SxProps<Theme> = { width: "100%" };
  if (!title) boxSx = { ...boxSx };
  return (
    <Box
      className={className}
      sx={
        {
          ...boxSx,
          ...sx,
          "& .MuiFormHelperText-root": { marginLeft: 2 },
        } as SxProps
      }
    >
      {title && (
        <Box sx={{ pr: 1 }}>
          <FormLabel sx={{ fontSize: "0.8em", color: "#373737" }} error={error}>
            {title}
            <Box component="span" sx={{ color: "red", pl: 0.2, pr: 1 }}>
              {required ? "*" : ""}
            </Box>
          </FormLabel>
        </Box>
      )}
      {type === "Default" && (
        <Box sx={{ width: "100%" }}>
          <Box sx={_uiFileUploadStyle}>
            <Box
              sx={{ ..._uiFileUploadProgressBox(uploadState.uploadedAmount) }}
            >
              &nbsp;
            </Box>
            <Box className="fileNameContainer" sx={{ width: "100%" }}>
              <Box className="fileUploadMediaBox">
                {!value && <Wallpaper className="fileUploadMediaIcon" />}
                {value && (
                  <a href={makeFileUrl(value)} target="_blank" rel="noreferrer">
                    <Avatar
                      src={makeFileUrl(value)}
                      sx={{ width: 35, height: 35 }}
                    >
                      <FileCopyOutlined />
                    </Avatar>
                  </a>
                )}
              </Box>
              {!uploadState.isLoading && !value && (
                <label
                  className="addFileBox"
                  style={{ color: "#a9a9a9", fontSize: "14px" }}
                >
                  <Add />
                  <input
                    type="file"
                    className="uploadFileInput"
                    name={name}
                    onChange={fileOnUpload}
                    ref={uploadFileInputRef}
                  />
                  {placeholder ?? "Attach a file"}
                </label>
              )}
              {uploadState.isFailed && (
                <Box className="hasError">
                  <ErrorIcon color="error" />
                  <Typography variant="body1" color="error">
                    Failed! Try Again
                  </Typography>
                </Box>
              )}
              {!uploadState.isLoading && value && (
                <>
                  <Box className="fileNameBox">
                    <span className="fileNameText">
                      {getOriginalFileInfo.name}
                    </span>
                  </Box>
                  <Box className="fileUploadActionIconBox">
                    <IconButton
                      href=""
                      className={className}
                      onClick={() => {
                        fileOnRemove && fileOnRemove(value, String(name));
                        afterDelete &&
                          afterDelete({ value: value, name: String(name) });
                      }}
                    >
                      {title}
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
              {uploadState.isLoading && (
                <Box className="fileUploadActionIconBox">
                  {uploadState.uploadedAmount + "%"}
                  {uploadState.uploadedAmount === 100 && (
                    <Done style={_uiFileUploadTickIconStyle} />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {type === "ProfilePic" && (
        <Box sx={{ width: "100%" }}>
          <Box sx={_uiFileProfilePicUploadStyle}>
            <Box
              sx={{ ..._uiFileUploadProgressBox(uploadState.uploadedAmount) }}
            >
              &nbsp;
            </Box>
            <Box className="fileNameContainer" sx={{ width: "100%" }}>
              {!uploadState.isLoading && !value && (
                <label
                  className="addFileBox"
                  style={{ color: "#a9a9a9", fontSize: "14px" }}
                >
                  <input
                    type="file"
                    className="uploadFileInput"
                    name={name}
                    onChange={fileOnUpload}
                    ref={uploadFileInputRef}
                  />
                  <Box className="profile-pic-icon-box">
                    <PersonIcon className="profile-pic-icon" />
                  </Box>
                  <Box className="profile-pic-placeholder">
                    <Typography>{placeholder ?? "Attach a file"}</Typography>
                    <Box className="profile-pic-placeholder-icon">
                      <CameraAltIcon sx={{ fontSize: "30px" }} />
                    </Box>
                  </Box>
                </label>
              )}
              {uploadState.isFailed && (
                <Box className="hasError">
                  <ErrorIcon sx={{ fontSize: "18px" }} color="error" />
                  <Typography variant="body1" color="error">
                    Failed! Try Again
                  </Typography>
                </Box>
              )}
              {!uploadState.isLoading && value && (
                <Box className="profile-pic-view">
                  <Box component={"img"} src={makeFileUrl(value)}></Box>
                  <Box className="fileUploadActionIconBox">
                    <IconButton
                      href=""
                      className={className}
                      onClick={() => {
                        fileOnRemove && fileOnRemove(value, String(name));
                        afterDelete &&
                          afterDelete({ value: value, name: String(name) });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              )}
              {uploadState.isLoading && (
                <Box className="fileUploadProgressBox">
                  {uploadState.uploadedAmount + "%"}
                  {uploadState.uploadedAmount === 100 && (
                    <Done style={_uiFileUploadTickIconStyle} />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      {helperText && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "5px",
            "& .uiFormHelperText": {
              m: "0 !important",
            },
          }}
        >
          {error && (
            <Typography variant="body2" component="span">
              {helperText}
            </Typography>
          )}

          <Typography variant="body2" component="span">
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
