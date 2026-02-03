import { Quicksand } from "next/font/google";

export const metadata = {
  title: "Happy Birthday!",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function BirthdayLayout({ children }) {
  return <div className={quicksand.className}>{children}</div>;
}
