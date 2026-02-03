import { Libre_Baskerville } from "next/font/google";

export const metadata = {
  title: "A Secret Note",
};

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function StudyLayout({ children }) {
  return <div className={libreBaskerville.className}>{children}</div>;
}
