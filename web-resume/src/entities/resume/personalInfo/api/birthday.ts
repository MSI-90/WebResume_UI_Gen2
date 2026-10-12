import {useGetBirthdayListQuery} from '@shared/api/birthday/api/birthdayAPI';
import type {ApiResult} from "@shared/api/types/get.result.type.ts";
import type {IBirthday} from "@shared/api/birthday/types/birthday.interfaces.ts";

export function useBirthdayVariants(): ApiResult<IBirthday>{
    const {data, isLoading, error} = useGetBirthdayListQuery();

    return {
        data,
        isLoading,
        error
    };
}