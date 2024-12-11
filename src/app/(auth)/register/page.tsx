"use client";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useState } from "react";
import "./Register.css";
import LoadingPage from '@/components/Loading/Loading';

type TUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {

  // Register
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Router
  const router = useRouter();

  // Schema
  const schema = z.object({
    username: z.string({ required_error: "Username Is Required." }).min(2, { message: "Username Must Be At Least 2 Characters." }),
    email: z.string({ required_error: "Email Is Required." }).email({ message: "Invalid Email." }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }),
    confirmPassword: z.string({ required_error: "Confirm Password Is Required." }).min(6, { message: "Confirm Password Must Be At Least 6 Characters." }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password Doen't Match",
    path: ["confirmPassword"]
  })

  // Rgeister
  const { register, handleSubmit, formState: { errors } } = useForm<TUser>({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });

  // ON Submit Handler
  const onSubmitHandler: SubmitHandler<TUser> = async (data: TUser) => {
    setLoading(true);
    const user = {
      username: data.username,
      email: data.email,
      password: data.password
    }
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", user)
      const data: User = await response.data;
      const userDetails = {
        id: data.id,
        username: data.username,
        isAdmin: data.isAdmin
      };
      window.localStorage.setItem("User_Details", JSON.stringify(userDetails));
      router.push("/");
      router.refresh();
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
        setSubmitError(error.response?.data.message || error.message)
        setLoading(false);
      }
    }
  }

  return (
    <>
      {
        loading
          ?
          <LoadingPage />
          :
          <div className="register">
            <div className="container mx-auto">
              <div className="holder-form">
                <h2>Register</h2>
                {/* Start Form */}
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  {/* Username */}
                  <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Your Username" id="username"
                      {...register("username")}
                    />
                    {
                      errors.username && <p className="input-error">{errors.username.message}</p>
                    }
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Your Email" id="email"
                      {...register("email")}
                    />
                    {
                      errors.email && <p className="input-error">{errors.email.message}</p>
                    }
                  </div>
                  {/* Password */}
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Your Password" id="password"
                      {...register("password")}
                    />
                    {
                      errors.password && <p className="input-error">{errors.password.message}</p>
                    }
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="confirmPassword"
                      {...register("confirmPassword")}
                    />
                    {
                      errors.confirmPassword && <p className="input-error">{errors.confirmPassword.message}</p>
                    }
                  </div>
                  <button type="submit" className="register-btn">Register</button>
                  {
                    submitError && <p className="submit-error">{submitError}</p>
                  }
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
      }
    </>
  )
}
export default Register;