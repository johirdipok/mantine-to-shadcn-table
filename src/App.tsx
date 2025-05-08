import { AppSidebar } from "@/components/app-sidebar";
import { DemoCopyButton } from "@/components/CopyButton/CopyButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable
} from "@/src-mantine-table";
import { LoadingOverlay } from "@/Test/LoadingOverlay";
import { MantineProvider } from "@mantine/core";


export default function App() {
  return (
    <MantineProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
            <DemoCopyButton />
            <div className="relative" >
              <div className="min-h-[100vh] flex-1 rounded-xl bg-primary " />
              <LoadingOverlay visible={true} />
            </div>

            <ExampleMantineTable />
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </MantineProvider>
  );
}

import { useMemo } from "react";
export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
};

export const data: Person[] = [
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


  const handleSaveRow = async ({
    table,
    row,
    values,
  }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    console.log(table.getState())

  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => (
      <DropdownMenuItem onClick={() => console.info('Edit')} > Delete</DropdownMenuItem>
    )
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
  return <MantineReactTable table={table} />
  // return <MantineReactTable columns={columns}
  //   data={data}
  //   editDisplayMode="row" //default
  //   enableEditing
  //   onEditingRowSave={handleSaveRow} />;
};



