import { Caveat } from "next/font/google";

export const metadata = {
  title: "A Secret Note",
};

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HeyLayout({ children }) {
  return <div className={caveat.className}>{children}</div>;
}
