import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../config/config";

interface Token {
    id: string
}

const retrieveId = (token: string) => {
    const {id} = jwt.verify(token, SECRET_KEY) as Token;
    return id;
};

export default retrieveId;