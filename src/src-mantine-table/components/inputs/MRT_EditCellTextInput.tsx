import { type FocusEvent, type KeyboardEvent, useState } from "react";

import {
  type HTMLPropsRef,
  type MRT_Cell,
  type MRT_CellValue,
  type MRT_RowData,
  type MRT_TableInstance,
} from "../../types";
import { parseFromValuesOrFunc } from "../../utils/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropsTextInput<TData extends MRT_RowData, TValue = MRT_CellValue> {
  cell: MRT_Cell<TData, TValue>;
  table: MRT_TableInstance<TData>;
}

interface PropsSelect<TData extends MRT_RowData, TValue = MRT_CellValue> {
  cell: MRT_Cell<TData, TValue>;
  table: MRT_TableInstance<TData>;
}

interface PropsMultiSelect<TData extends MRT_RowData, TValue = MRT_CellValue> {
  cell: MRT_Cell<TData, TValue>;
  table: MRT_TableInstance<TData>;
}

type MRT_TextInputProps = HTMLPropsRef<HTMLInputElement>;
type MRT_SelectProps = HTMLPropsRef<HTMLInputElement>;
type MRT_MultiSelectProps = HTMLPropsRef<HTMLInputElement>;

export const MRT_EditCellTextInput = <TData extends MRT_RowData>({
  cell,
  table,
  ...rest
}: PropsMultiSelect<TData> | PropsSelect<TData> | PropsTextInput<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      mantineEditSelectProps,
      mantineEditTextInputProps,
    },
    refs: { editInputRefs },
    setCreatingRow,
    setEditingCell,
    setEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;
  const isSelectEdit = columnDef.editVariant === "select";
  const isMultiSelectEdit = columnDef.editVariant === "multi-select";

  const [value, setValue] = useState(() => cell.getValue<any>());

  const arg = { cell, column, row, table };
  const textInputProps = {
    ...parseFromValuesOrFunc(mantineEditTextInputProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineEditTextInputProps, arg),
    ...rest,
  } as MRT_TextInputProps;

  const selectProps = {
    ...parseFromValuesOrFunc(mantineEditSelectProps, arg),
    ...parseFromValuesOrFunc(columnDef.mantineEditSelectProps, arg),
    ...rest,
  };

  const saveInputValueToRowCache = (newValue: null | string) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow(row);
    } else if (isEditing) {
      setEditingRow(row);
    }
  };
  const handleBlur = (data) => {
    textInputProps.onBlur?.(data);
    saveInputValueToRowCache(value);
    setEditingCell(null);
  };

  // const handleEnterKeyDown = (data) => {
  //   textInputProps.onKeyDown?.(data);
  //   if (event.key === "Enter") {
  //     editInputRefs.current[cell.id]?.blur();
  //   }
  // };

  if (columnDef.Edit) {
    return columnDef.Edit?.({ cell, column, row, table });
  }

  const commonProps = {
    disabled: parseFromValuesOrFunc(columnDef.enableEditing, row) === false,
    label: ["custom", "modal"].includes(
      (isCreating ? createDisplayMode : editDisplayMode) as string,
    )
      ? column.columnDef.header
      : undefined,
    name: cell.id,
    onClick: (e: any) => {
      e.stopPropagation();
      textInputProps?.onClick?.(e);
    },
    placeholder: !["custom", "modal"].includes(
      (isCreating ? createDisplayMode : editDisplayMode) as string,
    )
      ? columnDef.header
      : undefined,
    value,
    variant: editDisplayMode === "table" ? "unstyled" : "default",
  } as const;

  if (isSelectEdit) {
    return (
      <Select
        {...commonProps}
        value={value as any}
        {...(selectProps as MRT_SelectProps)}
        onValueChange={(value) => {
          (selectProps as MRT_SelectProps).onChange?.(value as any);
          setValue(value);
        }}
      >
        <SelectTrigger
          className="w-[180px]"
          onBlur={handleBlur}
          ref={(node) => {
            if (node) {
              editInputRefs.current[cell.id] = node;
              if (selectProps.ref) {
                selectProps.ref.current = node;
              }
            }
          }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectItem value={value}>{value}</SelectItem> */}
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  if (isMultiSelectEdit) {
    return;
    <h1>Use MultiSelect </h1>;
    // <MultiSelect
    //   {...commonProps}
    //   searchable
    //   value={value}
    //   {...(selectProps as MRT_MultiSelectProps)}
    //   onBlur={handleBlur}
    //   onChange={(newValue) => {
    //     (selectProps as MRT_MultiSelectProps).onChange?.(value as any);
    //     setValue(newValue);
    //     // Save if not in focus, otherwise it will be handled by onBlur
    //     if (document.activeElement === editInputRefs.current[cell.id]) return;
    //     saveInputValueToRowCache(newValue as any);
    //   }}
    //   onClick={(e) => {
    //     e.stopPropagation();
    //     selectProps?.onClick?.(e);
    //   }}
    //   ref={(node) => {
    //     if (node) {
    //       editInputRefs.current[cell.id] = node;
    //       if (selectProps.ref) {
    //         selectProps.ref.current = node;
    //       }
    //     }
    //   }}
    // />
    //);
  }
  return (
    <Input
      {...commonProps}
      // onKeyDown={handleEnterKeyDown}
      value={value ?? ""}
      {...textInputProps}
      onBlur={handleBlur}
      onChange={(event) => {
        textInputProps.onChange?.(event);
        setValue(event.target.value);
      }}
      onClick={(event) => {
        event.stopPropagation();
        textInputProps?.onClick?.(event);
      }}
      ref={(node) => {
        if (node) {
          editInputRefs.current[cell.id] = node;
          if (textInputProps.ref) {
            textInputProps.ref.current = node;
          }
        }
      }}
    />
  );
};
