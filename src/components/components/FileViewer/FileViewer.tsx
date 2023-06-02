import { FC, useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export interface IFileViewer {
  base64: any;
}

const FileViewer: FC<IFileViewer> = ({ base64 }) => {
  const [url, setUrl] = useState<string>(null);
  const base64toBlob = (data: any) => {
    const blobData = Buffer.from(data, 'binary');
    const base64WithoutPrefix = blobData.toString('utf-8').replace('data:application/pdf;base64,', '');

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: 'application/pdf' });
  };

  useEffect(() => {
    if (base64) {
      const blob = base64toBlob(base64);
      const res = URL.createObjectURL(blob);
      setUrl(res);
    }
  }, [base64]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{ height: '100%' }}
        >
          <Grid item xl={12}>
            <div
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '650px',
              }}
            >
              <Viewer fileUrl={url} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Worker>
  );
};

export default FileViewer;
