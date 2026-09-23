import { Caveat } from "next/font/google";
import { noIndexMetadata } from "@/lib/private-pages";

export const metadata = {
  title: "A Secret Note",
  ...noIndexMetadata,
};

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HeyLayout({ children }) {
  return <div className={caveat.className}>{children}</div>;
}
