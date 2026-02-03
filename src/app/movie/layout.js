import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function MovieLayout({ children }) {
  return <div className={bebasNeue.className}>{children}</div>;
}
