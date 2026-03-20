import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { emailPasswordSignUp, createDocument } from "@/Firebase"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"
import type { AppDispatch } from "@/store"

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch | any>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const password = (fd.get("password") as string) || "";
    // const zip = (fd.get("zip") as string) || "";

    // Password validation: at least one lowercase, one uppercase, one number, one special char
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[\W_]/.test(password);

    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      const missing: string[] = [];
      if (!hasLower) missing.push("lowercase letter");
      if (!hasUpper) missing.push("uppercase letter");
      if (!hasNumber) missing.push("number");
      if (!hasSpecial) missing.push("special character");
      toast.error(`Password must include: ${missing.join(", ")}`);
      setLoading(false);
      return;
    }

    const res = await emailPasswordSignUp(name, email, password);
    // handle structured error returned from helper
    if (res && (res as any).error) {
      const code = (res as any).code || "";
      const message = (res as any).message || "Signup failed";
      // Firebase error code for existing email typically 'auth/email-already-in-use'
      if (typeof code === "string" && code.includes("email-already-in-use")) {
        toast.error("Email already exist. Try signing in or use a different email.");
      } else if (typeof message === "string" && message.toLowerCase().includes("email")) {
        toast.error("Email error: " + message);
      } else {
        toast.error(message);
      }
      setLoading(false);
      return;
    }

    const uid = (res as any).uid || null;

    if (uid) {
      try {
        await createDocument("users", uid, {
          name,
          email,
          role: "super admin",
          // zip,
          uid,
          createdAt: new Date().toISOString(),
        });

        dispatch(
          setUser({
            uid,
            email,
            role: "super admin",
          })
        );

        toast.success("Super Admin account created");
        setLoading(false);
        navigate("/dashboard");
        return;
      } catch (err) {
        toast.error("Failed to create user record");
        setLoading(false);
        return;
      }
    }

    toast.error("Signup failed");
    setLoading(false);
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create your account
          </p>
        </div>
        <Field>
          {/* <FieldLabel htmlFor="name">Name</FieldLabel> */}
          <Input id="name" name="name" placeholder="Enter your name" required disabled={loading} />
        </Field>
        <Field>
          {/* <FieldLabel htmlFor="email">Email</FieldLabel> */}
          <Input id="email" name="email" type="email" placeholder="Enter your email" required disabled={loading} />
        </Field>
        {/* Zip Code field - commented out */}
        {/* <Field>
          <FieldLabel htmlFor="zip">Zip Code</FieldLabel>
          <Input id="zip" name="zip" placeholder="Enter zip code" required disabled={loading} />
        </Field> */}
        <Field>
          {/* <FieldLabel htmlFor="password">Password</FieldLabel> */}
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? "text" : "password"} required placeholder="Enter your password" disabled={loading} />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <Field>
          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link to="/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
