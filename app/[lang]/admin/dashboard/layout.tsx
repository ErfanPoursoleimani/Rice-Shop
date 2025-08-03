import { ReactNode } from "react";
import OrdersDefault from "./_components/OrdersDefault";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

interface Props {
  children: ReactNode,
  contentSeg: ReactNode,
  navSeg: ReactNode,
}

export default function RootLayout({ children, contentSeg, navSeg }: Props) {

  return (
    <div className={`md:p-10 relative top-[105px] flex flex-col items-center justify-center`}>
      <ClientLayoutWrapper contentSeg={contentSeg} navSeg={navSeg}>
        {children}
      </ClientLayoutWrapper>
    </div>
  );
}
