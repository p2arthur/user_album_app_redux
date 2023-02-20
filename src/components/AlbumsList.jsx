import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  console.log(data);

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
      <div>Albums by: {user.name}</div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
