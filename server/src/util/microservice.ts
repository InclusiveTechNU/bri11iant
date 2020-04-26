import axios from "axios";
import config from "../config/config";
import { DiagnosticInfo } from "./diagnostics";

const BASE_URL = config.microserviceUrl;

export const sendDiagnostic = (d: DiagnosticInfo, userId: string) => {
    axios.post(`${BASE_URL}/diagnostics`, {
        html: d.htmlTag,
        message: d.diagnostic.message,
        severity: d.diagnostic.severity,
        userId: userId
    })
    //.then(console.log)
    //.catch(console.error);
}