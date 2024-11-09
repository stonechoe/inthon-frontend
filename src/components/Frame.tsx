import Image from "next/image";

import PhotoFrame from 'public/image/photo_frame.png';

export default function Frame() {
  return <Image src={PhotoFrame} alt="Photo Frame" />;

}