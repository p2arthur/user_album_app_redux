import {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "../store";
import Skeleton from "./Skeleton";
import { faker } from "@faker-js/faker";
import Button from "./Button";

import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  console.log(user);
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, addAlbumsResults] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum({ title: faker.commerce.productName(), userId: user.id });
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={3} className="w-full h-10" />;
  } else if (error) {
    content = <div>Error getting albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-5 items-center">
        <h3 className="text-lg font-bold"> Albums by: {user.name}</h3>
        <Button loading={addAlbumsResults.isLoading} onClick={handleAddAlbum}>
          + Add new album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
