import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tab";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface Document {
  UniqueId: string;
  Name: string;
  ServerRelativeUrl: string;
}

const Documents = () => {
  const { userId } = useParams<{ userId: any }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<Document[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.put(
        `http://localhost:3001/api/document/${userId}`,
        formData
      );
      console.log(response);
      alert("File uploaded");
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const getFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/files/${userId}`
      );

      const files = response.data;
      setFiles(files);
    } catch {}
  }, [userId]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const downloadFile = async (serverRelativePath?: string) => {
    try {
      if (!serverRelativePath) {
        throw new Error("serverRelativePath parameter is required");
      }
      const response = await axios.get(
        `http://localhost:3001/api/document/download`,
        {
          params: { serverRelativePath },
          paramsSerializer: (params) => {
            return qs.stringify(params, { encode: false });
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data]);
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute(
        "download",
        serverRelativePath.split("/").pop() || ""
      );
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Tabs userId={userId} />
      <Container>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>

        <table>
          {files.map((file) => (
            <>
              <tr key={file.UniqueId}>
                
                <td>
                  <InsertDriveFileRoundedIcon />
                  {file.Name}
                </td> 
                <td>
                  <FileDownloadOutlinedIcon
                    onClick={() => downloadFile(file?.ServerRelativeUrl)}
                  />
                </td>
              </tr>
            </>
          ))}
        </table>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export default Documents;