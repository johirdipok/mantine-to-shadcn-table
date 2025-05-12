import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "@/src-mantine-table";
import { useMemo } from "react";
type Person = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
};

const data: Person[] = [
  {
    firstName: "Dylan",
    lastName: "Murray",
    email: "dmurray@yopmail.com",
    city: "East Daphne",
  },
  {
    firstName: "Raquel",
    lastName: "Kohler",
    email: "rkholer33@yopmail.com",
    city: "Columbus",
  },
  {
    firstName: "Ervin",
    lastName: "Reinger",
    email: "ereinger@mailinator.com",
    city: "South Linda",
  },
  {
    firstName: "Brittany",
    lastName: "McCullough",
    email: "bmccullough44@mailinator.com",
    city: "Lincoln",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
  },
  {
    firstName: "Branson",
    lastName: "Frami",
    email: "bframi@yopmain.com",
    city: "New York",
  },
];

const ExampleMantineTable = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        editVariant: "select",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
        enableClickToCopy: true,
      },
      {
        accessorKey: "city",
        header: "City",
        enableClickToCopy: true,
      },
    ],
    [],
  );

  const handleSaveRow = async ({ table, row, values }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    console.log(table.getState());
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: true,
    // editDisplayMode: 'row',
    // renderRowActions: ({ row }) => <div>Hello world</div>,
    // renderRowActionMenuItems: ({ row }) => (
    //   <DropdownMenuItem onClick={() => console.info('Edit')} > Delete</DropdownMenuItem>
    // )
    // positionActionsColumn: 'first',
    // renderRowActionMenuItems: ({ row }) => (
    //   <>
    //     <Menu.Item onClick={() => console.info('Edit')}>Edit</Menu.Item>
    //     <Menu.Item onClick={() => console.info('Delete')}>Delete</Menu.Item>
    //   </>
    // ),
    // enableTopToolbar: false,
    // enableBottomToolbar: false,
  });
  // return <MantineReactTable table={table} />
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      editDisplayMode="row" //default
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export default ExampleMantineTable;
