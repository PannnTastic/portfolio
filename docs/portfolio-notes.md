# Portfolio content and verification

Updated 22 October 2026.

## Content sources
- Original CV supplied by the owner (education, PLN Batam, KMTI, skills, awards, projects).
- Owner-provided project URLs, OISL research internship, Kotlin, ORCID 0009-0003-1793-2592, and Instagram @pannnyatiga_. No dates invented for OISL.
- AI V&V internship start: public LinkedIn profile https://id.linkedin.com/in/ahmad-alfan-alfian-irfan (June 2026).
- Google Scholar URL linked from https://www.alphaxiv.org/@ahmad-alfan-alfian-irfan : https://scholar.google.com/citations?user=WACuZwoAAAAJ . Scholar itself blocked automated access.
- Preprints: https://arxiv.org/abs/2609.00718 ; https://arxiv.org/abs/2608.17703 ; https://arxiv.org/abs/2607.17686 ; https://arxiv.org/abs/2604.23435 . Titles and author lists checked against these records; no peer-review claim made.
- HiddenCourtesyMerge-Sim: IES 2026 bibliographic entry in University of the Aegean library search https://vufind2.lib.aegean.gr/EDS/Search?lookfor=%22Alfian%2C+IN%22&type=AU and owner confirmation of IES publication. Direct IEEE record/DOI not obtained; the website links to the publication profile rather than fabricating a DOI.
- External project descriptions supplied by owner. Browser search could not retrieve those sites, so no invented traffic figures, performance metrics, or screenshots were added.

## Assets and CV
- User-owned portrait: public/images/alfan.png.
- Updated two-page CV: public/files/CV-Ahmad-Alfan-Alfian-Irfan.pdf.
- Editable CV source: docs/cv.html. Print to PDF with A4, CSS page size, backgrounds on, browser headers/footers off.
- Original PDF in Downloads has not been overwritten.

## Design choices
Applied design-taste-frontend and frontend-design. Chosen direction: page-is-the-object. User explicitly chose ivory + blue, a physical 3D book, highlighted Pannn, and social directory matching the supplied reference. Book shadows, spine gradients, page numbers, running heads, and social tiles serve those explicit requests. No stock imagery or invented testimonials. Motion responds to navigation; no autoplay video or ambient particle animation.

## Form behavior
The correspondence form validates required fields and email, then opens a mailto draft. It does not claim to send messages. Copy fallback is available. Direct sending, public guestbook, and Turnstile need backend/provider configuration and are not represented as working features.

## Checks
Production build and lint for the changed components pass. Repository-wide lint still reports existing errors in unused legacy components (ClientLayout, CustomCursor, Navbar, ParticlesBackground, github-service). ESLint now excludes generated dist/ and local inspection artifacts.

## Typography and logo refinement
- Georgia throughout the web interface; opening paragraph uses a native CSS drop cap, readable body type, consistent small text. Owner-requested Pannn highlight retained.
- ORCID official icon: https://orcid.org/assets/vectors/orcid.logo.icon.svg (local copy, unmodified).
- OISL official mark: https://oisl-website.pages.dev/brand/oisl-mark-blue.png .
- AI V&V official GitHub organization avatar: https://avatars.githubusercontent.com/u/270847878?v=4 ; organizational home https://ai-vnv.kfupm.io/ .
- PLN Batam official logo: https://www.plnbatam.com/wp-content/themes/brightpln/img/main_logo.jpg .
- UMY preferred image supplied by owner: https://www.umy.ac.id/wp-content/uploads/2025/01/Asset-61-2.png . Server returns HTTP 403 from this environment. Component requests the preferred URL and falls back to a local UMY emblem sourced from https://iconlogovector.com/logo/universitas-muhammadiyah-yogyakarta .
- Organization images link to their respective institutions. These are identification marks, not endorsements.
- Owner subsequently requested matching social icon styling: the contact ORCID icon now uses blue outline styling and the official iD path geometry at 24px; the downloaded original SVG remains unchanged.

## Voice and healthcare correction
Read the interactive introduction, career, and research chapters of https://naimackerman.github.io/ as a tone reference. New copy uses Alfan's own supplied nickname, projects, education, internships, and publications; no personal habits, current reading, response-time promises, or borrowed career claims were invented.
Verified OISL's rendered homepage at https://oisl-website.pages.dev/ : Orthohealth Intelligence System Lab; orthopaedic healthcare AI, explainable radiographs, clinical decision support, and documentation. Website and CV now describe the owner's OISL role through healthcare AI and Knee-xRAI co-authorship. The lab's ePuskesmas paper is not presented as the owner's publication because he is not on its author list.
