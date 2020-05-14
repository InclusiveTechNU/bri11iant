import axios from "axios";
import config from "../config/config";
import { DiagnosticInfo, diagnosticsEqual } from "./diagnostics";
import { ServerSettings } from "../server";

const BASE_URL = config.microserviceUrl;

export const sendDiagnostics = (diagnostics: DiagnosticInfo[], 
                                diagnosticCollection: DiagnosticInfo[],
                                settings: ServerSettings) => {
    const newDiagnostics = diagnostics.filter((d1: DiagnosticInfo) => {
        return !diagnosticCollection.some((d2: DiagnosticInfo) => {
            return diagnosticsEqual(d1.diagnostic, d2.diagnostic);
        });
    });
    newDiagnostics.forEach((d: DiagnosticInfo) => {
        // We don't care about the response here
        axios.post(`${BASE_URL}/diagnostics`, {
            html: d.htmlTag,
            message: d.diagnostic.message,
            severity: d.diagnostic.severity,
            userId: settings.userId
        });
    });
}
