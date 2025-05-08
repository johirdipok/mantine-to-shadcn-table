import { ReusableToolTip } from '@/components/reusable/resusable-tooltip';
import { Button } from '@/components/ui/button';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';

interface Props<TData extends MRT_RowData> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  variant?: 'icon' | 'text';
}

export const MRT_EditActionButtons = <TData extends MRT_RowData>({
  row,
  table,
  variant = 'icon',
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { IconCircleX, IconDeviceFloppy },
      localization,
      onCreatingRowCancel,
      onCreatingRowSave,
      onEditingRowCancel,
      onEditingRowSave,
    },
    refs: { editInputRefs },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow, isSaving } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const handleCancel = () => {
    if (isCreating) {
      onCreatingRowCancel?.({ row, table });
      setCreatingRow(null);
    } else if (isEditing) {
      onEditingRowCancel?.({ row, table });
      setEditingRow(null);
    }
    row._valuesCache = {} as any; //reset values cache
  };

  const handleSubmitRow = () => {
    //look for auto-filled input values
    Object.values(editInputRefs?.current)
      .filter((inputRef) => row.id === inputRef?.name?.split('_')?.[0])
      ?.forEach((input) => {
        if (
          input.value !== undefined &&
          Object.hasOwn(row?._valuesCache as object, input.name)
        ) {
          // @ts-ignore
          row._valuesCache[input.name] = input.value;
        }
      });
    if (isCreating)
      onCreatingRowSave?.({
        exitCreatingMode: () => setCreatingRow(null),
        row,
        table,
        values: row._valuesCache,
      });
    else if (isEditing) {
      onEditingRowSave?.({
        exitEditingMode: () => setEditingRow(null),
        row,
        table,
        values: row?._valuesCache,
      });
    }
  };

  return (
    <div
      className='flex gap-2.5'
      // onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      <div>
        {variant === 'icon' ? (
          <>
            <ReusableToolTip content={localization.cancel}  >
              <Button variant='ghost' size='icon' aria-label={localization.cancel}
                className='text-red-500'
                onClick={handleCancel}
              >
                <IconCircleX />
              </Button>
            </ReusableToolTip>
            <ReusableToolTip content={localization.cancel}>
              <Button variant='ghost' size='icon'
                aria-label={localization.save}
                // loading={isSaving}
                className='text-blue-500'
                disabled={isSaving}
                onClick={handleSubmitRow}
              >
                <IconDeviceFloppy />
              </Button>
            </ReusableToolTip>
          </>
        ) : (
          <>
            <Button onClick={handleCancel} variant="ghost">
              {localization.cancel}
            </Button>
            <Button
              // loading={isSaving}
              disabled={isSaving}
              onClick={handleSubmitRow} >
              {localization.save}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
