import Emitter from "tiny-emitter";

const emitter = new Emitter();

export const useNotification = () => {
    const $on = (...args) => emitter.on(...args);
    const $once = (...args) => emitter.once(...args);
    const $off = (...args) => emitter.off(...args);
    const $emit = (...args) => emitter.emit(...args);

    const paramsNotif = reactive({
        show: false,
        title: "",
        subtitle: "",
        type: "",
    });

    const onSuccess = (title: string, subtitle: string) => {
        paramsNotif.show = true;
        paramsNotif.title = title;
        paramsNotif.subtitle = subtitle;
        paramsNotif.type = "success";

        $emit("notification", paramsNotif);
    }

    const onError = (title: string, subtitle: string) => {
        paramsNotif.show = true;
        paramsNotif.title = title;
        paramsNotif.subtitle = subtitle;
        paramsNotif.type = "error";

        $emit("notification", paramsNotif);
    }

    return {
        paramsNotif,
        onSuccess,
        onError,
        $on,
        $once,
        $off,
        $emit,
    }
}