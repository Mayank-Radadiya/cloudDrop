
import SignInForm from "@/components/global/form/SignInForm";
import { NextPage } from "next";

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <SignInForm />
    </>
  );
};

export default Page;
