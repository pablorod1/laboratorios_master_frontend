import ImagesGrid from "@/components/ImagesGrid";

const kitties = [
  {
    id: "5",
    picUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Golden_Retriever_9-year_old.jpg",
    title: "Cool dog A",
  },
  {
    id: "6",
    picUrl:
      "https://vitakraft.es/wp-content/uploads/2020/12/Blog_HistoriaPerros-1110x600.jpg",
    title: "Cool dog B",
  },
];

export default function PuppiesPage() {
  return <ImagesGrid pictures={kitties} />;
}
