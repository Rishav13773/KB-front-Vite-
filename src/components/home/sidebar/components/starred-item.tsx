import { Bookmark } from "lucide-react";

const StarredItem = () => {
  return (
    <>
      <p className="flex items-center gap-2 text-sm w-full hover:bg-primary/5 p-1 pl-2 text-muted-foreground hover:cursor-pointer">
        <Bookmark width={18} />
        Starred
      </p>
    </>
  );
};

export default StarredItem;
