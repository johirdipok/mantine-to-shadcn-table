import { type MouseEvent } from 'react';


import { ReusableToolTip } from '@/components/reusable/resusable-tooltip';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';

interface Props<TData extends MRT_RowData> {
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowActionMenu = <TData extends MRT_RowData>({
  handleEdit,
  row,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: {
      editDisplayMode,
      enableEditing,
      icons: { IconDots, IconEdit },
      localization,
      positionActionsColumn,
      renderRowActionMenuItems,
    },
  } = table;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          aria-label={localization.rowActions}
          size="icon"
        // {...rest}
        >
          <ReusableToolTip content={localization.rowActions} delayDuration={1000}>
            <IconDots />
          </ReusableToolTip>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align={positionActionsColumn === 'first'
        ? 'start'
        : positionActionsColumn === 'last'
          ? 'end'
          : 'start'} sideOffset={16} alignOffset={16}>
        {enableEditing && editDisplayMode !== 'table' && (
          <DropdownMenuItem onClick={handleEdit} className='space-x-1.5'>
            <IconEdit /> {localization.edit}
          </DropdownMenuItem>
        )}
        {renderRowActionMenuItems?.({
          row,
          table,
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
