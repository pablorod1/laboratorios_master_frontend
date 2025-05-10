"use client";
import { useCart } from "@/contexts/CartContext";
import { PictureInfo } from "@/lib/model";
import Image from "next/image";

interface Props {
  picture: PictureInfo;
}

export default function ImagesGridItem({ picture }: Props) {
  const { toggleCartItem, cartItems } = useCart();

  const handleCheckbox = () => {
    toggleCartItem(picture);
  };

  const isItemInCartSelected = cartItems.some((item) => {
    return item.id === picture.id && item.selected;
  });

  return (
    <div key={picture.id} className="flex flex-col gap-2">
      <Image
        src={picture.picUrl}
        alt={picture.title}
        width={120}
        height={120}
        className="object-cover"
      />
      <p>{picture.title}</p>
      <div className="flex items-center gap-4">
        <label htmlFor="checkbox">Buy</label>
        <input
          checked={isItemInCartSelected}
          type="checkbox"
          id="checkbox"
          onChange={handleCheckbox}
        />
      </div>
    </div>
  );
}
