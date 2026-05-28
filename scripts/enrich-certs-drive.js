import fs from 'fs/promises';
import path from 'path';

const metadata = [
  { title: '10-Day ICT Skills Training for Teacher 1 Applicants (Covering: Office Productivity Tools using Google Workspace, Microsoft Productivity Tools, and Basic Graphic Design Using Canva)', type: 'Certificate of Participation', date: 'February 9–20, 2026' },
  { title: 'Cyber Hygiene', type: 'Certificate of Participation', date: 'March 9, 2026' },
  { title: 'Bias', type: 'Certificate of Participation', date: 'March 9, 2026' },
  { title: 'AI EmpowerHer: Harnessing Technology for Women\'s Growth and Impact', type: 'Certificate of Attendance', date: 'March 12, 2026' },
  { title: 'AI for MSME Advancement in ASEAN (AIM ASEAN) Training Programme', type: 'Certificate of Participation', date: 'March 12, 2026' },
  { title: 'AI Fundamentals with IBM SkillsBuild', type: 'Statement of Achievement (Cisco Networking Academy in collaboration with IBM)', date: 'September 28, 2025' },
  { title: 'Angel Investing 101: How Startups Can Attract Early-Stage Investors', type: 'Certificate of Participation', date: 'March 18, 2026' },
  { title: 'Artificial Intelligence Fundamentals', type: 'IBM SkillsBuild Completion Certificate', date: 'September 28, 2025' },
  { title: 'Awareness-Raising Campaign on AI Through Hour of Code and AI Class ASEAN (Part of the AI Ready ASEAN Programme)', type: 'Certificate of Participation', date: 'May 21, 2026' },
  { title: 'Beyond the Screen: Staying Safe in a Connected World', type: 'Certificate of Participation', date: 'March 5, 2026' },
  { title: 'Click Safe, Speak Safe: Understanding and Combatting OGBV (Cybersecurity Awareness Webinar)', type: 'Certificate of Participation', date: 'March 19, 2026' },
  { title: 'Cyber Safe, Cyber Strong: Empowering Women in the Digital World', type: 'Certificate of Participation', date: 'March 13, 2026' },
  { title: 'Cybersecurity Awareness and Introduction to Artificial Intelligence Orientation', type: 'Certificate of Participation', date: 'January 29, 2026' },
  { title: 'Cybersecurity Awareness Session (Conducted in celebration of National Women\'s Month 2026)', type: 'Certificate of Participation', date: 'March 6, 2026' },
  { title: 'CyberSinag: Safer Internet Week Year 02 (Featuring CyberHygiene and Orientation for PNPKI Services)', type: 'Certificate of Participation', date: 'February 18, 2026' },
  { title: 'CyberSinag: SaferInternet Week Year 02 Campaign for CyberHygiene and PNPKI Orientation', type: 'Certificate of Participation', date: 'February 19, 2026' },
  { title: 'Data Privacy Awareness', type: 'Certificate of Participation', date: 'March 23, 2026' },
  { title: 'Design Faster, Work Smarter: Canva for the AI-Enabled Workforce', type: 'Certificate of Attendance', date: 'March 10, 2026' },
  { title: 'Designing Smarter Workflows: Using Spreadsheets to Support Daily Productivity', type: 'Certificate of Attendance', date: 'March 4, 2026' },
  { title: 'EmpowHer Against Violence: VAWC Awareness', type: 'Certificate of Attendance', date: 'March 31, 2026' },
  { title: 'EmpowHER in the Digital Space: Online Safety, Data Privacy, and Responsible AI Awareness', type: 'Certificate of Participation', date: 'March 10, 2026' },
  { title: 'From Home to Global: Empowering Women in the Digital Economy (Part of a Webinar Series)', type: 'Certificate of Participation', date: 'March 24, 2026' },
  { title: 'HANAPIN ANG CHECK: The Essentials of Fact-Checking', type: 'Certificate of Participation', date: 'March 17, 2026' },
  { title: 'Herprompting with Purpose: Understanding the Basics of ChatGPT', type: 'Certificate of Attendance', date: 'March 9, 2026' },
  { title: 'Hour of Code (Part of the AI Ready ASEAN Programme)', type: 'Certificate of Participation', date: 'March 8, 2026' },
  { title: 'How to Earn with AI in 2026', type: 'Certificate of Participation', date: 'March 6, 2026' },
  { title: 'Information Session: PNPKI for Everyone', type: 'Certificate of Participation', date: 'April 22, 2026' },
  { title: 'JavaScript Essentials 1', type: 'Statement of Achievement (Cisco Networking Academy in collaboration with OpenEDG JavaScript Institute)', date: 'September 27, 2025' },
  { title: 'NEXT-GEN Connectivity, NEXT-LEVEL Security: Cybersecurity in 5G and 6G (Part of the Cybersecurity Awareness Webinar Series)', type: 'Certificate of Participation', date: 'March 4, 2026' },
  { title: 'Own Your Brilliance: Understanding Intellectual Property', type: 'Certificate of Participation', date: 'March 24, 2026' },
  { title: 'Prompt Engineering Using AI Tools (Part of the I-Teach Talk Webinar Series)', type: 'Certificate of Participation', date: 'March 13, 2026' },
  { title: 'Soft Power, Strong Impact: Women Building Meaningful Tech Through Community (Part of "STARTUP TALK")', type: 'Certificate of Participation', date: 'March 17, 2026' },
  { title: 'Startup Basics: an Orientation on Startups for Teacher 1 Applicants', type: 'Certificate of Attendance', date: 'February 18, 2026' },
  { title: 'Tech Her Way: Stories of Women in ICT Session 1', type: 'Certificate of Participation', date: 'March 12, 2026' },
  { title: 'Tech Her Way: Stories of Women in ICT Session 2', type: 'Certificate of Participation', date: 'March 19, 2026' },
  { title: 'Understanding Customer Service in E-commerce: EXPECTATION, EXPERIENCES, & BEST PRACTICES', type: 'Certificate of Participation', date: 'February 26, 2026' },
  { title: 'Webinar Series II: Her Shield on the Web: Smart Women - Safe Online', type: 'Certificate of Participation', date: 'March 13, 2026' },
  { title: 'Women in ICT: Shared Growth and Impact', type: 'Certificate of Participation', date: 'March 9, 2026' },
];

async function main() {
  const filePath = path.resolve(process.cwd(), 'public', 'certs-drive.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const items = JSON.parse(raw);

  if (items.length !== metadata.length) {
    throw new Error(`Expected ${metadata.length} certificates but found ${items.length}`);
  }

  const enriched = items.map((item, index) => ({
    ...item,
    title: metadata[index].title,
    certificateType: metadata[index].type,
    date: metadata[index].date,
  }));

  await fs.writeFile(filePath, JSON.stringify(enriched, null, 2), 'utf8');
  console.log(`Updated ${items.length} certificates with display titles, types, and dates.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
