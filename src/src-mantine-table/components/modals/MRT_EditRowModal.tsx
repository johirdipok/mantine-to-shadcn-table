
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
interface Props<TData extends MRT_RowData> {
  open: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends MRT_RowData>({
  open,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      mantineCreateRowModalProps,
      mantineEditRowModalProps,
      onCreatingRowCancel,
      onEditingRowCancel,
      renderCreateRowModalContent,
      renderEditRowModalContent,
    },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow } = getState();
  const row = (creatingRow ?? editingRow) as MRT_Row<TData>;

  const arg = { row, table };
  const modalProps = {
    ...parseFromValuesOrFunc(mantineEditRowModalProps, arg),
    ...(creatingRow && parseFromValuesOrFunc(mantineCreateRowModalProps, arg)),
    ...rest,
  };

  const internalEditComponents = row
    .getAllCells()
    .filter((cell) => cell.column.columnDef.columnDefType === 'data')
    .map((cell) => (
      <MRT_EditCellTextInput cell={cell} key={cell.id} table={table} />
    ));

  const handleCancel = () => {
    if (creatingRow) {
      onCreatingRowCancel?.({ row, table });
      setCreatingRow(null);
    } else {
      onEditingRowCancel?.({ row, table });
      setEditingRow(null);
    }
    row._valuesCache = {} as any; //reset values cache
    modalProps.onClose?.();
  };

  return (
    <Dialog
      open={open}
      withCloseButton={false}
      {...modalProps}
      key={row.id}
      onOpenChange={handleCancel}

    >
      {/* TODO
        - Add a useful Dialog Title
        - Add a useful Dialog Description
      */}
      <VisuallyHidden><DialogTitle>Table Form</DialogTitle></VisuallyHidden>
      <DialogContent>
        <VisuallyHidden><DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription></VisuallyHidden>

        {((creatingRow &&
          renderCreateRowModalContent?.({
            internalEditComponents,
            row,
            table,
          })) ||
          renderEditRowModalContent?.({
            internalEditComponents,
            row,
            table,
          })) ?? (
            <>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='flex flex-col gap-5 pb-6 pt-4'>
                  {internalEditComponents}
                </div>
              </form>
              <DialogFooter>
                <MRT_EditActionButtons row={row} table={table} variant="icon" />
              </DialogFooter>
            </>
          )}
      </DialogContent>

    </Dialog>
  );
};
