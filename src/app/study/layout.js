import { Libre_Baskerville } from "next/font/google";
import { noIndexMetadata } from "@/lib/private-pages";

export const metadata = {
  title: "A Secret Note",
  ...noIndexMetadata,
};

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function StudyLayout({ children }) {
  return <div className={libreBaskerville.className}>{children}</div>;
}
