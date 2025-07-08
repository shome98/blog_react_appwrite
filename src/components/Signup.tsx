import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.services";
import type { IUserCreate } from "../types/auth.types";
import { login } from "../store/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";

const Signup = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserCreate>();
  //const navigate = useNavigate();

  const create = async (data: IUserCreate) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) dispatch(login(userData));
      //navigate("/");
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
            Already have an account?&nbsp;
            {/* <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link> */}
          </p>
        </div>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-3">
            <Input
              label="Full Name"
              placeholder="Enter your full name..."
              {...register("name", { required: true })}
            />
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

export default Signup;
