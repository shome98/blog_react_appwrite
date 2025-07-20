import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.services";
import type { IUserLogin } from "../types/auth.types";
import { login as authLogin } from "../store/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserLogin>();
  const navigate = useNavigate();

  const login = async (data: IUserLogin) => {
    setError("");
    try {
      const userData = await authService.login(data);
      if (userData) dispatch(authLogin(userData));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10">
        <div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create an account
          </h2>
          <p className="mt-2 text-center text-base text-black/100">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-3">
            <Input
              label="Email"
              placeholder="Enter your email..."
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password..."
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
