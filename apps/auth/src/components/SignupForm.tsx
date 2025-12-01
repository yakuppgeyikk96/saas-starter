import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { cn } from "@repo/ui/lib/utils";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { signupSchema, type SignupFormData } from "../lib/schemas";

interface SignupFormProps {
  className?: string;
}

export const SignupForm = ({ className }: SignupFormProps) => {
  const { signup, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    signup(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Name (Optional)
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name")}
          disabled={isSigningUp}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email")}
          disabled={isSigningUp}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password")}
          disabled={isSigningUp}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-sm text-destructive">{errors.root.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSigningUp}>
        {isSigningUp ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
};
