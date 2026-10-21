import { homeContent } from "./home";
import { aboutContent } from "./about";
import { volunteerContent } from "./volunteer";

export const mediaSlots = [
  {
    key: "home.introduction",
    fallback: homeContent.introductionImage.src,
  },
  {
    key: "home.feeding",
    fallback: homeContent.workImages.feeding.src,
  },
  {
    key: "home.veterinary",
    fallback: homeContent.workImages.veterinary.src,
  },
  {
    key: "home.companionship",
    fallback: homeContent.workImages.companionship.src,
  },
  { key: "home.team", fallback: homeContent.teamImage.src },
  {
    key: "about.introduction",
    fallback: aboutContent.introductionImage.src,
  },
  ...aboutContent.teamMembers.map((member) => ({
    key: `about.team.${member.id}`,
    fallback: member.portrait.src,
  })),
  {
    key: volunteerContent.actionImages[0].key,
    fallback: volunteerContent.actionImages[0].src,
  },
  {
    key: volunteerContent.actionImages[1].key,
    fallback: volunteerContent.actionImages[1].src,
  },
  {
    key: volunteerContent.actionImages[2].key,
    fallback: volunteerContent.actionImages[2].src,
  },
];
