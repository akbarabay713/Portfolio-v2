import {
  TimelineItemProps,
  TimelineItem,
} from "@/components/molecules/TimelineItem/TimeLineItem.component";

interface ExperienceTimelineProps {
  experiences: TimelineItemProps[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="flex flex-col">
        {experiences.map((experience, index) => (
          <TimelineItem key={index} {...experience} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
