import type { AnimalMessages } from "../types";

const data: AnimalMessages = {
  title: "تعرّف على أصدقائنا الصغار",
  description: "كلاب وقطط، لكل منها حكاية. بعضها ينتظر بيتًا يرعاه، وبعضها وجد بيته بالفعل.",
  adoptionMessage: "مرحبًا، أود الاستفسار عن تبنّي {name}.",
  age: "العمر التقريبي: {age} سنة", ageUnknown: "العمر غير معروف", getToKnow: "تعرّف عليّ", meetAll: "تعرّف على جميع أصدقائنا",
  photosLabel: "صور {name}", photoLabel: "الصورة {number} من {total}",
  viewPhoto: "عرض {photo} بالحجم الكامل", previousPhoto: "الصورة السابقة", nextPhoto: "الصورة التالية", closePhotoViewer: "إغلاق عارض الصور",
  species: { dog: "كلب", cat: "قط" },
  status: { available: "يبحث عن بيت", inCare: "يتلقى الرعاية", adopted: "وجد بيتًا يرعاه بحب" },
  personality: {
    gentle: "هادئ ولطيف وأحب الرفقة.",
    playful: "مستعد دائمًا للعب قليلًا.",
    curious: "أحب اكتشاف العالم من حولي.",
    shy: "أحتاج بعض الوقت حتى أعتاد عليك.",
    affectionate: "أحب المودة والقرب من الناس.",
    calm: "أنا هادئ وأحب الأوقات الساكنة.",
    energetic: "لدي طاقة كبيرة وأحب الحركة والنشاط.",
    independent: "أحب الاستكشاف على طريقتي ووفق وتيرتي.",
  },
};

export { data };
