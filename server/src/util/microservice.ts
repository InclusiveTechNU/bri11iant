import axios from "axios";
import config from "../config/config";
import { Diagnostic } from "vscode-languageserver";

const BASE_URL = config.microserviceUrl;

export const sendDiagnostic = (diagnostic: Diagnostic, html: string) => {
    axios.post(`${BASE_URL}/diagnostics`, {
        html: html,
        message: diagnostic.message,
        severity: diagnostic.severity
    })
    .then(console.log)
    .catch(console.error);
}