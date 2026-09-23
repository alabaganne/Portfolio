import { Nunito } from "next/font/google";
import { noIndexMetadata } from "@/lib/private-pages";

export const metadata = {
  title: "A Secret Note",
  ...noIndexMetadata,
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function CoffeeLayout({ children }) {
  return <div className={nunito.className}>{children}</div>;
}
