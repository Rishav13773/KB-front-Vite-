import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

interface FilterProps {
  setStarFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterDropdown: React.FC<FilterProps> = ({
  setStarFilter,
}: FilterProps) => {
  return (
    <div className="ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="ml-auto">
            Filters <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="font-semibold"
            onClick={() => setStarFilter(false)}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-semibold"
            onClick={() => setStarFilter((prev) => !prev)}
          >
            Starred
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Private</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterDropdown;
