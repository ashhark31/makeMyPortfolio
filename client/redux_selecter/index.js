import { useSelector } from "react-redux"

export const notifySelector = () => {
    const notify =  useSelector(state=>state.notify);
    return [notify.on, notify.type, notify.message];
}