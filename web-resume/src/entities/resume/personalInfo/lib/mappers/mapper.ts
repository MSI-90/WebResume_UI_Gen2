import type {IBirthday} from "@shared/api/birthday/types/birthday.interfaces.ts";
import type {SelectOption} from "@shared/ui/Select/Select.tsx";

export function dataOption(data: IBirthday | undefined): SelectOption<number>[] {
    if (!data)
        return [];

    return data.days.map((day: number) => ({
        value: day,
        label: String(day),
    }));
}