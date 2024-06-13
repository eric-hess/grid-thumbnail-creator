import React from 'react';
import {Container, Grid} from '@mui/material';
import ThumdnailGrid from './ThumdnailGrid/ThumdnailGrid';

const App = () => {
    return (
        <Container
            maxWidth='md'
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xs={12}
                >
                    <ThumdnailGrid />
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
