
type TProps = {
  children: React.ReactNode;
}
export const metadata = {
  title: "Login Page",
  description: "User Login [Authentication] "
}

function LoginLayout(props: TProps) {

  // const token = cookies().get("Bearer")?.value as string;
  // if (token) {
  //   redirect("/")
  // }

  const { children } = props;
  return (
    <>
      {children}
    </>
  )
}
export default LoginLayout;