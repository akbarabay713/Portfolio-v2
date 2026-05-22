import Body from "@/components/atoms/Body";
import Box from "@/components/atoms/Box";
import { cn } from "@/lib/utils.lib";
import React from "react";

type bodyVariant = "md" | "xl" | "lg" | "sm" | "xs";
interface TitleProps {
  text: string;
  subtext?: string;
  hasDivider?: boolean;
  textVariant?: bodyVariant;
  textClass?: string;
  subtextClass?: string;
  as?: React.ElementType;
}
const Title = ({
  text,
  subtext,
  hasDivider = false,
  textVariant = "md",
  textClass,
  subtextClass,
  as = "p",
}: TitleProps) => {
  return (
    <Box>
      <Box className="flex gap-1">
        {hasDivider && <Box className="bg-done-700 w-px h-auto"></Box>}
        <Body
          as={as}
          variant={textVariant}
          weight="semibold"
          className={cn(textClass, "text-2xl")}
        >
          {text}
        </Body>
      </Box>

      {subtext && (
        <Body variant="lg" className={cn(subtextClass, " max-w-2xl")}>
          {subtext}
        </Body>
      )}
    </Box>
  );
};

export default Title;
