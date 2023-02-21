import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { faker } from "@faker-js/faker";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum({ title: faker.commerce.productName(), userId: user.id });
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className="w-full h-10" />;
  } else if (error) {
    content = <div>Error getting albums</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel header={header}>
          <div>Photo</div>
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-5 items-center">
        Albums by: {user.name}
        <Button onClick={handleAddAlbum}>+ Add new album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
