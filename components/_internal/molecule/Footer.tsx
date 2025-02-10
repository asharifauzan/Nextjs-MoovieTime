import React from "react";
import Image from "next/image";
import MovieTimeGray from "@/assets/images/MoovieTime-Logo-Grey.svg";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-between items-center space-x-[36.9px] pt-[65px] px-[--content-padding] pb-[70.64px]">
        {/* TODO: appname using .env */}
        <div className="copyright">
          <p>&copy; 2021 MoovieTime. All Right Reserved.</p>
        </div>
        <div className="logo">
          <Image src={MovieTimeGray} alt="logo" width="112" height="31" />
        </div>
        <div className="tech-stack">
          <p>Made with Next.js + Typescript</p>
        </div>
      </div>
    </footer>
  );
}
