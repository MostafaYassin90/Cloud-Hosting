"use client";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useState } from "react";
import LoadingPage from "@/components/Loading/Loading";
import "./login.css";

type TUser = {
  email: string;
  password: string;
}

function Login() {
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  // Router
  const router = useRouter();

  // Schema
  const schema = z.object({
    email: z.string({ required_error: "Email Is Required." }).email({ message: "Invalid Email." }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }),
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
      email: data.email,
      password: data.password
    }
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", user)
      const data: User = await response.data;
      const userDetails = {
        id: data.id,
        isAdmin: data.isAdmin
      }
      window.localStorage.setItem("User_Details", JSON.stringify(userDetails)) // Json
      setLoading(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        setSubmitError(error.response?.data.message || error.message)
      }
      setLoading(false);
    }
  }

  return (
    <>
      {
        loading
          ?
          <LoadingPage />
          :
          <div className="login">
            <div className="container mx-auto">
              <div className="holder-form">
                <h2>Login</h2>
                {/* Start Form */}
                <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                  <button type="submit" className="login-btn">Login</button>
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
export default Login;