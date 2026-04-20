import { Quicksand } from "next/font/google";

export const metadata = {
  title: "Happy Birthday Eya",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function EyaLayout({ children }) {
  return <div className={quicksand.className}>{children}</div>;
}
