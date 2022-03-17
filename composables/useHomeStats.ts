
import UploadStatsRepository from "~~/repositories/UploadStatsRepository";

export const useHomeStats = () => {
    const uploadStatsRepository = useState<UploadStatsRepository>('uploadStatsRepository').value;

    const stats = ref<{
        filesCompressed: string;
        co2: string;
    }>({
        filesCompressed: "0",
        co2: "0.00",
    });

    onMounted(async () => {
        const result = await uploadStatsRepository.getStats();

        stats.value = {
            filesCompressed: result.filesCompressed,
            co2: (result.co2).toFixed(2),
        };
    })


    return { stats }
}