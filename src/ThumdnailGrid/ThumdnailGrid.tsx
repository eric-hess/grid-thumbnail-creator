import React from 'react';
import {Button, Grid} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import HiddenInput from './HiddenInput';
import {createGridThumbnail} from './Helper';

const ThumdnailGrid = () => {
    const [gridThumbnail, setGridThumbnail] = React.useState<string>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        createGridThumbnail(
            URL.createObjectURL(event.target.files[0]),
            4,
            4,
            360,
            640
        ).then(dataUrl => setGridThumbnail(dataUrl));
    };

    const downloadThumbnail = (dataUrl: string) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `thumbnail.${dataUrl.split(';')[0].split('/')[1]}`;
        downloadLink.click();
    };

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                xs={12}
            >
                <Button
                    component='label'
                    variant='contained'
                    fullWidth
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    select file
                    <HiddenInput
                        type='file'
                        accept='video/*' 
                        onChange={(event) => handleFileChange(event)}
                    />
                </Button>
            </Grid>
            {
                gridThumbnail && (
                    <>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent='center'
                            alignItems='center'
                            style={{ display: 'flex' }}
                        >
                            <img
                                src={gridThumbnail}
                                style={{ border: '1px solid black' }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Button
                                component='label'
                                variant='contained'
                                fullWidth
                                tabIndex={-1}
                                startIcon={<DownloadIcon />}
                                onClick={() => downloadThumbnail(gridThumbnail)}
                            >
                                download image
                            </Button>
                        </Grid>
                    </>
                )
            }
        </Grid>
  );
};

export default ThumdnailGrid;