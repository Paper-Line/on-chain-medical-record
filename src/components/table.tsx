import { useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import Container from "./container";

type ColumnProps = {
  name: string;
  selector: string;
  sortable?: boolean;
  center?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sort?: string;
};

createTheme("dark", {
  background: {
    default: "transparent"
  }
});

const NoDataComponent = () => {
  return (
    <div className="w-full p-5 flex flex-col justify-center items-center">
      <h3 className="text-teal-500 font-bold">No Data Found</h3>
    </div>
  );
};

const TableLoadingComponent = () => {
  const defaultClassName = useMemo(() => {
    return "w-full bg-neutral-200 rounded";
  }, []);

  return (
    <Container className="w-full animate-pulse overflow-x-auto">
      <div className="w-full min-w-[999px] grid grid-cols-8 gap-5">
        <div className="col-span-1">
          <div className={`${defaultClassName} h-7 mb-7`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10`} />
        </div>
        <div className="col-span-2">
          <div className={`${defaultClassName} h-7 mb-7`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10`} />
        </div>
        <div className="col-span-2">
          <div className={`${defaultClassName} h-7 mb-7`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10`} />
        </div>
        <div className="col-span-1">
          <div className={`${defaultClassName} h-7 mb-7`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10`} />
        </div>
        <div className="col-span-2">
          <div className={`${defaultClassName} h-7 mb-7`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10 mb-2.5`} />
          <div className={`${defaultClassName} h-10`} />
        </div>
      </div>
    </Container>
  );
};

export const Table = (props: any) => {
  const {
    defaultSortField,
    pagination = true,
    paginationRowsPerPageOptions = [25, 50, 75, 100],
    defaultSort = "createdAt",
    paginations = {},
    ...rest
  } = props;
  const { setPage = () => {}, setLimit = () => {}, setSortColumn = () => {}, setOrder = () => {} } = paginations;

  const handleSort = (column: ColumnProps, sortDirection: string) => {
    setSortColumn(column.sort || defaultSortField || defaultSort);
    setOrder(sortDirection.toUpperCase());
  };
  const handlePageChange = (page: number) => setPage(page);
  const handleRowsPerPageChange = (limit: number) => setLimit(limit);

  return (
    <DataTable
      {...rest}
      customStyles={defaultStyle}
      onSort={handleSort}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handleRowsPerPageChange}
      pagination={pagination}
      paginationServer={pagination}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      paginationComponentOptions={{
        rowsPerPageText: "Data per page:",
        rangeSeparatorText: "of"
      }}
      progressComponent={<TableLoadingComponent />}
      noDataComponent={<NoDataComponent />}
      theme="light"
    />
  );
};

const defaultStyle = {
  table: {
    style: {
      width: "100%",
      background: "transparent",
      color: "#404245"
    }
  },
  responsiveWrapper: {
    style: {
      borderRadius: "0px !important"
    }
  },
  headRow: {
    style: {
      fontWeight: "semibold",
      fontSize: "14px",
    }
  },
  rows: {
    style: {
      backgroundColor: "transparent",
      "&:not(:last-of-type)": {
        border: "none"
      },
      fontSize: "14px",
      fontWeight: 400
    }
  },
  headCells: {
    style: {
      backgroundColor: "transparent",
      padding: "2px 12px",
      border: "solid 1px #F3F3F3",
    }
  },
  cells: {
    style: {
      border: "solid 1px #F3F3F3",
      color: "#404245",
      padding: "2px 12px",
    }
  },
  pagination: {
    style: {
      backgroundColor: "transparent"
    },
    pageButtonsStyle: {
      fill: "#404245"
    }
  }
};
