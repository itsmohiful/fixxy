import { SxProps } from "@mui/material/styles";

export const _FileUploadStyle: SxProps = {
  position: "relative",
  width: "100%",
  height: 40,
  border: "1px solid #C2C2C2",
  borderRadius: 1,
  "&.hasError": {
    borderColor: "error.main",
  },
  "& .fileNameContainer": {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1,
    padding: 0,
    "& .fileUploadMediaBox": {
      display: "flex",
      alignItems: "center",
      mr: 1,
      "& .fileUploadMediaIcon": {
        fontSize: "30px",
      },
      "& .fileUploadMediaImage": {
        height: "20px",
        width: "20px",
      },
    },
    "& .hasError": {
      display: "flex",
      alignItems: "center",
      mr: 1,
    },
    "& .fileNameBox": {
      flex: 95,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      mr: 1,
      "& .fileNameText": {
        overflow: "hidden",
        width: "100%",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
    "& .addFileBox": {
      flex: 95,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      "& .uploadFileInput": {
        width: 0,
      },
    },
    "& .fileUploadActionIconBox": { display: "flex", alignItems: "center" },
    "& .noPadding": { padding: 0 },
  },
};

export const _FileUploadTickIconStyle = { fill: "#00860A" };
export const _FileProfilePicUploadStyle: SxProps = {
  width: "140px",
  height: "170px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #C2C2C2",
  borderRadius: "8px",
  overflow: "hidden",

  "& .fileNameContainer": {
    width: "100%",
    height: "100%",
    display: "flex",

    flexDirection: "column",
    position: "relative",
    "& .addFileBox": {
      width: "100%",
      height: "100%",
      position: "relative",
      "& input.uploadFileInput": {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        opacity: 0,
        cursor: "pointer",
      },
      "& .profile-pic-icon-box": {
        height: "calc(100% - 36px)",
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        transition: ".5s",
        "& .profile-pic-icon": {
          fontSize: "90px",
          color: "#EFEFEF",
        },
      },

      "& .profile-pic-placeholder": {
        background: "#EFEFEF",
        borderRadius: "0px 0px 8px 8px",
        height: "36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#858585",
        transition: ".5s",
        "& p": {
          fontSize: "14px",
          lineHeight: "14px",
          transition: ".5s",
        },
        "& .profile-pic-placeholder-icon": {
          height: 0,
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: ".5s",
        },
      },
    },

    "& .hasError": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "5px",
      "& p": {
        fontSize: "14px",
      },
    },
    "& .fileUploadProgressBox": {
      width: "100%",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      bottom: "5px",
      left: 0,
      right: 0,
    },
    "& .profile-pic-view": {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& img": {
        maxWidth: "100%",
      },
      "& .fileUploadActionIconBox": {
        position: "absolute",
        bottom: 0,
        right: 0,
      },
    },
    "&:hover": {
      "& .addFileBox": {
        "& .profile-pic-icon-box": {
          height: "calc(100% - 50px)",

          "& .profile-pic-icon": {},
        },
        "& .profile-pic-placeholder": {
          height: "50px",
          "& p": {
            height: 0,
            opacity: 0,
          },
          "& .profile-pic-placeholder-icon": {
            height: "auto",
            opacity: 1,
          },
        },
      },
    },
  },
};

export const _FileUploadProgressBox = (uploadedAmount: number) => {
  return {
    width: `${uploadedAmount}%`,
    height: 39,
    backgroundColor: "#28e18847",
    borderRadius: 1,
    position: "absolute",
  };
};
