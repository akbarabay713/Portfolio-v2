import Body from "@/components/atoms/Body";
import Box from "@/components/atoms/Box";
import Heading from "@/components/atoms/Heading/Heading.component";
import { cn } from "@/lib/utils.lib";

interface TitleProps {
  text: string;
  subtext?: string;
  hasDivider?: boolean;
  className?: string;
}
const Title = ({
  text,
  subtext,
  hasDivider = false,
  className,
}: TitleProps) => {
  return (
    <Box>
      <Heading
        variant="h1"
        weight="semibold"
        className={cn(className, "text-2xl")}
      >
        {text}
      </Heading>

      {subtext && (
        <Body variant="lg" className="mt-4 max-w-2xl">
          I’m a fullstack developer with a passion for building modern web
          experiences that are fast, intuitive, and thoughtfully designed.
          Focused on frontend development, clean UI, smooth interactions, and
          creating products people genuinely enjoy using.
        </Body>
      )}
    </Box>
  );
};

export default Title;
