

type TProps = {
  children: React.ReactNode
}

export const metadata = {
  title: "Register Page",
  description: "Please Add Your Details To Continue With Us!"
}

function RegisterLayout(props: TProps) {
  // Token
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
export default RegisterLayout;