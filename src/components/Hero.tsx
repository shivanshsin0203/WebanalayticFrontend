import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate=useNavigate();
  async function handleSuccessToken(access_token: string) {
    if (access_token) {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const userInfo = await res.json();
        
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/home");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    } else {
      console.log("No token found");
    }
  }

  async function handleSuccess() {
    if (!localStorage.getItem("userInfo")) {
      login(); // Directly call login() when button is clicked
    } else {
     
      navigate("/home");
    }
  }

  const login = useGoogleLogin({
    onSuccess: (response) => {
      
      if ("access_token" in response) {
        handleSuccessToken(response.access_token);
      } else {
        console.log("No access token received.");
      }
    },
    onError: (error) => console.error("Login Failed:", error),
    scope: "openid email profile",
  });
  
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
             Analyze
            </span>{" "}
            your website
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              React
            </span>{" "}
            developers
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Analyze your React website effortlessly within seconds .
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button onClick={() => handleSuccess()} className="w-full md:w-1/3">
            Get Started
          </Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/shivanshsin0203/WebanalayticFrontend"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
