
import classes from './MRT_TablePagination.module.css';

import Paginator from '@/components/Paginator/Paginator';
import { PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface PaginationProps {
  /** Determines whether first/last controls should be rendered, false by default */
  withEdges?: boolean;
  /** Determines whether next/previous controls should be rendered, true by default */
  withControls?: boolean;
  /** Adds props to next/previous/first/last controls */
  getControlProps?: (control: 'first' | 'previous' | 'last' | 'next') => Record<string, any>;
  /** Next control icon component */
  /** Determines whether pages controls should be displayed, `true` by default */
  withPages?: boolean;
}

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100].map((x) =>
  x.toString(),
);

interface Props<TData extends MRT_RowData> extends Partial<PaginationProps> {
  position?: 'bottom' | 'top';
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePagination = <TData extends MRT_RowData>({
  position = 'bottom',
  table,
  ...props
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    getPageCount,
    options: {
      enableToolbarInternalActions,
      // icons: {
      //   IconChevronLeft,
      //   IconChevronLeftPipe,
      //   IconChevronRight,
      //   IconChevronRightPipe,
      // },
      localization,
      mantinePaginationProps,
      paginationDisplayMode,
      rowCount,
    },
    setPageIndex,
    setPageSize,
  } = table;
  const {
    pagination: { pageIndex = 0, pageSize = 10 },
    showGlobalFilter,
  } = getState();

  const paginationProps = {
    ...parseFromValuesOrFunc(mantinePaginationProps, {
      table,
    }),
    ...props,
  };

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons = numberOfPages > 2;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  const {
    rowsPerPageOptions = defaultRowsPerPage,
    showRowsPerPage = true,
    withEdges = showFirstLastPageButtons,
  } = paginationProps ?? {};

  const needsTopMargin =
    position === 'top' && enableToolbarInternalActions && !showGlobalFilter;
  const paginationSelectData = paginationProps?.rowsPerPageOptions ?? defaultRowsPerPage
  return (
    <div
      className={cn(
        'mrt-table-pagination',
        classes.root,
        needsTopMargin && classes['with-top-margin'],
      )}
    >
      {/* <PaginationDemo /> */}
      {paginationProps?.showRowsPerPage !== false && (
        <div className='flex items-center gap-2'>
          <p id="rpp-label">{localization.rowsPerPage}</p>
          <Select
            aria-labelledby="rpp-label"
            onValueChange={(value: null | string) => setPageSize(+(value as string))}
            value={pageSize.toString()}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className={classes.pagesize} >
                {paginationSelectData?.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="cursor-pointer"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {paginationDisplayMode === 'pages' ? (
        <Paginator
          currentPage={pageIndex + 1}
          totalPages={getPageCount()}
          onPageChange={(pageNumber) => setPageIndex(pageNumber - 1)}
          showPreviousNext
        />
      ) : paginationDisplayMode === 'default' ? (
        <>
          <p>{`${lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()
            }-${lastRowIndex.toLocaleString()} ${localization.of
            } ${totalRowCount.toLocaleString()}`}</p>
          <div className='flex items-center gap-6' >
            {withEdges && (
              <PaginationItem>
                <PaginationPrevious
                  aria-label={localization.goToFirstPage}
                  color="gray"
                  disabled={pageIndex <= 0}
                  onClick={() => setPageIndex(0)}
                  variant="subtle"
                />
              </PaginationItem>
            )}
            <Paginator
              currentPage={pageIndex + 1}
              totalPages={getPageCount()}
              onPageChange={(pageNumber) => setPageIndex(pageNumber - 1)}
              showPreviousNext
            />


            {withEdges && (
              <PaginationItem>
                <PaginationNext
                  aria-label={localization.goToLastPage}
                  color="gray"
                  disabled={lastRowIndex >= totalRowCount}
                  onClick={() => setPageIndex(numberOfPages - 1)}
                  variant="subtle"
                />

              </PaginationItem>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};










