import { homeContent } from "./home";
import { aboutContent } from "./about";

export const mediaSlots = [
  {
    key: "home.introduction",
    label: "Home introduction",
    fallback: homeContent.introductionImage.src,
  },
  {
    key: "home.feeding",
    label: "Home feeding",
    fallback: homeContent.workImages.feeding.src,
  },
  {
    key: "home.veterinary",
    label: "Home veterinary",
    fallback: homeContent.workImages.veterinary.src,
  },
  {
    key: "home.companionship",
    label: "Home companionship",
    fallback: homeContent.workImages.companionship.src,
  },
  { key: "home.team", label: "Home team", fallback: homeContent.teamImage.src },
  {
    key: "about.introduction",
    label: "About introduction",
    fallback: aboutContent.introductionImage.src,
  },
  ...aboutContent.teamMembers.map((member) => ({
    key: `about.team.${member.id}`,
    label: `About ${member.firstName}`,
    fallback: member.portrait.src,
  })),
];
