import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";

function AlbumsListItem({ album }) {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };
  const header = (
    <div className="flex items-center gap-3">
      <Button
        loading={removeAlbumResults.isLoading}
        onClick={handleRemoveAlbum}
        className="rounded-full bg-red-500 text-white"
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </div>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <div>Photo</div>
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
