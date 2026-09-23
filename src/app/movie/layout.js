import { Bebas_Neue } from "next/font/google";
import { noIndexMetadata } from "@/lib/private-pages";

export const metadata = {
  title: "A Secret Note",
  ...noIndexMetadata,
};

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function MovieLayout({ children }) {
  return <div className={bebasNeue.className}>{children}</div>;
}
