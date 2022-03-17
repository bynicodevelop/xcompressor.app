import imageCompression from "browser-image-compression";
import UploadStatsRepository from "~~/repositories/UploadStatsRepository";

export const useCompressorManager = () => {
    const { convertBytesToMB, percentReduction } = useUtils();
    const { co2Calculator } = useCo2Calculator();

    const uploadStatsRepository = useState<UploadStatsRepository>('uploadStatsRepository').value;

    const sessionCookie = useCookie<Object>('__session');

    const router = useRouter();
    const { maxFilePerDay, maxFileSize } = useCommons();

    const keyReachUploadByDay = "reachUploadByDay";

    const showUploadZone = ref(true);
    const uploadedFilesArray = ref([]);


    const updateMaxFilePerDay = (files: FileList) => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);

        const data = sessionCookie.value[keyReachUploadByDay] ?? {}

        if ((data["date"] || 0) < d.getTime()) {
            data["date"] = d.getTime();
        }

        data["maxUploadByDay"] = (parseInt(data["maxUploadByDay"]) || 0) + Object.keys(files).length;

        sessionCookie.value = { ...sessionCookie.value, ...{ [keyReachUploadByDay]: data } }
    }

    const hasMaxFileSize = (files: FileList) => {
        let limitFileSize = 0;

        for (const file in files) {
            if (Object.hasOwnProperty.call(files, file)) {
                const element = files[file];

                if (convertBytesToMB(element.size) > maxFileSize.value) {
                    limitFileSize++;
                }
            }
        }

        return limitFileSize > 0;
    }

    const hasReachedMaxFilePerDay = (files: FileList, maxFilePerDay: number) => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);

        const data = sessionCookie.value[keyReachUploadByDay] ?? {}

        if ((data["date"] || 0) < d.getTime()) {
            data["date"] = d.getTime();

            data["maxUploadByDay"] = 0;

            sessionCookie.value = { ...sessionCookie.value, ...{ [keyReachUploadByDay]: data } }
        }

        return maxFilePerDay - ((parseInt(data["maxUploadByDay"]) || 0) + Object.keys(files).length);
    }

    const upload = (files: FileList) => {
        if (hasMaxFileSize(files)) {
            router.push({
                name: "auth"
            });
        }

        let maxFileCanUpload = hasReachedMaxFilePerDay(files, maxFilePerDay.value as number);

        if (maxFileCanUpload < 1) {
            router.push({
                name: "auth"
            });

            return;
        }

        for (const file in files) {
            if (Object.hasOwnProperty.call(files, file)) {
                const element = files[file];

                if (
                    ["image/jpeg", "image/jpg", "image/png"].includes(
                        element.type.toLowerCase()
                    ) && convertBytesToMB(element.size) < maxFileSize.value
                ) {
                    uploadedFilesArray.value.push({
                        file: element,
                        url: URL.createObjectURL(element),
                        compressedFile: null,
                    });
                } else {
                    showUploadZone.value = uploadedFilesArray.value.length === 0;
                }

                maxFileCanUpload--;

                if (maxFileCanUpload < 1) {

                    showUploadZone.value = uploadedFilesArray.value.length === 0;

                    break;
                }
            }
        }

        updateMaxFilePerDay(files);
    }

    const uploadInputFiles = async (e) => upload(e.target.files);

    const uploadFiles = async (e) => upload(e.dataTransfer.files);

    const dragEnterFunction = async () => {
        showUploadZone.value = true;
    };


    const compressFiles = async (file) => {
        const options = {
            useWebWorker: true,
        };

        return await imageCompression(file, options);
    };

    watch(uploadedFilesArray.value, async (value) => {
        showUploadZone.value = value.length === 0;

        const stats = {
            filesCompressed: 0,
            co2: 0,
        }

        const compressionList = []

        for (const file in uploadedFilesArray.value) {
            if (Object.hasOwnProperty.call(uploadedFilesArray.value, file)) {
                const element = uploadedFilesArray.value[file];


                if (uploadedFilesArray.value[file]["compressedFile"] == null) {
                    compressionList.push(compress(element.file, file));
                }
            }
        }

        const result = await Promise.all(compressionList);

        for (let index = 0; index < result.length; index++) {
            const element = result[index];

            uploadedFilesArray.value[element.index]["compressedFile"] = element.compressedFile;
            uploadedFilesArray.value[element.index]["co2"] = element.co2;
            uploadedFilesArray.value[element.index]["percentReduction"] = element.percentReduction;

            stats.filesCompressed++;
            stats.co2 += uploadedFilesArray.value[element.index]['co2'];
        }

        if (result.length > 0) {
            try {
                await uploadStatsRepository.updateCompressionStats(stats.filesCompressed, stats.co2);
            } catch (e) {
                console.log(e);
            }
        }
    });

    const compress = async (file, index) => {
        const compressedFile = await compressFiles(file);

        return {
            compressedFile,
            co2: co2Calculator(file.size, compressedFile.size),
            percentReduction: percentReduction(file.size, compressedFile.size),
            index,
        }
    }

    return {
        showUploadZone,
        uploadedFilesArray,
        uploadFiles,
        uploadInputFiles,
        dragEnterFunction,
    }
};