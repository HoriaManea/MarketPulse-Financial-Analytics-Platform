import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { newUserSchema } from "../../lib/schemas";
import type z from "zod";
import { useState } from "react";
import { useNavigate } from "react-router";

export type RegisterSchema = z.infer<typeof newUserSchema>;

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigation = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      navigation("/cryptocurrency-dashboard");
    } else {
      throw new Error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          className="border-border border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          className="border-border border"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          //   disabled={true}
        />
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {password == confirmPassword ? (
          <Button className="w-full" type="submit">
            Continue
          </Button>
        ) : (
          <Button className="w-full" type="submit" disabled>
            Continue
          </Button>
        )}
      </motion.div>
    </form>
  );
}
