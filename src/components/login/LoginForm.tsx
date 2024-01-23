//importing from the the react lib
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//importing from the the third party lib
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import Cookies from "js-cookie";

//importing the files from the local
import Captcha from "./Captcha/Captcha";
import captchaImg from "../../assets/images/captcha.jpg";
import { useDispatch } from "react-redux";

const LoginForm: React.FC<{ setVisible: (visible: boolean) => void }> = ({
  setVisible,
}) => {
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  //Redux dispatch
  const dispatch = useDispatch();

  // Captcha Function

  const characters = "abcdefghijkABCDEFGHIJK123456789";

  const generateCaptcha = (length) => {
    let result = "";
    const characterLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
  };

  const [captchaString, setCaptchaString] = useState(generateCaptcha(6));

  const verifyCaptcha = (captcha) => {
    return captcha === captchaString;
  };

  const refreshCaptcha = () => {
    setCaptchaString(generateCaptcha(6));
  };

  // Login Function
  const onSubmit = handleSubmit(async (data) => {
    try {
      const isCaptchaValid = verifyCaptcha(data.captcha);
      //checking the captcha value
      if (!isCaptchaValid) {
        setError("captcha", {
          type: "manual",
          message: "Captcha is not valid",
        });
        refreshCaptcha();
        return;
      }

      const { data: resp } = await axios.post(
        "http://localhost:8000/login",
        data
      );

      const { message, ...rest } = resp;
      // console.log("checkpoint 2 - response: ", resp);
      setTimeout(() => {
        dispatch({ type: "REGISTER", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/home");
      });
    } catch (error) {
      console.log("Error :", error);
    }
  });
  return (
    <>
      <div className="absolute left-4 top-5 md:hidden">
        <h3 className="text-2xl font-bold">Base Inc</h3>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setVisible(false);
        }}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Register
      </Button>
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to Log in to your account
          </p>
        </div>
        <div className={cn("grid gap-6 w-[300px] md:w-[350px]")}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label className="sr-only">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  {...register("email")}
                  name="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />

                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  {...register("password")}
                  name="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                />

                {/* Captcha */}
                <div className="captcha_container">
                  <Captcha imgSrc={captchaImg} captchaString={captchaString} />
                  <Label className="sr-only">Captcha</Label>
                  <Input
                    id="captcha"
                    type="text"
                    {...register("captcha", {
                      required: "Captcha is required",
                    })}
                    name="captcha"
                    placeholder="Enter the Captcha"
                  />
                  {errors.captcha && <p>{errors.captcha.message}</p>}
                  <Button size="sm" onClick={refreshCaptcha}>
                    Refresh
                  </Button>
                </div>
              </div>
              <Button size="sm">Log in</Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" type="button">
            Github
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
