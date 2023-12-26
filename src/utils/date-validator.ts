import dayjs from "dayjs";

export function isValidDate(date: string): boolean {
    return dayjs(date, "YYYY-MM-DD",true).isValid();
}