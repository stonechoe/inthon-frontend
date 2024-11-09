import Overviews from "./list";

export default function GalleryPage() {
  return (<div className="w-full py-16">
    <h1 className="text-primary-main font-extrabold text-3xl text-center ">
    지금까지 [...]님이 그린 그림을 소개합니다.
    </h1>
    <h2>지금까지 ..님이 그린 그림이에요!</h2>
    <Overviews />
  </div>);
}