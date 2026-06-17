import { useState } from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z.string().min(2, "Please input your username"),
  password: z.string().min(2, "Please input your password"),
});

const useLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginServices = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });
    if (result?.error && result?.status === 401) {
      throw new Error("Login Failed");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginServices,
    onError: () => {
      toast.error("Your credential is wrong");
    },
    onSuccess: () => {
      reset();
      toast.success("Login success");
      router.push("/");
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
