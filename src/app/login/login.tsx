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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
  } = useLogin();
  return (
    <div className="flex w-full my-auto justify-center gap-10 lg:flex-row lg:gap-20">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold text-danger-500 mb-8">Login</h2>
          <form
            className={cn("flex w-80 flex-col gap-2")}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="***"
                      aria-invalid={fieldState.invalid}
                      type={isVisible ? "text" : "password"}
                    />
                    <InputGroupAddon
                      onClick={toggleVisibility}
                      align="inline-end"
                    >
                      {isVisible ? (
                        <Eye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <EyeClosed className="pointer-events-none text-xl text-default-400" />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
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
