export type reponseSimpleType = {
    success: boolean;
    message: string;
}
export type apiLoginResponseType = {
    success: boolean;
    msg: string;
    result?: {token: string};
}