// import { handleWhoAmI } from "@/lib/actions/auth-action";
import { notFound } from "next/navigation";
import UpdateUserForm from "../_compoents/UpdateProfile";


export default async function Page() {


    return (
        <div>
            <UpdateUserForm />
        </div>
    );
}