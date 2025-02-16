import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/Animation.json";
import Lottie from "react-lottie-player";
interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Real-time Analytics",
    description:
      "Monitor your website traffic, user interactions, and engagement instantly with minimal delay.",
    icon: <MagnifierIcon />,
  },
  {
    title: "Privacy-Focused Tracking",
    description:
      "Webanalytic is cookie-free and GDPR-compliant, ensuring user privacy without invasive tracking.",
    icon: <WalletIcon />,
  },
  {
    title: "Lightning-Fast Performance",
    description:
      "Optimized for speed, Webanalytic ensures lightweight tracking without affecting page load times.",
    icon: <ChartIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Webanalytic{" "}
            </span>
            Features
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
          Empower your website with seamless analytics, privacy-first tracking, and high-speed performance.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <Lottie
          animationData={cubeLeg}
          play
          loop
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
        />
      </div>
    </section>
  );
};
