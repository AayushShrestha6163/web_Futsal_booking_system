import ResetPasswordForm from "../_components/ResetPasswordFrom";

export default async function Page({
    searchParams
    }: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) {

    const query = await searchParams;
    const token = query.token ? (query.token as string) : '';
    
    return (
        <div>
            <ResetPasswordForm token={token} />
        </div>
    );
}