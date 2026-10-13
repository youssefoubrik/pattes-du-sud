## The goal

**For** donors abroad, tourists in Mirleft and Moroccan supporters

**who** want to help the street dogs and cats of Mirleft,

**Pattes du Sud's website** is a simple, warm, multilingual site

**that** lets them trust the association, get to know its animals, and donate or help in a few taps from their phone.

**Unlike** a Facebook page or a flyer,

**it** shows real proof, each animal's story, and exactly what every donation pays for, and the team can keep it up to date themselves.

## Delivery tracker

Checked items are implemented in the site. Account details and association facts still need to be entered before public launch.

### Shared site

- [x] Mobile header, navigation, language selector and Donate button
- [x] Footer with editable contact, social and registration details
- [x] English, French, German and right-to-left Arabic routes
- [x] Page metadata, animal metadata, robots rules and sitemap
- [x] Not-found and error pages
- [ ] Mobile and keyboard accessibility review in real browsers

### Home

- [x] Introduction, animal photo and two calls to action
- [x] Four-service overview
- [x] Featured animal gallery with statuses
- [x] Team introduction and optional verified impact figures
- [x] Ways to help
- [x] Supporters
- [x] Mirleft map

### About

- [x] Introduction and purpose
- [x] Care system and red-collar explanation
- [x] Compact team profiles
- [x] Association facts and recordkeeping
- [x] Donate invitation

### Animals gallery

- [x] Dogs and cats with species and status filters
- [x] Cards link to individual profiles
- [x] Gallery links to adoption guidance

### Animal profile

- [x] Photo, name, status, age, sex and care facts
- [x] Story, adoption contact, donation and share actions
- [x] Unique social and search metadata

### Adopt

- [x] Introduction and three-step process
- [x] Local and international guidance
- [x] Contact action

### Donate

- [x] Donation purpose and editable PayPal-hosted links
- [x] Bank details with copy buttons and recurring-transfer guidance
- [x] Recordkeeping explanation and thank-you page
- [ ] On-site amount selection tied to verified costs
- [ ] Verified payment status and provider return flow

### Mirleft QR page

- [x] Short introduction, photo and Donate / Animals / Contact actions
- [x] QR source tracking with `?source=location-name`

### Volunteer

- [x] Introduction and practical ways to help
- [x] Visit-arrangement guidance and contact action

### Contact

- [x] WhatsApp and email actions
- [x] Contact form stored in the editor inbox
- [x] Visit guidance

### Privacy and association information

- [x] Privacy page and association-information page

### CMS and storage

- [x] SQLite database for animals, photos, messages, translated copy, settings and activity
- [x] Password-protected editor with persistent sessions
- [x] Add, edit and remove animals, including photo uploads
- [x] Edit Home, About and other public page text in four languages
- [x] Replace Home and About photos
- [x] Edit contact, map, registration, PayPal, bank and impact details
- [x] Visitor, country, animal-view, QR source and CTA counts
- [x] Database backup and restore procedure
- [ ] Association training video

### Launch verification

- [x] TypeScript, lint and production webpack build
- [x] Route response checks in English and Arabic
- [ ] End-to-end editor, donation and contact-flow testing in real browsers
- [ ] Confirm association facts, contacts, payment accounts and imagery

<aside>
🏷️

**How to read this plan**

🟢 **At launch:** included in the first version of the website

🟡 **At launch if possible:** planned for the first version

⚪ **Later:** a good idea for after launch

</aside>

## Who the website is for

- **Donors abroad:** people in Germany, France, the UK and elsewhere who want to help, often from their phone, and need to trust you before giving
- **Tourists in Mirleft / locals:** meet the dogs and cats in town and want to help on the spot, and who may want to report an animal in need
- **Moroccan supporters:** local people who prefer Arabic or French, and bank transfers,
- **People who want to adopt:** looking for an animal and wanting to get in touch
- **You and your team:** adding animals,and texts yourselves, without needing a developer
- **Sponsors** ⚪ **Later:** people supporting one specific animal every month

## The website, page by page

### Shared header

- Logo linking to the home page
- Navigation: **Home**, **About**, **Animals**, **Volunteer**, **Contact**
- Language selector: **English, Français, Deutsch, العربية**
- A prominent orange **Donate** button
- On mobile: logo, Donate button and a menu button; navigation and languages inside the menu
- Ivory background, dark brown navigation text and a subtle bottom border
- No news section

### 🏠 Home page

Suggested layout, with room to adapt:

1. **Introduction:** clear heading, short explanation, **Donate** and **Meet our furry friends** buttons. Text beside a real photo of the animals and team, with a small animal greeting bubble; text first on mobile.
2. **What we do:** **Health & care · Food & shelter · Adoption · Awareness**, each with one short line. Link to About with **Meet the people behind the care**. Explain monitoring and documentation on About.
3. **Meet our furry friends:** up to six recent animals, including cats, dogs, and adopted animals. A staggered photo gallery shows names, statuses, age if known, and optional personality on the photos; each photo opens the animal’s profile. Editors can feature animals; **Meet all our friends** opens the gallery.
4. **Our team:** real team photo, short introduction, and link to **About**. Include impact numbers when available.
5. **How to help:** what donations support and an invitation to volunteer. Use donation amounts only with confirmed costs.
6. **The organisations that support us:** confirmed organisation names and logos, with links to their websites, to build trust.
7. **Footer:** contact details, WhatsApp, social links, and association information.

Warm, photo-led design: mostly ivory, occasional sand sections, brown headings, orange donation buttons, and small blue accents. Show real animals and the people caring for them early. Short captions on real photos help build trust.

### 💛 About

**🟢 Proof that the association is real**

Planned layout, built one section at a time:

1. **Introduction / history:** a two-column opening with “About Pattes du Sud,” the reason it began in Mirleft, and one large photo of a person caring for an animal; text comes first on mobile. The caption describes the scene. Include a founding year and founders when known, without inventing dates or names.
2. **How care continues:** one compact sand section describing immediate help, vaccination and sterilisation, documentation, and follow-up. Explain what the red collar identifies for street dogs. Use the association presentation in `context.txt` as the source and avoid repeating Home's four service labels or promising response times.
3. **The people behind it:** an ivory section with a short introduction and up to four compact horizontal profiles. Each person has a first name, role, photo, and a specific line about their responsibilities. Keep profiles easy to scan on phones. Add one **Volunteer** link, leaving the full process to that page.
4. **The association in Mirleft:** a compact sand section with a readable facts block and a short account of what the association records about care and spending. Show the official name, confirmed registration reference, and area served. Add a note to arrange visits, one **Contact** link, and links to confirmed Instagram and Facebook accounts. Registration details match the footer. Home carries the Mirleft map.
5. **Closing invitation:** a short ivory strip with one sentence and a prominent **Donate** button. Keep payment and volunteering details on their dedicated pages, and avoid repeating Contact here.

Keep the page short: one main photo, the team portraits, and no timeline, duplicate impact cards, second map, or extra gallery. Reuse Home’s ivory, sand, brown, and restrained orange palette. Each section should read clearly at 320px and follow the same order on mobile.

The team still needs to confirm the founding story, association photos and permissions, team names and roles, official registration details, public map location, and social accounts. Keep unknown facts out of published copy rather than filling them with sample claims.

### 🐶 Animals (gallery and adoption information)

**🟢 Browse the animals**

- All your dogs and cats as cards: big photo, name, age, one short line about their personality
- Simple filters: **All, Dogs, Cats**, and **Available / Adopted**
- Adopted animals stay visible as happy endings, which also builds trust

**🟢 How to adopt**

- A compact paw-print callout on a soft sand background within the gallery introduction uses clear dark text and links to the dedicated **Adopt** page at `/adopt`; no separate adoption section

### 🐾 Adopt

**🟢 Adoption guidance**

- Explain the adoption process, requirements, and how to contact the team
- Clarify local and international adoption
- Accessible from Animals; the main header label remains **Animals**

### 🐱 Page for each animal

**🟢 Get to know one animal**

- Photos, name, status (available, in care, adopted)
- Key facts: age, sex, vaccinated, sterilized, good with kids or other animals
- Their story: where they were found, how they are now, their personality
- Three buttons: **Adopt me** (opens WhatsApp with the animal's name), **Help** (donate), **Share**

**🟢 Share with friends**

- One **Share** button opening the phone's own share menu (WhatsApp, Instagram…), with a nice preview showing the animal's photo and name

**⚪ Later: sponsor this animal**

- Support one animal every month and receive news and photos about it a few times a year

### 💶 Donate

**🟢 Donate in a few taps**

- Choose an amount, then pay by card or PayPal, in euros. No account needed on the site.
- Suggested amounts
- A **Donate** button visible on every page
- A thank-you page after donating, with an invitation to share
- A choice between **One-time** and **Monthly**
- A simple note explaining how make bank transfer, and to set up a monthly transfer
- Bank details (RIB, IBAN, SWIFT) with a **Copy** button, easy on a phone

**🟢 What each amount pays for**

- Each amount linked to something concrete, for example: €10 food, €25 vaccination, €60 sterilization, €120 emergency care _(with your real costs)_

### 📍 Mirleft page (QR code)

**🟢 For tourists who meet your animals in town**

- A short mobile page reached by scanning a QR code: _"You've probably met our dogs and cats in Mirleft…"_
- One photo and 3 buttons: **Donate**, **Animals**, **Contact us**
- QR codes can go on flyers, in cafés, hotels and surf schools
- We can see which places bring the most visitors

### 🤝 Volunteer

**🟢 Visit or volunteer**

- Explain how visitors and volunteers can help on site, for example by walking dogs or bringing supplies
- Explain how to arrange a visit or volunteer with the association
- A clear contact button to discuss getting involved

### 💬 Contact

**🟢 WhatsApp, one tap away**

- A WhatsApp button on every page
- Contact remains accessible from both the header and footer
- Ready-made message: _"I want to help"_
- A simple contact form for people who prefer email

### 🔒 Privacy

**🟢 A clear privacy page**

- A short page in simple words explaining what data is collected and why
- Visitor statistics without cookies or advertising trackers, so no annoying cookie banner
- Payments stay with PayPal, never on the website

## For you and your team

**🟢 Add a new animal from your phone/laptop in a few minutes**

- A simple form: name, dog or cat, age, photos, short story
- Photos straight from your phone's camera or gallery
- Published on the website within a minute

**🟢 Keep animals up to date**

- Change an animal's status (available, in care, adopted) in one tap
- Add an update to its story, with a photo

**🟢 Edit texts**

- Change texts, impact numbers, bank details and contact info without a developer
- The design stays protected, so nothing can be broken by mistake

**🟢 See what works**

- Simple statistics: visitors, countries, most viewed animals, clicks on Donate and WhatsApp

**🟢 Training**

- A short video showing you how to add an animal

## Languages

- 🟢 The website in **English, French, German and Arabic**, with the language chosen automatically from the visitor's phone
- Arabic displayed right-to-left, properly
- Your animals' stories can be written in one language and translated over time

## Later, after launch

- ⚪ **Report an animal in need:** a dedicated reporting option with a prepared WhatsApp message requesting location, a photo, and a description. Confirm who monitors messages, availability, and coverage before presenting an emergency-response service. This is not part of the launch header or mobile menu.
- ⚪ **Sponsor an animal:** monthly support for one specific animal, with news and photos
- 🟡 **Monthly donations,** if not possible at launch
