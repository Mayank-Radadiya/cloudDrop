import SignUpForm from "@/components/global/form/SignUpForm";
import { NextPage } from "next";

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default Page;
