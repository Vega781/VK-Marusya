import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/Users"
import { queryClient } from "../../api/queryClient";
import { AuthForm } from "../AuthForm/AuthForm";
// import { MainPage } from "../../pages/MainPage/MainPage";
import { Load } from "../Loader/Loader";
import { UserPage } from "../../pages/userPage/UserPage";

export const Account = () => {
    const authorizedUser = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ['profile'],
        retry: 1,
    }, queryClient);

    switch (authorizedUser.status) {
        case "pending":
            return <Load type={"cube-rotate-z"} bgColor={"white"} size={100} />;
        case "success":
            return (
                <UserPage />
            );
        case "error":
            return <AuthForm isOpen={false} onClose={() => {}}/>;
    }
}