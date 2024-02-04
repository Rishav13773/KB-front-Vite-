import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers";
import { redirect, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "sonner";

import { Check } from "lucide-react";
import FilterDropdown from "./components/filter-drop";

export type Project = {
  id: string;
  projectName: string;
  description: string;
  createdBy: string;
  createdDate: string;
};

interface ProjectTableProps {
  revalidate: boolean;
  setReValidate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  setReValidate,
  revalidate,
}) => {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const user = useSelector((state: RootState) => state.user);
  const ceratedByName = user.firstName;

  const [star, setStar] = React.useState(false);
  const [starFilter, setStarFilter] = React.useState(false);

  const navigate = useNavigate();

  // console.log(
  //   "consoling user.username sate",
  //   user.username,
  //   "ceratedByName: ",
  //   ceratedByName
  // );

  React.useEffect(() => {
    // Fetch projects when the component mounts
    if (!user) {
      return redirect("/login");
    }
    console.log("starFilter", starFilter);
    fetchData();
  }, [revalidate, starFilter]); // Empty dependency array ensures the effect runs only once on mount

  async function fetchData() {
    try {
      const state = false;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getprojectbyid/${
          user.id
        }?state=${state}`
      );

      const data = await response.data;

      if (starFilter) {
        const projectData = data.filter((data: any) => data.starred == true);
        setProjects(projectData);
        console.log("projectData : ", projectData);
      } else {
        setProjects(data);
      }

      // console.log(" state Projects:", projects);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  }

  const deleteProject = async (id: string) => {
    console.log(id);
    const state = true;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/trashProject/${id}`,
        { state }
      );

      const data = await response.data;
      setReValidate((prev) => !prev);

      fetchData();
      toast("Project trashed", {
        icon: (
          <Check className="w-4 h-4 dark:bg-white dark:text-black bg-black text-white rounded-full " />
        ),
      });
      // console.log(data);
    } catch (error) {
      console.error("Error deleting project:", error.message);
      // Handle the error as needed, e.g., show an error message to the user
    }
  };

  const onStarred = async (id: string, state: boolean) => {
    try {
      const updatedStarState = !state;
      setStar(updatedStarState);
      console.log(star);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/starredProject/${id}`,
        { star: updatedStarState }
      );
      fetchData();
    } catch (error) {
      console.error("Error starring projects:", error.message);
    }
  };

  const columns: ColumnDef<Project>[] = [
    // const columns: ColumnDef<Array<{
    //   id: string;
    //   projectName: string;
    //   description: string;
    //   createdBy: string;
    //   createdDate: string;
    // }>>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "_id", // Change this to "id"
    //   // header: "Project ID",
    //   // cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
    // },
    {
      accessorKey: "projectName",
      header: "Project Name",
      cell: ({ row }) => (
        <div
          className="capitalize cursor-pointer hover:underline"
          onClick={() => navigate(`/projects/${row.original._id}`)}
        >
          {row.getValue("projectName")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "createdByName",
      header: "Created By",
      cell: ({ row }) => <div className="CamelCase">{ceratedByName}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => {
        const rawDate = row.getValue("createdAt");
        const formattedDate = rawDate
          ? new Date(rawDate).toLocaleDateString("en-GB")
          : "";
        return <div className="text-left">{formattedDate}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                // onClick={getProject(project._id)}
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit project</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStarred(project._id, project.starred)}
              >
                {`${
                  project.starred === true ? "Unstar project" : "Star project"
                }`}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  console.log("consoling columns: ", columns.ceratedByName);
  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter project name..."
          value={
            (table.getColumn("projectName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("projectName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <FilterDropdown setStarFilter={setStarFilter} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
