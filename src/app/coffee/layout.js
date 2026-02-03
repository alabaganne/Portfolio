import { Nunito } from "next/font/google";

export const metadata = {
  title: "A Secret Note",
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function CoffeeLayout({ children }) {
  return <div className={nunito.className}>{children}</div>;
}
