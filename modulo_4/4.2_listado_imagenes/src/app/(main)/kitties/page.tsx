import ImagesGrid from "@/components/ImagesGrid";

const kitties = [
  {
    id: "1",
    picUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/220px-Cat_November_2010-1a.jpg",
    title: "Cool cat A",
  },
  {
    id: "2",
    picUrl:
      "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97",
    title: "Cool cat B",
  },
  {
    id: "3",
    picUrl:
      "https://www.hola.com/horizon/square/e7799b783028-gatos-gestos-t.jpg?im=Resize=(640),type=downsize",
    title: "Cool cat C",
  },
  {
    id: "4",
    picUrl:
      "https://content.elmueble.com/medio/2022/06/07/gato-erik-jan-leusink-ibpxglgjimi-unsplash_21d35523_1280x853.jpg",
    title: "Cool cat C",
  },
];

export default function KittiesPage() {
  return <ImagesGrid pictures={kitties} />;
}
