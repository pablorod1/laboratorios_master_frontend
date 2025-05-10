import { PictureInfo } from "@/lib/model";
import ImagesGridItem from "./ImagesGridItem";

interface Props {
  pictures: PictureInfo[];
}

export default function ImagesGrid({ pictures }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
      {pictures.map((picture: PictureInfo) => (
        <ImagesGridItem key={picture.id} picture={picture} />
      ))}
    </div>
  );
}
