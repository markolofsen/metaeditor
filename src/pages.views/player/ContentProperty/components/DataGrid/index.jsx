import * as React from 'react';
import PropTypes from 'prop-types';

// nextjs
import { useRouter } from 'next/router';

// material
import { styled } from 'metalib/styles'
import { DataGrid } from '@mui/x-data-grid';



const RootDiv = styled.div(theme => ({
  '&[data-row-clickable="true"]': {
    '& .MuiDataGrid-row': {
      cursor: 'pointer',
    }
  },
}))

const Table = styled.custom(DataGrid, theme => ({
  // padding: theme.spacing(0, 0, '380px'),

  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
    userSelect: 'none',
    '&:focus': {
      outline: 'none',
    }
  },
  '& .MuiDataGrid-cell': {
    whiteSpace: 'normal',
    lineHeight: 'normal !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start !important',
    padding: theme.spacing(2, '10px'),
  },
  '& .MuiDataGrid-cell--textRight': {
    alignItems: 'flex-end !important',
  },



}))


function DataGridComponent({ TableProps, data, ...props }) {
  const router = useRouter()

  const rows = data?.results || false

  if (data === false) {
    return (<div />);
  }

  const { pagination } = data

  TableProps = {
    disableSelectionOnClick: true,
    disableColumnMenu: true,
    disableColumnFilter: true,
    disableColumnSelector: true,
    disableDensitySelector: true,
    checkboxSelection: false,
    autoPageSize: true,
    autoHeight: true,
    rowHeight: 100,
    density: 'comfortable',
    filterMode: 'server',
    paginationMode: 'server',
    setCheckBoxRender: () => false,
    isRowSelectable: () => false,
    checkboxSelection: false,
    disableSelectionOnClick: true,
    // onRowClick: ({columns, getValue, id, row}) => {
    //   // console.error('@onRowClick', {columns, getValue, id, row});
    // },
    // hideFooterSelectedRowCount: true,
    // hideFooterPagination: true,
    pagination: true,

    ...TableProps,

    page: pagination.page - 1,
    pageSize: pagination.size,
    rowCount: pagination.totalSize,
    // rowsPerPageOptions: [5, 10, 50],
  }



  return (
    <RootDiv data-row-clickable={TableProps.onRowClick ? true : false}>

      <Table {...TableProps}
        rows={rows}
      />

    </RootDiv>
  )
}

DataGridComponent.propTypes = {
  TableProps: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};
DataGridComponent.defaultProps = {
}

export default DataGridComponent;
