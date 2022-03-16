export const useCo2Calculator = () => {
    const { GRAMME_CO2_PER_MO } = useRuntimeConfig();
    const { convertBytesToMB } = useUtils();

    const sessionCookie = useCookie<Object>('__session');

    const co2Total = useState<number>('co2total');

    const co2Calculator = (weightBeforeCompression: number, weightAfterCompression: number) => {
        const weightDifference = weightBeforeCompression - weightAfterCompression;
        const weightCompression = convertBytesToMB(weightDifference);

        const co2 = weightCompression * parseInt(GRAMME_CO2_PER_MO);

        sessionCookie.value = {
            ...sessionCookie.value, ...{
                co2: (sessionCookie.value['co2'] || 0) + co2
            }
        }

        co2Total.value = co2Total.value + co2;

        return co2;
    }

    return {
        co2Total,
        co2Calculator,

    }
}