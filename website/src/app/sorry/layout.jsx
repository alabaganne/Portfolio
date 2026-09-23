import { Playfair_Display } from "next/font/google";
import { noIndexMetadata } from "@/lib/private-pages";

export const metadata = {
  title: "A Secret Note",
  ...noIndexMetadata,
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function SorryLayout({ children }) {
  return <div className={playfair.className}>{children}</div>;
}
