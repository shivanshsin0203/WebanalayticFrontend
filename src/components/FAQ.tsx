import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What kind of analytics does WebAnalytic provide?",
    answer:
      "WebAnalytic provides real-time user tracking, page views, unique visitors, session duration, and event-based analytics such as button clicks and form submissions.",
    value: "item-1",
  },
  {
    question: "Is WebAnalytic GDPR and privacy-compliant?",
    answer:
      "Yes! WebAnalytic is privacy-focused and does not use cookies. It fully complies with GDPR and other privacy regulations.",
    value: "item-2",
  },
  {
    question: "Can I track multiple websites with one account?",
    answer:
      "Yes, you can track multiple websites under one dashboard. The number of websites depends on your pricing plan.",
    value: "item-3",
  },
  {
    question: "How does WebAnalytic compare to Google Analytics?",
    answer:
      "Unlike Google Analytics, WebAnalytic is lightweight, privacy-friendly, and provides instant, real-time insights without tracking user data for advertising.",
    value: "item-4",
  },
  {
    question: "Does WebAnalytic support event tracking?",
    answer:
      "Yes! You can track custom events like button clicks, purchases, form submissions, and more using our simple event API.",
    value: "item-5",
  },
  {
    question: "Do you offer API access for developers?",
    answer:
      "Yes! WebAnalytic provides an API for integrating analytics into your applications programmatically.",
    value: "item-6",
  },
  
];


export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="https://x.com/ShivanshSi0203"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
