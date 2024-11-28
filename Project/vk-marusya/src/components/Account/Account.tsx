import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/Users"
import { queryClient } from "../../api/queryClient";
import { AuthForm } from "../AuthForm/AuthForm";
import { Load } from "../Loader/Loader";

export const Account = () => {
    const authorizedUser = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ['no'],
        retry: 0,
    }, queryClient);

    switch (authorizedUser.status) {
        case "pending":
            return <Load type={"cube-rotate-z"} bgColor={"white"} size={100} />;
        case "success":
            return (
                <AuthForm isOpen={false} onClose={() => { }} />
            );
        case "error":
            return console.log(authorizedUser.error);
    }
}