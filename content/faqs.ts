import type { Faq } from "./types";

/**
 * Questions are written from what is known about the Foundation. Answers that
 * depend on unconfirmed details (registration, reporting cycles) say so plainly.
 */
export const faqs: Faq[] = [
  {
    question: "What is The Pinnacle Foundation?",
    answer:
      "The Pinnacle Foundation is a non-governmental, faith-based charitable organisation in Ghana. We share the Word and love of God and support individuals and communities in need through charitable donations, outreach and community projects.",
    pages: ["home", "contact"],
  },
  {
    question: "Is The Pinnacle Foundation a Christian organisation?",
    answer:
      "Yes. Our Christian faith is the reason we serve. Our help is never conditional on anyone's beliefs: we serve people because they are people, loved by God.",
    pages: ["home"],
  },
  {
    question: "Where does the Foundation operate?",
    answer: "We serve communities in Ghana. As projects are confirmed, we publish where they took place on our Projects page.",
    pages: ["contact"],
  },
  {
    question: "How are donations used?",
    answer:
      "Donations fund the Foundation's charitable work: essential supplies, community projects, outreach and the practical costs of delivering them. We're preparing published reports so you can see how gifts are used.",
    pages: ["home", "donate"],
  },
  {
    question: "Can I choose what my donation supports?",
    answer: "Yes. If you'd like your gift to support a specific project or type of work, contact us and we'll talk through the options.",
    pages: ["donate"],
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes. We welcome volunteers for outreach, donation distribution, logistics, media, fundraising, events and professional skills. Send an enquiry from our Get Involved page and we'll be in touch.",
    pages: ["home", "contact"],
  },
  {
    question: "Can my company sponsor a project?",
    answer:
      "Yes. Businesses can sponsor a project, support a donation drive, give in kind or match their team's giving. Get in touch to start a conversation.",
    pages: ["donate", "contact"],
  },
  {
    question: "Can churches partner with the Foundation?",
    answer:
      "Yes. We'd love to serve alongside churches: through joint outreach, donation drives, volunteers or shared projects.",
    pages: ["contact"],
  },
  {
    question: "Can I donate items instead of money?",
    answer:
      "Yes. In-kind gifts such as food, clothing and school supplies can make a real difference. Please contact us first so we can make sure your gift meets a current need.",
    pages: ["donate", "contact"],
  },
  {
    question: "Will I receive confirmation of my gift?",
    answer:
      "Online gifts are confirmed by the donation platform. For other ways of giving, contact us and we'll confirm receipt directly.",
    pages: ["donate"],
  },
  {
    question: "How can I learn about upcoming projects?",
    answer:
      "Follow the Foundation on social media or send us a message. We share upcoming projects and ways to take part as they're confirmed.",
    pages: ["contact"],
  },
  {
    question: "How can I contact the Foundation?",
    answer: "Use the enquiry form on our Contact page. We read every message.",
    pages: ["donate"],
  },
];

export const faqsFor = (page: Faq["pages"][number]) => faqs.filter((f) => f.pages.includes(page));
