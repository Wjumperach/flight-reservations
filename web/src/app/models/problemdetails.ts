export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors?: [];
}