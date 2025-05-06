
import classes from './MRT_TablePaper.module.css';


import { MRT_TableContainer } from './MRT_TableContainer';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import '@mantine/core/styles.css';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePaper = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableBottomToolbar,
      enableTopToolbar,
      mantinePaperProps,
      renderBottomToolbar,
      renderTopToolbar,
    },
    refs: { tablePaperRef },
  } = table;
  const { isFullScreen } = getState();

  const tableCardProps = {
    ...parseFromValuesOrFunc(mantinePaperProps, { table }),
    ...rest,
  };
  return (
    <Card
      {...tableCardProps}
      className={cn(
        'mrt-table-paper',
        classes.root,
        isFullScreen && 'mrt-table-paper-fullscreen',
        tableCardProps?.className,
      )}
      ref={(ref: HTMLDivElement) => {
        tablePaperRef.current = ref;
        if (tableCardProps?.ref) {
          tableCardProps.ref.current = ref;
        }
      }}
    >
      {enableTopToolbar &&
        (parseFromValuesOrFunc(renderTopToolbar, { table }) ?? (
          <MRT_TopToolbar table={table} />
        ))}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (parseFromValuesOrFunc(renderBottomToolbar, { table }) ?? (
          <MRT_BottomToolbar table={table} />
        ))}
    </Card>
  );
};
