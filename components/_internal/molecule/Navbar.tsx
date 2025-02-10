"use client";

import React, { useState } from "react";
import CategoriesContent from "../atom/CategoriesContent";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import NavbarImage from "@/assets/images/MoovieTime-Logo.svg";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

export default function Navbar() {
  // TODO: consider to refactor genres type into separate file
  const [genres, setGenres] = useState<Array<{
    id: number;
    name: string;
  }> | null>(null);

  return (
    <nav>
      <div className="flex justify-between items-center space-x-[36.9px] bg-[#FFFFFF05] px-[--content-padding] py-[17px]">
        <div className="navbar-brand">
          <Link href="/">
            <Image src={NavbarImage} alt="home" width="112" height="31" />
          </Link>
        </div>

        <div className="navbar-search flex-1">
          <form>
            <Input type="text" />
          </form>
        </div>

        <div className="navbar-page">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {/* TODO: add icon */}
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CategoriesContent
                    onLoad={setGenres}
                    loaded={!!genres?.length}
                  >
                    <ul className="w-[133px]">
                      {genres?.map((genre) => (
                        <ListItem
                          key={genre.id}
                          href={`/movies?genres=${genre.name}`}
                          title={genre.name}
                        />
                      ))}
                    </ul>
                  </CategoriesContent>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/movies" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Movies
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="#" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    TV Shows
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="#" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
