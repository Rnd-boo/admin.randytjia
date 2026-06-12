"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed, Loader } from "lucide-react";
import useLogin from "./action";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  return (
    <div className="flex w-full my-auto justify-center gap-10 lg:flex-row lg:gap-20">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold text-danger-500">Login</h2>
          <p className="mb-4 mt-2 text-small">Randytjia?</p>
          {errors.root && (
            <p className="mb-2 font-medium text-danger">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" autoComplete="off" />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    placeholder="***"
                    type="password"
                  />
                  <InputGroupAddon onClick={toggleVisibility}>
                    {isVisible ? (
                      <Eye className="pointer-events-none text-xl text-default-400" />
                    ) : (
                      <EyeClosed className="pointer-events-none text-xl text-default-400" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              )}
            />
            <Button color="danger" size="lg" type="submit">
              {isPendingLogin ? <Loader color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
