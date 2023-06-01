import { FC } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
  
interface IDocumentGrid {
    rows: any[];
    cols: GridColDef<any>[];
    onRowClick?: (param) => void;
}

const DocumentGrid: FC<IDocumentGrid> = (props) => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props?.rows ?? []}
                columns={props?.cols ?? []}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowClick={props.onRowClick}
            />
        </Box>
    );
};

export default DocumentGrid;