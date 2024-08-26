import React, { Component } from "react";

class UploadWidget extends Component {
  componentDidMount() {
    const { cloudName, uploadPreset, setAvatar } = this.props.uwConfig;

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: this.props.uwConfig.multiple,
        maxImageFileSize: this.props.uwConfig.maxImageFileSize,
        folder: this.props.uwConfig.folder,
        public_id: `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`, // Unique file name
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Upload successful! Image info: ", result.info);

          // Use functional update to ensure the most recent state is used
          setAvatar((prevAvatar) => {
            const updatedAvatars = [...prevAvatar, result.info.secure_url];
            console.log("Updated avatars array:", updatedAvatars);
            return updatedAvatars;
          });
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default UploadWidget;
